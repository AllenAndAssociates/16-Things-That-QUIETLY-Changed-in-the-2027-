import json, subprocess, sys, os, re
S=sys.argv[1]; R='/home/user/16-Things-That-QUIETLY-Changed-in-the-2027-'
FINAL=R+'/final/16 Things That Quietly Changed in the 2027 Medicare Handbook - FINAL.mp4'
VA=R+'/16 Major Changes to 2027 Medicare Handbook_1080p.mp4'; VB=R+'/2027 Medicare Part D and Plan Finder Changes_1080p.mp4'
BOFF=312.06
SH=[
 dict(id='1_glp1_two_catches',st=98.25,en=131.25,cta=1,hook=r'Medicare\'s \$50 GLP-1 cap{\c&H4BC9F3&}\Nhas 2 catches',banner=None),
 dict(id='2_trumprx_warning',st=241.0,en=263.45,cta=2,hook=r'Using TrumpRx or GoodRx?{\c&H4BC9F3&}\NRead this first',banner=(249.4,263.9)),
 dict(id='3_part_d_2027_numbers',st=313.2,en=344.05,cta=3,hook=r'Your 2027 Part D{\c&H4BC9F3&}\Nnumbers just changed',banner=None),
 dict(id='4_eligibility_rules',st=216.05,en=240.0,cta=4,hook=r'New 2027 Medicare{\c&H4BC9F3&}\Neligibility rules',banner=None),
]
FIX={'wigovi':'Wegovy','zepbound':'Zepbound','eric':'Arric','trellogy':'Trelegy','trigenta':'Tradjenta','genuvia':'Januvia','decaps':'D caps','$2400':'$2,400','h&mo,':'HMO,','glp-1':'GLP-1'}
def words():
    out=[]
    for f,off in [('part1_words.json',0),('part2_words.json',BOFF)]:
        for s in json.load(open(R+'/edit/transcripts/'+f)):
            for a,b,w in s['words']:
                w=w.strip()
                if out and w and (w[0] in '-.,' and not w.startswith('-2027')) and a+off-out[-1][1]<0.25:
                    out[-1][1]=b+off; out[-1][2]+=w; continue
                out.append([a+off,b+off,w])
    for o in out:
        k=o[2].lower(); core=re.sub(r'[^\w$&-]','',k)
        for kk,v in FIX.items():
            if core==kk.strip(',') or k==kk: o[2]=re.sub(re.escape(core),v,o[2],flags=re.I) if core in o[2].lower() else v
        o[2]=o[2].replace('Zepb-bound','Zepbound').replace('-of-pocket','-of-pocket')
    return out
def cta_words(i):
    w=json.load(open(f'{S}/shorts/vo/cta{i}.json'))
    for x in w: x[2]=x[2].lstrip('-')
    return w
def ts(t):
    t=max(0,t); h=int(t//3600); m=int(t%3600//60); s=t%60
    return f'{h}:{m:02d}:{s:05.2f}'
def chunks(ws):
    cur=[]; res=[]
    for i,w in enumerate(ws):
        cur.append(w)
        nxt=ws[i+1] if i+1<len(ws) else None
        clen=len(' '.join(x[2] for x in cur))+(len(nxt[2])+1 if nxt else 0)
        brk=len(cur)>=3 or clen>17 or w[2][-1] in '.,?!' or (nxt and nxt[0]-w[1]>0.35) or nxt is None
        if brk: res.append(cur); cur=[]
    return res
HEAD="""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Inter Black,74,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,7,3,5,40,40,0,1
Style: Hook,Inter Black,68,&H00FFFFFF,&H00FFFFFF,&H003A1F0B,&H003A1F0B,0,0,0,0,100,100,0,0,3,22,0,8,60,60,110,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
def cap_events(ws,offset,y):
    ev=[]
    CH=chunks(ws)
    for ci,ch in enumerate(CH):
        nst=CH[ci+1][0][0] if ci+1<len(CH) else 1e9
        for j,w in enumerate(ch):
            st=w[0]; en=ch[j+1][0] if j+1<len(ch) else min(ch[-1][1]+0.15,nst)
            txt=' '.join(('{\\c&H4BC9F3&}'+x[2]+'{\\c&HFFFFFF&}') if k==j else x[2] for k,x in enumerate(ch))
            pop='{\\fscx108\\fscy108\\t(0,90,\\fscx100\\fscy100)}' if j==0 else ''
            ev.append(f'Dialogue: 1,{ts(st-offset)},{ts(en-offset)},Cap,,0,0,0,,{{\\pos(540,{y})}}{pop}{txt.upper()}')
    return ev
ALL=words()
os.makedirs(R+'/shorts',exist_ok=True)
for sh in SH:
    st,en=sh['st'],sh['en']; dur=en-st
    i=sh['cta']; vo=f'{S}/shorts/vo/cta{i}.mp3'
    vod=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',vo],capture_output=True,text=True).stdout)
    X=0.4; ctad=vod+1.4; total=dur+ctad-X
    # CTA audio
    ca=f'{S}/shorts/cta_a{i}.wav'
    subprocess.run(['ffmpeg','-v','error','-y','-i',vo,'-ss','40','-t',str(ctad),'-i',f'{S}/sfx/music.mp3','-i',f'{S}/sfx/whoosh.mp3','-filter_complex',
      f'[0:a]adelay=500|500,volume=1.6[v];[1:a]volume=0.05,afade=t=in:d=0.4,afade=t=out:st={ctad-1.0}:d=1.0[m];[2:a]volume=0.12[w];[v][m][w]amix=inputs=3:normalize=0:duration=longest,atrim=0:{ctad},aformat=sample_rates=48000:channel_layouts=stereo[o]',
      '-map','[o]',ca],check=True)
    # captions
    ws=[w for w in ALL if w[0]>=st-0.05 and w[1]<=en+0.2]
    ev=cap_events(ws,st,735)
    cw=[[a+dur-X+0.5,b+dur-X+0.5,w] for a,b,w in cta_words(i)]
    ev+=cap_events(cw,0,1595)
    ev.append(f'Dialogue: 2,{ts(0)},{ts(2.9)},Hook,,0,0,0,,{{\\fad(150,250)}}'+sh['hook'].upper().replace('\\$','$').replace("\\'","'"))
    assf=f'{S}/shorts/{sh["id"]}.ass'; open(assf,'w').write(HEAD+'\n'.join(ev)+'\n')
    src,sst=(VA,st) if st<BOFF else (VB,st-BOFF)
    fc=(f'color=c=0x0B1F3A:s=1080x1920:r=25:d={dur}[bg];'
        f'[1:v]crop=864:1080:528:0,scale=1080:1350,setsar=1[spk];'
        f'[0:v]crop=860:960:1030:40,scale=989:1104,format=rgba[c0];[c0][3:v]alphamerge[card];'
        f'[bg][spk]overlay=0:0[v1];[v1][card]overlay=45:816:shortest=1[v2];')
    last='v2'
    if sh['banner']:
        b0,b1=sh['banner'][0]-st,sh['banner'][1]-st
        fc+=(f'[0:v]crop=1840:270:40:770,scale=1040:153[ban];'
             f'[v2]drawbox=x=45:y=1620:w=989:h=300:color=0x0B1F3A@1:t=fill:enable=\'between(t,{b0},{b1})\'[v3];'
             f'[v3][ban]overlay=20:1680:enable=\'between(t,{b0},{b1})\'[v4];')
        last='v4'
    fc+=(f'[{last}]fps=25,format=yuv420p[main];'
         f'[2:v]scale=1080:1920,fps=25,trim=duration={ctad},format=yuv420p,setsar=1[cta];'
         f'[main][cta]xfade=transition=slideup:duration={X}:offset={dur-X}[vx];'
         f'[vx]ass={assf}[v];'
         f'[0:a]aformat=sample_rates=48000:channel_layouts=stereo[a0];[a0][4:a]acrossfade=d={X}[a]')
    out=f'{R}/shorts/Short {sh["id"]}.mp4'
    cmd=['ffmpeg','-v','error','-y','-ss',str(st),'-t',str(dur),'-i',FINAL,'-ss',str(sst),'-t',str(dur),'-i',src,
         '-loop','1','-t',str(ctad),'-i',f'{S}/shorts/cta/cta.png','-loop','1','-i',f'{S}/shorts/cta/mask.png','-i',ca,
         '-filter_complex',fc,'-map','[v]','-map','[a]','-c:v','libx264','-preset','medium','-crf','19','-c:a','aac','-b:a','192k','-movflags','+faststart',out]
    subprocess.run(cmd,check=True); print('done',out,round(total,1))
