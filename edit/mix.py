import numpy as np, subprocess, json, sys
S=sys.argv[1]; REPO='/home/user/16-Things-That-QUIETLY-Changed-in-the-2027-'
SR=48000; TOTAL=412.4; N=int(TOTAL*SR)
def dec(path):
    raw=subprocess.run(['ffmpeg','-v','error','-i',path,'-f','f32le','-ac','2','-ar',str(SR),'-'],capture_output=True).stdout
    return np.frombuffer(raw,np.float32).reshape(-1,2).copy()
def place(buf,x,t):
    i=int(round(t*SR)); 
    if i>=len(buf): return
    n=min(len(x),len(buf)-i); buf[i:i+n]+=x[:n]
def rms_db(x): return 20*np.log10(np.sqrt(np.mean(x**2))+1e-9)
voice=np.zeros((N,2),np.float32)
A=dec(REPO+'/16 Major Changes to 2027 Medicare Handbook_1080p.mp4'); B=dec(REPO+'/2027 Medicare Part D and Plan Finder Changes_1080p.mp4')
A=A[:int(311.81*SR)]
place(voice,A,0); place(voice,B,312.06)
# short fades at seams
for t in (311.81,):
    i=int(t*SR); f=int(.02*SR); voice[i-f:i]*=np.linspace(1,0,f)[:,None]
vr=rms_db(voice[np.abs(voice).max(1)>0.01])
print('voice rms(active)',vr)
# music
m1=dec(S+'/sfx/music.mp3'); m2=dec(S+'/sfx/music2.mp3')
mus=np.zeros((N,2),np.float32)
s2=TOTAL-len(m2)/SR  # end aligned
xf=6.0
e1=int((s2+xf)*SR); m1=m1[:e1]
f=int(xf*SR); m1[-f:]*=np.linspace(1,0,f)[:,None]**.5
m2=m2.copy(); m2[:f]*=np.linspace(0,1,f)[:,None]**.5
place(mus,m1,0); place(mus,m2,s2)
mr=rms_db(mus)
target=vr-17.0   # music bed ~17 dB under voice
g0=10**((target-mr)/20)
t=np.arange(N)/SR
env=np.full(N,g0,np.float32)
def ramp(t0,t1,v0,v1):
    i0,i1=int(t0*SR),int(t1*SR); env[i0:i1]=np.linspace(v0,v1,i1-i0)
def setv(t0,t1,v): env[int(t0*SR):int(t1*SR)]=v
db=lambda d:10**(d/20)
# intro slightly louder before speech settles
# hard stops
ramp(115.50,115.56,g0,0); setv(115.56,131.2,0); ramp(131.2,132.2,0,g0)
ramp(249.95,250.0,g0,0); setv(250.0,263.85,0); ramp(263.85,264.6,0,g0)
# CTA swell (+4 dB) then end lift
ramp(376.9,379.0,g0,g0*db(4)); setv(379.0,409.4,g0*db(4)); ramp(409.4,410.2,g0*db(4),g0*db(9)); setv(410.2,411.4,g0*db(9)); ramp(411.4,412.4,g0*db(9),0)
mus*=env[:,None]
# sfx
meta=json.load(open(S+'/meta/meta.json'))
cache={}
sfx=np.zeros((N,2),np.float32)
for tt,name,g,p in meta['sfx']:
    if name not in cache:
        x=dec(f'{S}/sfx/{name}.mp3')
        # trim leading silence
        nz=np.where(np.abs(x).max(1)>0.02)[0]; x=x[nz[0]:] if len(nz) else x
        x=x/ (np.abs(x).max()+1e-9)*db(-8)
        fl=int(.01*SR); x[-fl:]*=np.linspace(1,0,fl)[:,None]
        cache[name]=x
    x=cache[name]
    if abs(p-1)>1e-3:
        idx=np.arange(0,len(x)-1,p); x=np.stack([np.interp(idx,np.arange(len(x)),x[:,c]) for c in (0,1)],1).astype(np.float32)
    place(sfx,x*g,tt)
mix=voice+mus+sfx*0.85
import wave
pk=np.abs(mix).max(); print('peak',pk)
out=(np.clip(mix,-1,1)*32767).astype(np.int16)
with wave.open(S+'/work/mix_raw.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
print('ok')
