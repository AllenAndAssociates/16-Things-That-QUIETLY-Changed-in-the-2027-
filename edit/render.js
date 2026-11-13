const { chromium } = require('playwright');
const path=require('path'),fs=require('fs');
(async()=>{
  const [,,outDir,mode,...rest]=process.argv;
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await page.goto('file://'+path.resolve(__dirname,'index.html'));
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(300);
  if(errs.length){console.error(errs.join('\n'));}
  fs.mkdirSync(outDir,{recursive:true});
  if(mode==='meta'){const m=await page.evaluate(()=>({dur:window.DUR,sfx:window.SFX}));fs.writeFileSync(path.join(outDir,'meta.json'),JSON.stringify(m));console.log('dur',m.dur,'sfx',m.sfx.length);}
  else if(mode==='times'){ for(const t of rest){await page.evaluate(t=>window.seek(t),+t);await page.screenshot({path:path.join(outDir,`t_${(+t).toFixed(2)}.png`),omitBackground:true});} }
  else { const [f0,f1]=rest.map(Number); for(let f=f0;f<f1;f++){await page.evaluate(t=>window.seek(t),f/25);await page.screenshot({path:path.join(outDir,String(f).padStart(6,'0')+'.png'),omitBackground:true});} }
  await browser.close();
})();
