import numpy as np, cv2, subprocess, sys, os, json
REPO='/home/user/16-Things-That-QUIETLY-Changed-in-the-2027-'
VA=REPO+'/16 Major Changes to 2027 Medicare Handbook_1080p.mp4'
VB=REPO+'/2027 Medicare Part D and Plan Finder Changes_1080p.mp4'
FPS=25; BOFF=312.06; AEND=311.81; TOTAL=412.4
b=lambda x:x+0.25
# (start, dur, dx, s, ease)
SEG=[(0.3,19.5,0,1.05,'lin'),(20.3,0.5,-460,1.08,'io'),(115.55,0.25,-460,1.14,'out'),(131.3,0.5,-460,1.08,'io'),
     (249.3,0.3,-460,1.14,'out'),(263.9,0.5,-460,1.08,'io'),(312.06,0.0,-460,1.13,'io'),(b(344.7),0.6,-460,1.08,'io'),(b(376.9),0.8,-460,1.05,'io')]
def ease(u,e):
    u=min(max(u,0),1)
    if e=='lin': return u
    if e=='out': return 1-(1-u)**3
    return 4*u**3 if u<.5 else 1-(-2*u+2)**3/2
def layout(t):
    dx,s=0.0,1.0
    for st,d,tdx,ts,e in SEG:
        if t<st: break
        u=1 if d==0 else ease((t-st)/d,e)
        dx=dx+(tdx-dx)*u; s=s+(ts-s)*u
    return dx,s
AX,AY=960,420
def compose(frame,t,ov):
    dx,s=layout(t)
    if abs(s-1)<1e-4 and abs(dx)<.01: out=frame.copy()
    else:
        M=np.float32([[s,0,AX+dx-AX*s],[0,s,AY-AY*s]])
        out=cv2.warpAffine(frame,M,(1920,1080),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
        xr=int(AX+dx+(1920-AX)*s)
        if xr<1920:
            small=cv2.resize(frame,(192,108),interpolation=cv2.INTER_AREA)
            small=cv2.GaussianBlur(small,(0,0),4)
            bg=(cv2.resize(small,(1920,1080),interpolation=cv2.INTER_LINEAR)*0.55).astype(np.uint8)
            x0=max(0,xr-40)
            w=np.clip((np.arange(x0,1920)-x0)/40.0,0,1)[None,:,None]
            out[:,x0:]=(out[:,x0:]*(1-w)+bg[:,x0:]*w).astype(np.uint8)
    if ov is not None and ov.ndim==3 and ov.shape[2]==3:
        return ov
    if ov is not None:
        a=ov[:,:,3:4].astype(np.uint16)
        if a.any():
            out=((out.astype(np.uint16)*(255-a)+ov[:,:,:3].astype(np.uint16)*a+127)//255).astype(np.uint8)
    return out
def reader(path):
    p=subprocess.Popen(['ffmpeg','-v','error','-i',path,'-f','rawvideo','-pix_fmt','bgr24','-'],stdout=subprocess.PIPE,bufsize=10**8)
    while True:
        buf=p.stdout.read(1920*1080*3)
        if len(buf)<1920*1080*3: return
        yield np.frombuffer(buf,np.uint8).reshape(1080,1920,3)
if __name__=='__main__':
    mode=sys.argv[1]
    if mode=='stills':
        ovdir,outdir=sys.argv[2],sys.argv[3]; os.makedirs(outdir,exist_ok=True)
        for t in sys.argv[4:]:
            t=float(t)
            src,tt=(VA,min(t,AEND-0.04)) if t<BOFF else (VB,min(t-BOFF,98.0))
            raw=subprocess.run(['ffmpeg','-v','error','-ss',str(tt),'-i',src,'-frames:v','1','-f','rawvideo','-pix_fmt','bgr24','-'],capture_output=True).stdout
            fr=np.frombuffer(raw,np.uint8).reshape(1080,1920,3)
            ov=cv2.imread(f'{ovdir}/t_{t:.2f}.png',cv2.IMREAD_UNCHANGED)
            cv2.imwrite(f'{outdir}/s_{t:07.2f}.jpg',compose(fr,t,ov),[cv2.IMWRITE_JPEG_QUALITY,85])
    elif mode=='full':
        ovdir,outfile=sys.argv[2],sys.argv[3]
        N=int(round(TOTAL*FPS)); F0=int(sys.argv[4]) if len(sys.argv)>4 else 0; F1=int(sys.argv[5]) if len(sys.argv)>5 else N
        enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s','1920x1080','-r',str(FPS),'-i','-',
             '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',outfile],stdin=subprocess.PIPE)
        def reader_at(path,ss):
            p=subprocess.Popen(['ffmpeg','-v','error','-ss',f'{ss:.3f}','-i',path,'-f','rawvideo','-pix_fmt','bgr24','-'],stdout=subprocess.PIPE,bufsize=10**8)
            while True:
                buf=p.stdout.read(1920*1080*3)
                if len(buf)<1920*1080*3: return
                yield np.frombuffer(buf,np.uint8).reshape(1080,1920,3)
        t0=F0/FPS
        ra=reader_at(VA,t0) if t0<AEND else iter(())
        rb=reader_at(VB,max(0,t0-BOFF)); last=None; fb=None
        if t0>=AEND: last=next(reader_at(VA,AEND-0.08))
        for i in range(F0,F1):
            t=i/FPS
            if t<AEND-1e-6:
                last=next(ra,last)
                fr=last
            elif t<BOFF-1e-6:
                fr=last
            else:
                nb=next(rb,None)
                if nb is not None: fb=nb
                fr=fb
            ovp=f'{ovdir}/{i:06d}.png'
            ov=cv2.imread(ovp,cv2.IMREAD_UNCHANGED) if os.path.exists(ovp) else None
            enc.stdin.write(compose(fr,t,ov).tobytes())
            if i%500==0: print('frame',i,'/',F1,flush=True)
        enc.stdin.close(); enc.wait()
