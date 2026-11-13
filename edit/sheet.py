import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob(sys.argv[1]+'/s_*.jpg')); out=sys.argv[2]; n=6
for k in range(0,len(fs),n):
    sh=Image.new('RGB',(1920,1620),'black')
    for j,f in enumerate(fs[k:k+n]):
        im=Image.open(f).resize((960,540)); ImageDraw.Draw(im).text((10,10),f.split('_')[-1],fill='red')
        sh.paste(im,((j%2)*960,(j//2)*540))
    sh.save(f'{out}_{k//n}.jpg',quality=80)
