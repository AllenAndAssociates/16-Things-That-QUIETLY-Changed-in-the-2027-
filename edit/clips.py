import pymupdf as fitz, json, sys
S=sys.argv[1]
d=fitz.open(S+'/dl/handbook.pdf')
clips={
 'mdpp':(48,'Medicare Diabetes Prevention Program',150,['in-person or virtually','live or self-paced sessions','no limit']),
 'tele':(2,'Telehealth changes',75,['through December 31, 2027','virtual-only providers']),
 'access':(78,'ACCESS (Advancing Chronic',110,['voluntary model for people in Original Medicare','remote monitoring']),
 'glp1':(92,'Part D coverage for GLP-1 drugs',95,['$50 copayment for a monthly','supply']),
 'logins':(2,'More options to log into',70,['ID.me, CLEARme.com, and Login.gov']),
 'fraud':(2,'Medicare is stepping up the fight',75,['using AI tools, to detect fraud early']),
 'apps':(2,'Connect to Medicare with third-party apps',70,['third-party apps']),
 'rural':(52,'Rural Health Transformation Program',80,['Rural Health Transformation Program.']),
 'citizen':(9,'You must be either a U.S. citizen',80,['U.S. citizen or U.S. national','permanent resident (green card holder)','Cuban-Haitian','(COFA) migrant']),
 'trumprx':(99,'TrumpRx',140,["doesn’t count toward your","or out-of-pocket maximum"]),
 'negot':(85,'Important! Medicare is negotiating',100,['next 15','January 1, 2027']),
 'notify':(66,'rules can change each year',40,['must notify you']),
 'ded':(86,'has a deductible for drug coverage',20,['no more than $700 in 2027']),
 'cap':(85,'Your out-of-pocket drug costs are capped',20,['capped at $2,400 in 2027']),
 'extra':(97,'In 2027, drug costs for people',50,['$5.80','$14.40']),
 'uro':(52,'body organ (including ostomy',30,['urological supplies']),
 'php':(49,'Partial hospitalization services',60,['Partial hospitalization']),
 'aco':(25,'Accountable Care Organizations',110,['Accountable Care Organizations']),
}
meta={}
for k,(p,anchor,h,hl) in clips.items():
    pg=d[p-1]
    r=pg.search_for(anchor)
    if not r: print('MISSING anchor',k); continue
    a=r[0]
    x0=max(30,a.x0-14); x1=min(pg.rect.width-28, x0+520)
    if a.x0>300: x0=a.x0-14; x1=pg.rect.width-28
    clip=fitz.Rect(x0,a.y0-0.5,x1,min(pg.rect.height-20,a.y0+h))
    lines=[]
    for b in pg.get_text('dict')['blocks']:
        for l in b.get('lines',[]):
            bb=fitz.Rect(l['bbox'])
            if bb.y0>=a.y0-2 and bb.y0<clip.y1 and bb.x1>x0+5 and bb.x0<x1: lines.append(bb)
    full=[l for l in lines if l.y1<=clip.y1]
    if full: clip.y1=max(l.y1 for l in full)+3
    lx=min(l.x0 for l in lines); clip.x0=min(clip.x0, lx-12)
    hs=[]
    for phrase in hl:
        for q in pg.search_for(phrase, clip=clip):
            hs.append([(q.x0-clip.x0)/clip.width,(q.y0-clip.y0)/clip.height,(q.x1-clip.x0)/clip.width,(q.y1-clip.y0)/clip.height])
        if not pg.search_for(phrase, clip=clip): print('missing hl',k,phrase)
    pg.get_pixmap(dpi=260,clip=clip).save(f'{S}/build/assets/clip_{k}.png')
    meta[k]={'page':p,'w':clip.width,'h':clip.height,'hl':hs}
for p,name in [(1,'cover'),(2,'whatsnew'),(3,'contents')]:
    d[p-1].get_pixmap(dpi=170).save(f'{S}/build/assets/page_{name}.png')
json.dump(meta,open(f'{S}/build/assets/clips.json','w'))
print('ok',len(meta))
