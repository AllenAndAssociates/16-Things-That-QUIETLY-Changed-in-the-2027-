// ===================== DOM builders =====================
const $=s=>document.querySelector(s);
const BASE=122, RH=68;
// 16 tags around the handbook
(function(){
  const box=$('#tags');
  for(let i=1;i<=16;i++){
    const d=document.createElement('div');d.className='tag16 abs a'+(i>11?' silent-later':'');d.id='g'+i;
    d.innerHTML=i+(i<=11?'<span class="nb a" id="gn'+i+'">NEW</span>':'');
    box.appendChild(d);
  }
  const p=$('#prog');
  for(let i=1;i<=16;i++){const s=document.createElement('div');s.className='seg'+(i>11?' s':'');s.id='sg'+i;p.appendChild(s);}
  const ph='800-324-9986';$('#phone').innerHTML=[...ph].map((c,i)=>`<span class="digit a" id="pd${i}">${c}</span>`).join('');
  const mk=(id,txt,gold)=>{$(id).innerHTML=[...txt].map((c,i)=>c==' '?'<div class="fl sp"></div>':`<div class="fl${gold?' g':''}">${c}</div>`).join('');};
  mk('#flip1','THE 5 SILENT',false);mk('#flip2','CHANGES',true);
})();

const cardsEl=$('#cards'), rowsEl=$('#rows');
function addCard(n,title,sub,date,body,silent){
  const d=document.createElement('div');d.className='card a';d.id='c'+n;
  d.innerHTML=`<div class="chead"><div class="num${silent?' s':''}">#${n}</div><div><div class="ttl">${title}</div><div class="sub">${sub}</div></div>${date?`<div class="date a" id="dt${n}">${date}</div>`:''}</div>${body}`;
  cardsEl.appendChild(d);
  const r=document.createElement('div');r.className='row a';r.id='r'+n;
  r.innerHTML=`<div class="rn">${n}</div><div>${title.replace(/<br>/g,' ')}</div><div class="ck">✓</div>`;
  rowsEl.appendChild(r);
}
// item start times
const T={1:46.94,2:61.62,3:72.94,4:97.66,5:131.66,6:160.66,7:176.32,8:186.30,9:199.92,10:214.94,11:240.32,12:271.46,13:291.20,14:312.06,15:b(344.77),16:b(358.59)};
const CH=[[1,2,3],[4],[5,6],[7,8,9,10,11],[12,13,14,15,16]];
const CHEND=[97.45,131.45,176.10,266.0,b(376.55)];
const TABT=[42.4,97.66,131.66,176.32,268.2,b(376.71)];

// ===================== CARD CONTENT =====================
const C={};
// #1 MDPP
C[1]=clip('mdpp','PAGE 48',52.4,[51.0,53.0,58.3]);
addCard(1,'Diabetes Prevention Program','MDPP · Preventive service','Updated<br>2027',`
<div class="part pillrow">
 <span class="pill green a" id="m1a">${SVG.check.replace('#fff','#0f6b3a')} 100% Virtual Allowed</span>
 <span class="pill green a" id="m1b">${SVG.check.replace('#fff','#0f6b3a')} Prediabetes Eligible</span>
 <span class="pill green a" id="m1c">${SVG.check.replace('#fff','#0f6b3a')} No Enrollment Limit</span>
</div>
<div class="part a" id="m1d" style="font-size:22px;font-weight:700;color:var(--muted)">Live <b style="color:var(--navy)">or</b> self-paced sessions — attend from home</div>
${C[1].html}`);
// #2 Telehealth
C[2]=clip('tele','PAGE 2 · WHAT’S NEW',68.6,[66.2,69.0]);
addCard(2,'Original Medicare Telehealth','Flexibilities extended','Original<br>Medicare',`
<div class="part box a" id="m2tl" style="padding:26px 24px 20px">
  <div style="position:relative;height:30px;border-radius:15px;background:#E6ECF3;overflow:hidden">
    <div id="m2bar" style="position:absolute;left:0;top:0;bottom:0;width:100%;transform-origin:left;transform:scaleX(.18);background:linear-gradient(90deg,#1B6FD1,#1E9E5A);border-radius:15px"></div>
  </div>
  <div style="display:flex;justify-content:space-between;margin-top:12px;font-weight:800;font-size:21px;color:var(--muted)"><span>Today</span><span class="a" id="m2end" style="color:var(--green);font-size:30px;font-weight:900">Dec 31, 2027</span></div>
</div>
<div class="part a" id="m2h" style="display:flex;align-items:center;gap:18px;background:var(--green2);border-radius:18px;padding:16px 20px;color:#0f6b3a">
  <div style="width:62px;height:62px;flex:none;color:#0f6b3a">${SVG.house}</div>
  <div style="font-size:32px;font-weight:900">Home Telehealth Extended</div>
</div>
${C[2].html}`);
// #3 ACCESS
C[3]=clip('access','PAGE 78',77.6,[78.6,93.8]);
addCard(3,'ACCESS Program','Chronic care · Original Medicare','Starts<br>April 2027',`
<div class="part pillrow">
 <span class="pill light a" id="m3a">Heart Failure</span><span class="pill light a" id="m3b">COPD</span><span class="pill light a" id="m3c">Tobacco</span><span class="pill light a" id="m3d">Substance Use</span>
</div>
<div class="part" style="display:flex;gap:14px;align-items:stretch">
 <div class="a" id="m3m" style="flex:none;background:var(--navy);color:#fff;border-radius:18px;padding:14px 22px;text-align:center"><div style="font-size:16px;font-weight:800;letter-spacing:2px;color:var(--gold2)">AROUND</div><div class="money" style="color:#fff">~$7<span style="font-size:30px">/mo</span></div></div>
 <div style="display:flex;flex-direction:column;gap:8px;justify-content:center">
  <div class="lst a" id="m3e" style="padding:0">${'<span class="cic" style="width:32px;height:32px">'+SVG.check+'</span>'} Virtual health coaching</div>
  <div class="lst a" id="m3f" style="padding:0">${'<span class="cic" style="width:32px;height:32px">'+SVG.check+'</span>'} Care coordination</div>
  <div class="lst a" id="m3g" style="padding:0">${'<span class="cic" style="width:32px;height:32px">'+SVG.check+'</span>'} Remote monitoring &amp; wearables</div>
 </div>
</div>
${C[3].html}`);
// #4 GLP-1
C[4]=clip('glp1','PAGE 92',102.3,[113.3,113.6]);
addCard(4,'GLP-1 Bridge Program','Weight-loss drugs · eligible Part D enrollees','Through<br>Dec 31, 2027',`
<div class="part" style="display:flex;align-items:center;gap:16px">
  <div class="a" id="m4g" style="background:var(--green);color:#fff;border-radius:20px;padding:12px 24px;box-shadow:0 8px 0 #137a43"><div style="font-size:15px;font-weight:900;letter-spacing:2px;opacity:.9">MONTHLY CAP</div><div class="money">$50<span style="font-size:30px">/mo</span></div></div>
  <div style="display:flex;flex-direction:column;gap:10px">
   <span class="tagd a" id="m4a">Wegovy®</span><span class="tagd a" id="m4b">Zepbound®</span>
  </div>
  <span class="newB a" id="m4n" style="margin-left:auto;font-size:24px">New!</span>
</div>
${C[4].html}
<div class="part a" id="m4w" style="font-size:18px;font-weight:900;letter-spacing:3px;color:var(--coral);margin-top:16px">⚠ TWO STRICT CATCHES</div>
<div class="warnrow a" id="m4x"><span class="xic">${SVG.x}</span>Does NOT count toward Part D deductible or $2,400 cap</div>
<div class="warnrow a" id="m4y"><span class="xic">${SVG.x}</span>Excludes diabetes, prediabetes &amp; metformin users</div>`);
// #5 ACO
addCard(5,'Accountable Care Organizations','ACO expansion · Original Medicare','Jan 1,<br>2027',`
<div class="part a" id="m5w" style="display:flex;align-items:center;gap:16px;background:#EEF5FF;border:2px solid #cfe0f7;border-radius:18px;padding:14px 18px">
 <div style="width:56px;height:56px;color:var(--blue);flex:none">${SVG.watch}</div>
 <div><div class="lbl2" style="margin:0;color:var(--blue)">NEW IN 2027</div><div style="font-size:26px;font-weight:900;color:var(--navy)">Smartwatches &amp; wearable health tech added</div></div>
</div>
<div class="part" style="display:flex;gap:14px">
 <div class="box a" id="m5l" style="flex:1">
  <div class="lbl2">HOW ACOs WORK</div>
  <svg viewBox="0 0 300 150" width="100%" height="150">
   <rect x="20" y="8" width="260" height="134" rx="18" fill="#EEF3F9" stroke="#9fb0c6" stroke-width="2" stroke-dasharray="7 6"/>
   <g stroke="#1D3A66" stroke-width="3" class="net">
    <line x1="150" y1="75" x2="70" y2="40"/><line x1="150" y1="75" x2="230" y2="40"/><line x1="150" y1="75" x2="70" y2="112"/><line x1="150" y1="75" x2="230" y2="112"/></g>
   <circle cx="150" cy="75" r="22" fill="#0B1F3A"/><text x="150" y="81" font-size="17" fill="#F3C94B" text-anchor="middle" font-weight="900" font-family="Inter">Dr</text>
   <g fill="#1B6FD1"><circle cx="70" cy="40" r="13"/><circle cx="230" cy="40" r="13"/><circle cx="70" cy="112" r="13"/><circle cx="230" cy="112" r="13"/></g>
  </svg>
  <div style="font-size:21px;font-weight:800;color:var(--navy);line-height:1.2">Behind-the-scenes referral network</div>
 </div>
 <div class="box a" id="m5r" style="flex:1;background:var(--green2);border-color:#9ad7b2">
  <div class="lbl2" style="color:#0f6b3a">BUT YOU STILL…</div>
  <div style="display:flex;justify-content:center;margin:8px 0 10px"><span class="cic" style="width:96px;height:96px"><svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></div>
  <div style="font-size:24px;font-weight:900;color:#0f6b3a;line-height:1.2;position:relative">Keep <span style="position:relative;display:inline-block"><span class="abs" id="m5hl" style="left:-6px;right:-6px;top:4px;bottom:0;background:#FFE14D;border-radius:4px;transform:scaleX(0);transform-origin:left;z-index:0"></span><span style="position:relative">100% freedom of choice</span></span></div>
 </div>
</div>
<div class="part a" id="m5n" style="font-size:20px;font-weight:700;color:var(--muted)">Original Medicare never locks you into an HMO — see any Medicare provider.</div>`);
// #6 Electronic PA
addCard(6,'Electronic Prior Authorization','Medicare Advantage plans','Jan 1,<br>2027',`
<div class="part box" style="padding:22px">
 <div style="display:flex;align-items:center;justify-content:space-between">
  <div class="a" id="m6d" style="text-align:center;width:150px"><div style="width:84px;height:84px;margin:0 auto;color:var(--navy)">${SVG.doc}</div><div style="font-weight:900;font-size:22px">Doctor</div></div>
  <div style="flex:1;position:relative;height:200px">
    <div class="a" id="m6f" style="position:absolute;left:50%;top:6px;transform:translateX(-50%);text-align:center;color:#8592a3">
      <div style="width:76px;height:76px;margin:0 auto">${SVG.fax}</div><div style="font-weight:800;font-size:18px">Fax &amp; phone tag</div>
      <div class="abs a" id="m6fx" style="left:50%;top:-6px;margin-left:-48px;width:96px;height:96px"><svg viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#E5533D" stroke-width="3" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></div>
    </div>
    <div class="a" id="m6e" style="position:absolute;left:0;right:0;top:132px;height:56px;border-radius:28px;background:linear-gradient(90deg,#1B6FD1,#1E9E5A);color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;font-weight:900;font-size:21px">
      <span style="width:26px;height:26px;display:inline-block">${SVG.bolt}</span>Electronic EHR approval <span class="cic" style="width:32px;height:32px;background:#fff"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1E9E5A" stroke-width="3.4" stroke-linecap="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></div>
  </div>
  <div class="a" id="m6p" style="text-align:center;width:150px"><div style="width:84px;height:84px;margin:0 auto;color:var(--navy)">${SVG.bank}</div><div style="font-weight:900;font-size:22px">MA Plan</div></div>
 </div>
</div>
<div class="part pill green a" id="m6s" style="font-size:24px">Faster submissions &amp; approvals</div>`);
// #7 Logins
C[7]=clip('logins','PAGE 2 · WHAT’S NEW',179.6,[183.0]);
addCard(7,'New Medicare.gov Logins','Verify your identity more ways','',`
<div class="part" style="display:flex;gap:14px">
 <div class="a" id="m7a" style="flex:1;text-align:center;border-radius:18px;padding:22px 10px;background:#fff;border:3px solid #2E7D32;font-size:36px;font-weight:900;color:#2E7D32">ID.me</div>
 <div class="a" id="m7b" style="flex:1;text-align:center;border-radius:18px;padding:22px 10px;background:#0B1F3A;font-size:36px;font-weight:900;color:#fff;letter-spacing:3px">CLEAR</div>
 <div class="a" id="m7c" style="flex:1;text-align:center;border-radius:18px;padding:22px 10px;background:#fff;border:3px solid #1B6FD1;font-size:36px;font-weight:900;color:#1B6FD1">Login.gov</div>
</div>
${C[7].html}`);
// #8 apps & AI
C[8]=clip('fraud','PAGE 2 · WHAT’S NEW',196.3,[196.6]);
addCard(8,'3rd-Party Apps &amp; AI Fraud Detection','Share records · stop fraud earlier','',`
<div class="part" style="display:flex;gap:14px">
 <div class="box a" id="m8a" style="flex:1;display:flex;gap:14px;align-items:center"><div style="width:64px;height:64px;flex:none;color:var(--blue)">${SVG.shield}</div><div style="font-size:24px;font-weight:900;color:var(--navy);line-height:1.15">Permission-based record sharing</div></div>
 <div class="box a" id="m8b" style="flex:1;display:flex;gap:14px;align-items:center;background:#0B1F3A;border-color:#0B1F3A"><div style="width:64px;height:64px;flex:none;color:var(--gold2)">${SVG.ai}</div><div style="font-size:24px;font-weight:900;color:#fff;line-height:1.15">AI catches fraud earlier</div></div>
</div>
<div class="part pillrow"><span class="pill light a" id="m8c">You</span><span class="a" id="m8d" style="font-size:30px;color:#9fb0c6;font-weight:900;align-self:center">→</span><span class="pill light a" id="m8e">Doctors</span><span class="pill light a" id="m8f">Caregivers</span></div>
${C[8].html}`);
// #9 Rural
C[9]=clip('rural','PAGE 52',205.0,[205.3]);
addCard(9,'Rural Health Transformation','Program spotlighted in the handbook','',`
<div class="part a" id="m9s" style="background:linear-gradient(135deg,#F7D66B,#D4A62A);border-radius:22px;padding:18px 26px;color:#2a1a00;display:flex;align-items:flex-end;gap:18px">
  <div style="font-size:96px;font-weight:900;letter-spacing:-3px;line-height:1">$<span id="m9n">0</span>B</div>
  <div style="padding-bottom:12px"><div style="font-size:30px;font-weight:900">Billion</div><div class="a" id="m9y" style="font-size:22px;font-weight:800">5-year investment</div></div>
</div>
<div class="part pillrow"><span class="pill light a" id="m9a">Rural clinics</span><span class="pill light a" id="m9b">Staffing</span><span class="pill light a" id="m9c">Access to care</span><span class="pill coral a" id="m9d">No 3-hour drives</span></div>
${C[9].html}`);
// #10 citizenship
C[10]=clip('citizen','PAGE 9',221.0,[225.7,228.6,230.6,232.2]);
addCard(10,'Tighter Eligibility Rules','Citizenship &amp; immigration status','2027',`
<div class="part" style="display:flex;gap:14px">
 <div style="flex:1.25">
  <div class="lbl2" style="color:#0f6b3a">ELIGIBLE</div>
  <div class="lst a" id="ma1"><span class="cic">${SVG.check}</span>U.S. citizens &amp; nationals</div>
  <div class="lst a" id="ma2"><span class="cic">${SVG.check}</span>Green card holders</div>
  <div class="lst a" id="ma3"><span class="cic">${SVG.check}</span>Cuban / Haitian entrants</div>
  <div class="lst a" id="ma4"><span class="cic">${SVG.check}</span>COFA migrants</div>
 </div>
 <div style="flex:1">
  <div class="lbl2" style="color:var(--coral)">NO LONGER QUALIFY</div>
  <div class="lst a" id="mb1"><span class="xic">${SVG.x}</span>Certain refugees</div>
  <div class="lst a" id="mb2"><span class="xic">${SVG.x}</span>Asylum seekers</div>
  <div class="lst a" id="mb3"><span class="xic">${SVG.x}</span>TPS groups</div>
 </div>
</div>
${C[10].html}`);
// #11 TrumpRx
C[11]=clip('trumprx','PAGE 99',243.0,[247.6,258.1]);
addCard(11,'TrumpRx Cash Discount Site','Prescription coupon website','',`
<div class="part" style="display:flex;gap:12px;align-items:center">
 <span class="tagd a" id="mt1" style="font-size:28px">TrumpRx.gov</span><span class="a" id="mt2" style="font-size:26px;font-weight:800;color:var(--muted)">≈ works like</span><span class="tagd a" id="mt3" style="font-size:28px">GoodRx</span>
</div>
<div class="part pill coral a" id="mt4" style="font-size:22px">Not part of Medicare or Part D</div>
${C[11].html}`);
// #12 negotiated
C[12]=clip('negot','PAGE 85',277.9,[277.6,273.2]);
addCard(12,'15 Negotiated Drug Prices','Part D brand drugs','Jan 1,<br>2027',`
<div class="part" style="display:flex;align-items:center;gap:20px">
 <div class="a" id="mn" style="font-size:120px;font-weight:900;color:var(--navy);line-height:.9;letter-spacing:-4px">15</div>
 <div style="display:flex;flex-wrap:wrap;gap:10px">
  <span class="tagd a" id="mn1">Ozempic®</span><span class="tagd a" id="mn2">Wegovy®</span><span class="tagd a" id="mn3">Trelegy®</span><span class="tagd a" id="mn4">Tradjenta®</span><span class="tagd a" id="mn5">Januvia®</span>
 </div>
</div>
<div class="part a" id="mnw" style="display:flex;gap:12px;align-items:center;background:var(--amber2);border:2px solid #f5d27a;border-radius:14px;padding:12px 16px;font-size:21px;font-weight:800;color:#6b4b00"><span style="width:30px;height:30px;flex:none;color:#b07a00">${SVG.warn}</span>Overall Part D premiums &amp; costs still rising for many</div>
${C[12].html}`);
// #13 MAY -> MUST
C[13]=clip('notify','PAGE 66',302.4,[304.3]);
addCard(13,'Mandatory Formulary Notice','One crucial word changed','Silent<br>change',`
<div class="part box a" id="mm0" style="text-align:center;padding:26px 10px;font-size:46px;font-weight:900;color:var(--navy);letter-spacing:-.5px">
 Plans <span style="position:relative;display:inline-block;width:240px;height:70px;vertical-align:middle;perspective:400px">
  <span class="word abs a" id="mmMay" style="left:0;right:0;top:0;height:70px;line-height:70px;text-align:center;background:#E6ECF3;color:#5B6B80">“MAY”</span>
  <span class="word abs a" id="mmMust" style="left:0;right:0;top:0;height:70px;line-height:70px;text-align:center;background:var(--coral);color:#fff">“MUST”</span>
 </span> notify you
</div>
<div class="part a" id="mm1" style="display:flex;gap:14px;align-items:center;background:var(--green2);border-radius:16px;padding:14px 18px;color:#0f6b3a;font-weight:900;font-size:25px"><span class="cic">${SVG.check}</span>+ 30-Day transition fill · first 90 days</div>
${C[13].html}`, true);
// #14 Part D table
addCard(14,'2027 Part D Cost Limits','Standard Part D numbers','Silent<br>change',`
<table class="part pd"><tr><th></th><th>2026</th><th></th><th>2027</th></tr>
<tr class="a" id="pt1"><td>Deductible</td><td class="old">$615</td><td class="arrow">➔</td><td class="new">$<span id="ptd">615</span></td></tr>
<tr class="a" id="pt2"><td>Out-of-pocket cap</td><td class="old">$2,100</td><td class="arrow">➔</td><td class="new">$<span id="ptc">2,100</span></td></tr>
</table>
<div class="part a" id="pt3" style="display:flex;align-items:center;gap:14px;background:var(--green);color:#fff;border-radius:16px;padding:14px 18px;font-size:26px;font-weight:900;margin-top:4px"><span style="width:34px;height:34px">${SVG.lock}</span>$0 copay after the cap · rest of the year</div>
<div class="part box a" id="pt4" style="display:flex;align-items:center;gap:18px">
 <div class="lbl2" style="margin:0;width:120px">EXTRA HELP CAPS</div>
 <div class="a" id="pt5" style="flex:1;text-align:center"><div style="font-size:44px;font-weight:900;color:var(--navy)">$5.80</div><div style="font-weight:800;color:var(--muted)">Generic</div></div>
 <div class="a" id="pt6" style="flex:1;text-align:center"><div style="font-size:44px;font-weight:900;color:var(--navy)">$14.40</div><div style="font-weight:800;color:var(--muted)">Brand name</div></div>
</div>`, true);
// #15 Plan finder
addCard(15,'Plan Finder Doctor Lookup','Medicare.gov Plan Finder','Silent<br>change',`
<div class="part a" id="pf0" style="background:#F4F7FB;border-radius:18px;padding:18px">
 <div style="font-size:15px;font-weight:900;letter-spacing:2px;color:var(--blue);margin-bottom:10px">MEDICARE.GOV · FIND A PLAN</div>
 <div class="searchbar"><span style="width:30px;height:30px;color:var(--blue)">${SVG.search}</span><span id="pfT"></span><span class="cursor" id="pfC"></span></div>
 <div style="display:flex;gap:10px;margin-top:12px"><span class="pill green a" id="pf1" style="font-size:19px">✓ Search MA plans by your doctor</span><span class="pill light a" id="pf2" style="font-size:19px">Providers in network</span></div>
</div>
<div class="part a" id="pfw" style="display:flex;gap:14px;align-items:center;background:var(--amber2);border:2px solid #f5d27a;border-radius:16px;padding:16px 18px;font-size:25px;font-weight:900;color:#6b4b00"><span style="width:38px;height:38px;flex:none;color:#b07a00">${SVG.warn}</span>Always double-check with your doctor’s billing office</div>`, true);
// #16 clarifications
C[16]=clip('php','PAGE 49',b(369.9),[b(369.9)]);
addCard(16,'Coverage Clarifications','Original Medicare details spelled out','Silent<br>change',`
<div class="part lst a" id="cl1" style="font-size:26px"><span class="cic">${SVG.check}</span>Urological supplies listed under prosthetics</div>
<div class="part lst a" id="cl2" style="font-size:26px;align-items:center"><span class="cic">${SVG.check}</span><span>Mental health partial hospitalization</span><span class="pill gold a" id="cl3" style="margin-left:auto;font-size:24px"><span><span id="cln">0</span>+ hrs/wk</span></span></div>
${C[16].html}`, true);

// position cards
CH.forEach(ch=>ch.forEach((n,k)=>{ $('#c'+n).style.top=(BASE+Math.min(k,2)*RH+(k?6:0))+'px'; }));

// ===================== TIMELINE =====================
// ---- Scene 1 ----
tl.set({},{},0);
pop('#book',0.35,{s:.5,d:.7});sfx(0.3,'whoosh',.55);sfx(0.45,'pop',.8);
rise('#bookCap',1.6);
tl.fromTo('#bookInner',{rotationY:-24},{rotationY:-14,duration:20,ease:'none'},0.35);
// fan out 16 tags
const cx=1630,cy=392;
for(let i=1;i<=16;i++){
  const a=(-90+ (i-1)*(360/16))*Math.PI/180;
  const x=cx+Math.cos(a)*228, y=cy+Math.sin(a)*262;
  tl.set('#g'+i,{left:x-31,top:y-31},0);
  tl.fromTo('#g'+i,{autoAlpha:0,x:cx-x,y:cy-y,scale:.2},{autoAlpha:1,x:0,y:0,scale:1,duration:.55,ease:'back.out(1.6)',immediateRender:false},6.68+i*.045);
}
sfx(6.6,'riser',.35);for(let i=0;i<4;i++)sfx(6.75+i*.18,'pop2',.45,1+i*.08);
pop('#tr1',9.44,{y:20});sfx(9.44,'pop2',.5);
pop('#tr2',10.44,{y:20});sfx(10.44,'pop2',.5,1.08);
pop('#tr3',11.86,{y:20});sfx(11.86,'cash',.35);
// NEW labels on 1..11
for(let i=1;i<=11;i++){pop('#gn'+i,14.3+i*.05,{s:.3,d:.35});}
sfx(14.3,'marimba',.35);
// silent 12..16 grey out
for(let i=12;i<=16;i++){tl.to('#g'+i,{backgroundColor:'#3a4658',borderColor:'#8a96a8',color:'#cfd6e0',scale:.86,duration:.4},16.3+(i-12)*.06);}
sfx(16.3,'softstamp',.35);
// exit scene 1
out(['#tr1','#tr2','#tr3','#bookCap'],19.9,{y:20});
for(let i=1;i<=16;i++) out('#g'+i,19.95+i*.012,{x:300,d:.4});
out('#book',20.1,{x:420,d:.45});sfx(20.15,'whoosh',.5);

// ---- Stage in + authority ----
tl.fromTo('#stage',{autoAlpha:0,x:140},{autoAlpha:1,x:0,duration:.6,ease:'power3.out',immediateRender:false},20.35);
rise('#sAuth',20.75,{y:40});sfx(20.8,'snap',.5);
pop('#au1',23.42);sfx(23.42,'pop',.5);
pop('#au2',25.3);sfx(25.3,'pop2',.4);
pop('#au3',27.2);sfx(27.2,'pop2',.4,1.1);
out('#sAuth',29.2,{y:-30});
// handbook page 2
rise('#sHB',29.4,{y:40});sfx(29.4,'pageturn',.6);
tl.fromTo('#hbPg',{rotationY:-22,scale:.92},{rotationY:-6,scale:1,duration:7.5,ease:'power1.out'},29.4);
pop('#hb16',32.1,{s:.4});sfx(32.1,'pop',.6);
out('#sHB',37.45,{y:-30});
// part 1
rise('#sP1',37.72,{y:30});sfx(37.72,'whoosh',.4);
pop('#p1new',40.6,{s:.3});sfx(40.6,'stamp',.35);
pop('#p1n',38.96,{s:.5});sfx(38.96,'pop',.6);
rise('#p1s',43.0);
out('#sP1',46.5,{y:-30});
// tabs + progress
rise(['#tabs','#prog','#progLbl'],42.4,{y:-14,st:.08});sfx(42.4,'whoosh',.3);
const tabsel=['#t1','#t2','#t3','#t4','#t5','#t6'];
TABT.forEach((t,i)=>{ if(i>0) tl.set(tabsel[i-1],{attr:{class:'tab'}},t); tl.set(tabsel[i],{attr:{class:'tab on'}},t); sfx(t,'click',.4); });
const PN={v:1};counters.push(['#progN',PN,v=>String(Math.round(v)).padStart(2,'0')]);
for(let n=1;n<=16;n++){
  const t=T[n];
  tl.set(PN,{v:n},t);
  tl.to('#sg'+n,{backgroundColor:'#F3C94B',borderColor:'#F3C94B',duration:.3},t);
  if(n>1) tl.to('#sg'+(n-1),{backgroundColor:'rgba(255,255,255,.55)',borderColor:'rgba(255,255,255,.55)',duration:.3},t);
}
// ---- chapter stacks ----
CH.forEach((ch,ci)=>{
  ch.forEach((n,k)=>{
    const t=T[n];
    if(k>0){ const p=ch[k-1]; out('#c'+p,t-.05,{y:-30,d:.3});
      // rows
      for(let j=0;j<k;j++){
        const slot=j-(k-Math.min(k,2));
        const id='#r'+ch[j];
        if(j==k-1){ tl.set(id,{top:BASE+slot*RH},t); rise(id,t+.05,{y:20,d:.35}); }
        else if(slot<0){ if(slot==-1) out(id,t,{y:-20,d:.3}); }
        else tl.to(id,{top:BASE+slot*RH,duration:.35,ease:'power2.inOut'},t);
      }
    }
    tl.fromTo('#c'+n,{autoAlpha:0,y:40,scale:.97},{autoAlpha:1,y:0,scale:1,duration:.5,ease:'power3.out',immediateRender:false},t+.12);
    sfx(t+.1,n==14?'whoosh':'snap',n==14?.5:.45);
    if($('#dt'+n)) pop('#dt'+n,t+.55,{s:.5});
  });
  const e=CHEND[ci]; out('#c'+ch[ch.length-1],e,{y:-30});
  ch.slice(0,-1).forEach(n=>out('#r'+n,e,{d:.3}));
});

// ---- #1 ----
C[1].anim();
pop('#m1a',50.98);sfx(50.98,'pop2',.6,1.0);
pop('#m1b',55.42);sfx(55.42,'pop2',.6,1.12);
pop('#m1c',58.06);sfx(58.06,'pop2',.6,1.25);
rise('#m1d',52.1);
// ---- #2 ----
rise('#m2tl',62.3);
tl.to('#m2bar',{scaleX:1,duration:1.4,ease:'elastic.out(1,0.55)'},66.06);sfx(66.0,'stretch',.55);
pop('#m2end',66.4,{s:.4});
pop('#m2h',71.44,{y:20});sfx(71.5,'pop',.55);
C[2].anim();
// ---- #3 ----
['#m3a','#m3b','#m3c','#m3d'].forEach((s,i)=>{const t=[81.28,82.46,83.56,84.96][i];pop(s,t);sfx(t,'pop2',.45,1+i*.06);});
pop('#m3m',87.12,{s:.4});sfx(87.12,'snap',.55);sfx(87.2,'marimba',.55);
rise('#m3e',90.84,{x:-20,y:0});rise('#m3f',92.38,{x:-20,y:0});rise('#m3g',93.62,{x:-20,y:0});sfx(90.84,'pop2',.35);sfx(93.62,'pop2',.35,1.1);
C[3].anim();
// ---- #4 ----
pop('#m4n',101.76,{s:.3});sfx(101.76,'stamp',.3);
C[4].anim();
pop('#m4a',111.48,{x:-20});sfx(111.48,'pop2',.4);
pop('#m4b',112.30,{x:-20});sfx(112.3,'pop2',.4,1.1);
pop('#m4g',113.24,{s:.4,d:.55});sfx(113.24,'cash',.6);
rise('#m4w',115.62);sfx(115.6,'warnchime',.6);
tl.fromTo('#m4x',{autoAlpha:0,y:-40,scale:1.08},{autoAlpha:1,y:0,scale:1,duration:.3,ease:'power4.in',immediateRender:false},117.5);sfx(117.75,'stamp',.75);
tl.fromTo('#m4y',{autoAlpha:0,y:-40,scale:1.08},{autoAlpha:1,y:0,scale:1,duration:.3,ease:'power4.in',immediateRender:false},124.3);sfx(124.55,'stamp',.75);
// ---- #5 ----
rise('#m5w',139.5,{y:20});sfx(139.6,'pop',.5);
rise('#m5n',145.0);
rise('#m5l',149.4,{x:-30,y:0});sfx(149.5,'whoosh',.3);
rise('#m5r',155.8,{x:30,y:0});sfx(155.9,'check',.45);
tl.to('#m5hl',{scaleX:1,duration:.5,ease:'power2.inOut'},157.2);sfx(157.2,'highlighter',.6);
// ---- #6 ----
pop('#m6d',164.0,{y:20});pop('#m6p',164.5,{y:20});sfx(164.0,'pop2',.4);sfx(164.5,'pop2',.4,1.1);
rise('#m6f',170.2);
pop('#m6fx',171.1,{s:1.6,d:.3,e:'power3.out'});sfx(171.1,'crumple',.6);
tl.to('#m6f',{opacity:.45,duration:.3},171.4);
tl.fromTo('#m6e',{autoAlpha:0,scaleX:0,transformOrigin:'left center'},{autoAlpha:1,scaleX:1,duration:.45,ease:'power3.out',immediateRender:false},173.3);sfx(173.3,'whooshclick',.6);
pop('#m6s',174.42);sfx(174.42,'pop2',.4);
// ---- #7 ----
pop('#m7a',182.54);sfx(182.54,'pop2',.55,1.0);
pop('#m7b',184.04);sfx(184.04,'pop2',.55,1.1);
pop('#m7c',184.74);sfx(184.74,'pop2',.55,1.2);
C[7].anim();
// ---- #8 ----
rise('#m8a',188.3,{x:-20,y:0});sfx(188.3,'pop',.45);
['#m8c','#m8d','#m8e','#m8f'].forEach((s,i)=>{const t=[191.66,192.0,193.24,194.02][i];pop(s,t,{y:10});});sfx(193.24,'pop2',.35);
rise('#m8b',195.98,{x:20,y:0});sfx(195.98,'whooshclick',.4);
C[8].anim();
// ---- #9 ----
rise('#m9s',201.5,{y:20});
count('#m9n',201.8,0,50,1.5,v=>Math.round(v));
for(let i=0;i<8;i++) sfx(201.8+i*.17,'tick',.45,1+i*.03);
pop('#m9y',202.8,{y:10});
pop('#m9a',207.24);pop('#m9b',208.48);pop('#m9c',209.38);pop('#m9d',212.40);
sfx(207.24,'pop2',.35);sfx(208.48,'pop2',.35,1.08);sfx(209.38,'pop2',.35,1.16);sfx(212.4,'pop',.4);
C[9].anim();
// ---- #10 ----
C[10].anim();
[['#ma1',225.7],['#ma2',228.58],['#ma3',230.58],['#ma4',232.22]].forEach(([s,t])=>{rise(s,t,{x:-20,y:0,d:.35});sfx(t,'check',.4);});
[['#mb1',234.44],['#mb2',235.44],['#mb3',236.72]].forEach(([s,t])=>{rise(s,t,{x:20,y:0,d:.35});sfx(t,'softstamp',.5);});
// ---- #11 ----
pop('#mt1',242.18);sfx(242.18,'pop',.45);pop('#mt2',245.8);pop('#mt3',246.4);sfx(246.4,'pop2',.4);
C[11].anim();
pop('#mt4',252.42);
tl.fromTo('#alert',{autoAlpha:0,y:320},{autoAlpha:1,y:0,duration:.55,ease:'power3.out',immediateRender:false},249.4);sfx(249.4,'whoosh',.5);
rise('#alT2',251.6);
tl.fromTo('#alStamp',{autoAlpha:0,scale:2.2},{autoAlpha:1,scale:1,duration:.22,ease:'power4.in',immediateRender:false},260.5);sfx(260.68,'stamp',.9);
out('#alert',263.5,{y:320,d:.45});
// ---- Part 2 full screen ----
tl.fromTo('#p2',{autoAlpha:0,clipPath:'inset(0 100% 0 0)'},{autoAlpha:1,clipPath:'inset(0 0% 0 0)',duration:.5,ease:'power3.inOut',immediateRender:false},263.95);sfx(263.95,'whoosh',.5);
rise('#p2k',264.3);
tl.fromTo('#flip1 .fl:not(.sp),#flip2 .fl:not(.sp)',{rotationX:-90,autoAlpha:0},{rotationX:0,autoAlpha:1,duration:.4,ease:'back.out(1.5)',stagger:.04,immediateRender:false},265.2);
sfx(265.2,'boardflip',.6);
rise('#p2s',266.6);
tl.to('#p2',{clipPath:'inset(0 0 0 100%)',duration:.5,ease:'power3.inOut'},270.4);
tl.set('#p2',{autoAlpha:0},270.95);
// ---- #12 ----
pop('#mn',277.42,{s:.4});sfx(277.42,'pop',.6);
[281.02,282.02,282.86,283.72,284.66].forEach((t,i)=>{pop('#mn'+(i+1),t,{y:14});sfx(t,'pop2',.45,1+i*.06);});
rise('#mnw',285.6);sfx(285.6,'warnping',.4);
C[12].anim();
// ---- #13 ----
rise('#mm0',293.9);
pop('#mmMay',298.02,{s:.5});sfx(298.02,'pop2',.45);
tl.to('#mmMay',{rotationX:90,autoAlpha:0,duration:.18,ease:'power2.in'},304.0);
tl.fromTo('#mmMust',{autoAlpha:0,rotationX:-90,scale:1.2},{autoAlpha:1,rotationX:0,scale:1,duration:.3,ease:'back.out(2)',immediateRender:false},304.16);
sfx(304.1,'typewriter',.7);
rise('#mm1',307.0);sfx(307.0,'pop',.45);
C[13].anim();
// ---- #14 ----
rise('#pt1',b(317.4),{x:-20,y:0});
count('#ptd',b(318.9),615,700,1.5,v=>Math.round(v));for(let i=0;i<7;i++) sfx(b(318.9)+i*.18,'tick',.4,1+i*.04);sfx(b(318.85),'ratchet',.3);
rise('#pt2',b(322.7),{x:-20,y:0});
count('#ptc',b(324.6),2100,2400,1.6,v=>Math.round(v).toLocaleString('en-US'));for(let i=0;i<8;i++) sfx(b(324.6)+i*.18,'tick',.4,1+i*.04);sfx(b(324.55),'ratchet',.3);
pop('#pt3',b(329.4),{y:16});sfx(b(329.55),'padlock',.7);
rise('#pt4',b(332.3));
pop('#pt5',b(336.55));sfx(b(336.55),'pop2',.5);
pop('#pt6',b(339.13));sfx(b(339.13),'pop2',.5,1.1);
// ---- #15 ----
rise('#pf0',b(345.5));
const q='Search plans by doctor…';const Q={v:0};counters.push(['#pfT',Q,v=>q.slice(0,Math.round(v))]);
tl.to(Q,{v:q.length,duration:1.6,ease:'none'},b(348.2));
for(let i=0;i<8;i++) sfx(b(348.2)+i*.2,'tick',.25,1.2);
tl.fromTo('#pfC',{opacity:1},{opacity:0,duration:.4,repeat:40,yoyo:true,ease:'steps(1)'},b(345.6));
pop('#pf1',b(350.1),{y:10});sfx(b(350.1),'check',.4);
pop('#pf2',b(351.3),{y:10});
rise('#pfw',b(354.4));sfx(b(354.6),'warnping',.55);
// ---- #16 ----
rise('#cl1',b(365.07),{x:-20,y:0});sfx(b(365.07),'check',.55);
rise('#cl2',b(369.4),{x:-20,y:0});
pop('#cl3',b(373.2));count('#cln',b(373.2),0,20,.8,v=>Math.round(v));sfx(b(373.39),'warnping',.4);sfx(b(373.2),'check',.4);
C[16].anim();
// ---- Summary ----
rise('#sSum',b(376.95),{y:30});sfx(b(376.95),'whoosh',.35);
pop('#sm1',b(380.41),{x:-20});sfx(b(380.41),'pop2',.4);
pop('#sm2',b(381.77),{x:-20});sfx(b(381.77),'pop2',.4,1.08);
pop('#sm3',b(384.07),{x:-20});sfx(b(384.07),'pop2',.4,1.16);
pop('#smCal',b(387.85),{s:.4,d:.55});sfx(b(387.85),'snap',.55);
out('#sSum',b(389.5),{y:-30});
// ---- CTA ----
tl.set('#sCTA',{autoAlpha:1},b(389.6));
rise('#ctaA',b(389.75),{y:30});sfx(b(389.75),'whoosh',.3);
tl.fromTo('#mgov',{scale:1},{scale:1.12,duration:.18,yoyo:true,repeat:1,ease:'power2.out'},b(394.85));sfx(b(394.85),'pop',.6);
rise('#ctaB',b(396.8),{y:40});sfx(b(396.8),'snap',.45);
for(let i=0;i<12;i++){const t=b(403.43)+i*0.165;pop('#pd'+i,t,{y:-14,s:.7,d:.25}); if(i!=3&&i!=7) sfx(t,'dialtick',.3,1+(i%4)*.05);}
rise('#url',b(407.2),{y:10});
tl.fromTo('#mouse',{autoAlpha:0,x:120,y:60},{autoAlpha:1,x:0,y:0,duration:.6,ease:'power2.out',immediateRender:false},b(407.4));
tl.to('#urlT',{color:'#F3C94B',textDecoration:'underline',duration:.1},b(408.1));sfx(b(408.1),'click',.6);
tl.to('#mouse',{scale:.85,duration:.08,yoyo:true,repeat:1},b(408.05));
// ---- End card ----
tl.fromTo('#end',{autoAlpha:0},{autoAlpha:1,duration:.6,ease:'power2.out',immediateRender:false},b(409.25));
sfx(b(409.3),'resolve',.6);
tl.set({},{},b(409.25)+2.9);
