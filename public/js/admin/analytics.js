/* Admin: dashboards (sales, customers, food) and chart helpers */
const DAY=864e5,MO=288e5,dkey=t=>new Date(t+MO).toISOString().slice(0,10),hrOf=t=>new Date(t+MO).getUTCHours(),dowOf=t=>new Date(t+MO).getUTCDay(),dnum=t=>Math.floor((t+MO)/DAY);

const oT=o=>{if(o.ts)return o.ts;const m=(o.qd||"").split("-");return m.length===3?Date.UTC(+m[0],+m[1]-1,+m[2],4):Date.now()};

const cKey=o=>(String(o.ph||"").replace(/\D/g,"")||String(o.name||"").trim().toLowerCase());

const MENUCAT=()=>{const m={};BASE.concat(S.nw||[]).forEach(b=>m[b.n]=b.c);MENU.forEach(b=>m[b.n]=b.c);return m};

const kfmt=n=>n>=1e6?(n/1e6).toFixed(1).replace(".0","")+"M":n>=1e4?Math.round(n/1e3)+"k":n>=1e3?(n/1e3).toFixed(1).replace(".0","")+"k":String(Math.round(n));

const pct=(a,b)=>b?Math.round(a/b*100):0;

const DOW=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let AP="30";

function setAP(k){AP=k;route()}

function perBar(){return `<div class="ad-bar" role="group" aria-label="Period">${[["7","Last 7 days"],["30","Last 30 days"],["all","All time"]].map(f=>`<button class="btn s ${AP===f[0]?"p":""}" aria-pressed="${AP===f[0]}" onclick="setAP('${f[0]}')">${f[1]}</button>`).join("")}</div>`}

function dSlice(all){const n=AP==="all"?0:+AP,now=Date.now(),lo=n?dkey(now-(n-1)*DAY):"0000-00-00",plo=n?dkey(now-(2*n-1)*DAY):null,br=all.filter(o=>AB==="all"||o.br===AB),kd=o=>dkey(oT(o));
 return{n,lo,cur:br.filter(o=>kd(o)>=lo),prev:n?br.filter(o=>{const k=kd(o);return k>=plo&&k<lo}):[],all}}

const dl=(c,p,n,inv)=>{if(!n||!p)return"";const d=Math.round((c-p)/p*100);if(!d)return `<small class="dl">no change</small>`;const up=d>0,good=inv?!up:up;return `<small class="dl ${good?"ok":"bad"}">${up?"▲":"▼"} ${Math.abs(d)}% vs prior</small>`};

const kpi=(v,l,x)=>`<div><strong>${v}</strong><span>${l}</span>${x||""}</div>`;

const niceMax=m=>{const e=Math.pow(10,Math.floor(Math.log10(m||1))),f=m/e,s=f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10;return s*e};

function lineChart(pts,fmt,lab){if(!pts.length)return"";const W=720,H=210,L=44,R=10,T=10,B=24,mx=niceMax(Math.max(1,...pts.map(p=>p.v))),x=i=>L+(pts.length>1?i*(W-L-R)/(pts.length-1):(W-L-R)/2),y=v=>T+(H-T-B)*(1-v/mx),
 g=[0,1,2,3,4].map(i=>{const v=mx*i/4;return `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end">${fmt(v)}</text>`}).join(""),
 line=pts.map((p,i)=>(i?"L":"M")+x(i).toFixed(1)+" "+y(p.v).toFixed(1)).join(" "),area=line+` L${x(pts.length-1).toFixed(1)} ${y(0)} L${x(0).toFixed(1)} ${y(0)}Z`,
 step=Math.max(1,Math.ceil(pts.length/6)),xl=pts.map((p,i)=>i%step===0||i===pts.length-1?`<text x="${x(i)}" y="${H-6}" text-anchor="${i===0?"start":i===pts.length-1?"end":"middle"}">${p.l}</text>`:"").join(""),
 hv=pts.map((p,i)=>{const w=(W-L-R)/Math.max(1,pts.length-1);return `<rect x="${x(i)-w/2}" y="${T}" width="${w}" height="${H-T-B}" class="hv"><title>${p.t||p.l}: ${fmt(p.v,1)}</title></rect><circle cx="${x(i)}" cy="${y(p.v)}" r="2.5" class="pt"/>`}).join("");
 return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${g}<path d="${area}" class="ar"/><path d="${line}" class="ln"/>${hv}${xl}</svg>`}

function barChart(items,fmt,lab,o){o=o||{};if(!items.length)return"";const W=720,H=o.h||190,L=44,R=6,T=16,B=24,mx=niceMax(Math.max(1,...items.map(p=>p.v))),n=items.length,bw=(W-L-R)/n,y=v=>T+(H-T-B)*(1-v/mx),
 g=[0,2,4].map(i=>{const v=mx*i/4;return `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end">${fmt(v)}</text>`}).join(""),top=Math.max(...items.map(p=>p.v));
 return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${g}${items.map((p,i)=>`<rect x="${L+i*bw+bw*.16}" y="${y(p.v)}" width="${bw*.68}" height="${Math.max(0,y(0)-y(p.v))}" rx="2" class="${p.v===top&&top>0?"bk":"bs"}"><title>${p.t||p.l}: ${fmt(p.v,1)}</title></rect><text x="${L+i*bw+bw/2}" y="${H-6}" text-anchor="middle">${p.l}</text>`).join("")}</svg>`}

function stackChart(items,fmt,lab){if(!items.length)return"";const W=720,H=200,L=40,R=6,T=10,B=24,mx=niceMax(Math.max(1,...items.map(p=>p.a+p.b))),n=items.length,bw=(W-L-R)/n,y=v=>T+(H-T-B)*(1-v/mx),
 g=[0,2,4].map(i=>{const v=mx*i/4;return `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end">${fmt(v)}</text>`}).join("");
 return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${g}${items.map((p,i)=>{const x=L+i*bw+bw*.18,w=bw*.64;return `<rect x="${x}" y="${y(p.a)}" width="${w}" height="${Math.max(0,y(0)-y(p.a))}" class="sr"><title>${p.t}: ${p.a} returning</title></rect><rect x="${x}" y="${y(p.a+p.b)}" width="${w}" height="${Math.max(0,y(p.a)-y(p.a+p.b))}" class="sn"><title>${p.t}: ${p.b} new</title></rect><text x="${x+w/2}" y="${H-6}" text-anchor="middle">${p.l}</text>`}).join("")}</svg><div class="lg"><span><i class="sn"></i>New customers</span><span><i class="sr"></i>Returning customers</span></div>`}

function hbars(rows,fmt,sub,m0){const mx=Math.max(1,m0||0,...rows.map(r=>r.v));return `<div class="hb">${rows.map(r=>`<div class="hr2"><span class="hl" title="${esc(r.l)}">${esc(r.l)}</span><span class="ht"><i style="width:${Math.max(r.v?1.5:0,r.v/mx*100)}%"></i></span><b>${fmt(r.v)}</b>${sub?`<em>${sub(r)}</em>`:""}</div>`).join("")}</div>`}

const card2=(t,body,note)=>`<section class="dc"><h3>${t}</h3>${body}${note?`<p class="hint">${note}</p>`:""}</section>`;

const live=l=>l.filter(o=>!o.x);

const pLabel=()=>AP==="all"?"all time":"last "+AP+" days";

function dayPts(S0,key){const ls=live(S0.cur);if(!ls.length)return[];const n=S0.n||(dnum(Date.now())-Math.min(...ls.map(o=>dnum(oT(o))))+1),t0=dnum(Date.now())-n+1,a=Array.from({length:n},(_,i)=>({s:0,c:0,i:t0+i}));ls.forEach(o=>{const i=dnum(oT(o))-t0;if(a[i]){a[i].s+=o.total;a[i].c++}});
 return a.map(d=>{const dt=new Date(d.i*DAY),l=dt.toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"});return{l,t:l,v:key==="c"?d.c:d.s}})}

function dashSales(all,bar){const S0=dSlice(all),C=live(S0.cur),Pv=live(S0.prev),sum=(l,f)=>l.reduce((a,o)=>a+f(o),0),rev=sum(C,o=>o.total),prv=sum(Pv,o=>o.total),aov=C.length?rev/C.length:0,paov=Pv.length?prv/Pv.length:0,
 units=sum(C,o=>sum(o.items||[],i=>i.q)),disc=sum(C,o=>o.disc||0),cx=S0.cur.length-C.length,dels=C.filter(o=>o.mode==="delivery").length,act=C.filter(o=>o.s<3).length;
 const hours=Array.from({length:12},(_,i)=>({l:hrs(i+10).replace(" ",""),v:0,c:0})),dows=DOW.map(d=>({l:d,v:0,c:0}));C.forEach(o=>{const t=oT(o),h=hrOf(t)-10;if(h>=0&&h<12){hours[h].v+=o.total;hours[h].c++}dows[dowOf(t)].v+=o.total;dows[dowOf(t)].c++});
 const pk=hours.reduce((a,b)=>b.v>a.v?b:a,hours[0]),pd=dows.reduce((a,b)=>b.v>a.v?b:a,dows[0]);
 const days=[1,2,3,4,5,6,0].map(i=>dows[i]);
 const pro={};C.forEach(o=>(o.pl||[]).forEach(p=>{const k=p[0].replace(/\s*×\d+$/,"").replace(/\s*\d+%$/,"");const r=pro[k]=pro[k]||{l:k,c:0,v:0};r.c++;r.v+=-p[1]}));
 const proRows=Object.values(pro).sort((a,b)=>b.v-a.v);
 const brs=BR.map(b=>{const l=live(S0.cur.filter(o=>o.br===b.id)),r=sum(l,o=>o.total),a=qAct(b.id);return{b,n:l.length,r,aov:l.length?r/l.length:0,act:l.filter(o=>o.s<3).length,srv:a[0]}});
 const modeRows=[{l:"Pickup",v:C.length-dels},{l:"Delivery",v:dels}],payRows=["Card","Cash"].map(k=>({l:k,v:C.filter(o=>(o.pay||"Card").startsWith(k)).length}));
 const sh=b=>b.n.replace(" – Main Branch","").replace(" Branch","");
 return `<h2>Sales overview</h2>${bar}${perBar()}
 <div class="ad-stats">${kpi(PHP(rev),"Net sales",dl(rev,prv,S0.n))}${kpi(C.length,"Orders",dl(C.length,Pv.length,S0.n))}${kpi(PHP(Math.round(aov)),"Average order",dl(aov,paov,S0.n))}${kpi(units,"Items sold",dl(units,sum(Pv,o=>sum(o.items||[],i=>i.q)),S0.n))}${kpi(PHP(disc),"Promo discounts given")}${kpi(pct(dels,C.length)+"%","Delivery share")}${kpi(pct(cx,S0.cur.length)+"%","Cancelled",`<small class="dl">${cx} order${cx===1?"":"s"}</small>`)}${kpi(act,"In queue now")}</div>
 ${C.length?`<div class="dgrid"><div class="dwide">${card2("Daily sales · "+pLabel(),lineChart(dayPts(S0,"s"),(v,full)=>full?PHP(Math.round(v)):"₱"+kfmt(v),"Daily sales"),"Hover a point for the day’s total.")}</div>
 ${card2("Sales by hour",barChart(hours,(v,f)=>f?PHP(Math.round(v)):"₱"+kfmt(v),"Sales by hour of day"),"Peak: "+pk.l+" ("+PHP(Math.round(pk.v))+"). Active hours only, 10 AM to 10 PM.")}
 ${card2("Sales by day of week",barChart(days,(v,f)=>f?PHP(Math.round(v)):"₱"+kfmt(v),"Sales by day of week"),"Best day: "+pd.l+". Tuesday carries the promo.")}
 ${card2("Branch sales",hbars(brs.map(x=>({l:sh(x.b),v:x.r,n:x.n,a:x.aov})).sort((a,b)=>b.v-a.v),PHP,r=>r.n+" orders · avg "+PHP(Math.round(r.a))),"Compare branches in the table below.")}
 ${card2("How customers order",hbars(modeRows.concat(payRows),v=>v+" ("+pct(v,C.length)+"%)"),"Fulfilment: pickup vs delivery. Payment: card vs cash.")}
 ${card2("Promo impact",proRows.length?hbars(proRows.map(r=>({l:r.l,v:r.v,c:r.c})),PHP,r=>r.c+" orders"):"<p>No promos used in this period.</p>","Discount value given by each promo.")}</div>
 ${AB==="all"?`<h3 class="sech">By branch</h3><div class="sheet-w"><table class="sheet"><thead><tr><th>Branch</th><th class="r">Orders</th><th class="r">In queue</th><th class="r">Sales</th><th class="r">Avg order</th><th>Now serving</th></tr></thead><tbody>${brs.map(x=>`<tr><td><a href="#admin" onclick="setAB('${x.b.id}');return false">${esc(sh(x.b))}</a></td><td class="r">${x.n}</td><td class="r">${x.act}</td><td class="r">${PHP(x.r)}</td><td class="r">${PHP(Math.round(x.aov))}</td><td>${x.srv?`<span class="qno">${qfmt(x.srv)}</span>`:"—"}</td></tr>`).join("")}<tr class="grp"><td>All branches</td><td class="r">${C.length}</td><td class="r">${act}</td><td class="r">${PHP(rev)}</td><td class="r">${PHP(Math.round(aov))}</td><td></td></tr></tbody></table></div>`:`<p class="hint">Showing ${esc(brn(AB))} only.</p>`}`:`<p>No orders in this period.</p>`}`}

function dashCust(all,bar){const S0=dSlice(all),first={},hist={};live(all).forEach(o=>{const k=cKey(o),t=oT(o),h=hist[k]=hist[k]||{k,n:0,sp:0,last:0,first:t,name:o.name,mode:{},br:{},it:{},stu:0,del:0};h.n++;h.sp+=o.total;if(t>h.last)h.last=t;if(t<h.first)h.first=t;h.name=o.name;h.br[o.br]=(h.br[o.br]||0)+1;if(o.stu)h.stu++;if(o.mode==="delivery")h.del++;(o.items||[]).forEach(i=>h.it[i.n]=(h.it[i.n]||0)+i.q)});
 const C=live(S0.cur),lo=S0.lo,inP=new Set(C.map(cKey)),act=[...inP].map(k=>hist[k]),isNew=h=>dkey(h.first)>=lo,newC=act.filter(isNew),ret=act.filter(h=>!isNew(h)),
 multi=act.filter(h=>C.filter(o=>cKey(o)===h.k).length>1).length,rate=act.length?pct(act.length-newC.length,act.length):0,
 avgOrd=act.length?C.length/act.length:0,ltv=act.length?act.reduce((a,h)=>a+h.sp,0)/act.length:0,stuC=act.filter(h=>h.stu>0).length,delC=act.filter(h=>h.del>0).length;
 const prevK=new Set(live(S0.prev).map(cKey));
 const buckets={},d1=S0.n&&S0.n<=14,t0=dnum(Date.now());C.forEach(o=>{const di=dnum(oT(o)),b=d1?di:t0-6-Math.floor((t0-di)/7)*7,r=buckets[b]=buckets[b]||{s:new Set(),i:b};r.s.add(cKey(o))});
 const sk=Object.keys(buckets).map(Number).sort((a,b)=>a-b).map(b=>{const ks=[...buckets[b].s],nw=ks.filter(k=>{const f=dnum(hist[k].first);return d1?f===b:f>=b&&f<b+7}).length,l=new Date(b*DAY).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"});return{l,t:(d1?"":"Week of ")+l,a:ks.length-nw,b:nw}});
 const freq=[["1 order",h=>h.n===1],["2 orders",h=>h.n===2],["3–4 orders",h=>h.n>=3&&h.n<=4],["5+ orders",h=>h.n>=5]].map(f=>({l:f[0],v:Object.values(hist).filter(f[1]).length})),tot=Object.values(hist).length;
 const top=[...act].sort((a,b)=>b.sp-a.sp).slice(0,10),fav=h=>Object.entries(h.it).sort((a,b)=>b[1]-a[1])[0],hb=h=>{const e=Object.entries(h.br).sort((a,b)=>b[1]-a[1])[0];return e?brn(e[0]).replace(" – Main Branch","").replace(" Branch",""):"—"};
 const risk=Object.values(hist).filter(h=>h.n>=3&&dnum(Date.now())-dnum(h.last)>=14).sort((a,b)=>b.sp-a.sp);
 const segRows=[{l:"Pickup only",v:act.filter(h=>!h.del).length},{l:"Delivery at least once",v:delC},{l:"Student discount used",v:stuC},{l:"Repeat in period (2+ orders)",v:multi}];
 const byBr=BR.map(b=>({l:b.n.replace(" – Main Branch","").replace(" Branch",""),v:new Set(C.filter(o=>o.br===b.id).map(cKey)).size}));
 const ago=t=>{const d=dnum(Date.now())-dnum(t);return d<=0?"Today":d===1?"Yesterday":d+" days ago"};
 return `<h2>Customer analysis</h2>${bar}${perBar()}
 <div class="ad-stats">${kpi(act.length,"Active customers",dl(act.length,prevK.size,S0.n))}${kpi(newC.length,"New customers")}${kpi(rate+"%","Returning share",`<small class="dl">${ret.length} returning</small>`)}${kpi(avgOrd.toFixed(1),"Orders per customer")}${kpi(PHP(Math.round(ltv)),"Lifetime spend per customer")}${kpi(tot,"Customers on record")}${kpi(risk.length,"At risk",`<small class="dl">3+ orders, none in 14 days</small>`)}</div>
 ${C.length?`<div class="dgrid"><div class="dwide">${card2("New vs returning customers · "+pLabel(),stackChart(sk,v=>kfmt(v),"New and returning customers"),"Customers are matched by phone number, or by name when no phone was given.")}</div>
 ${card2("How often customers order",hbars(freq,v=>v+" ("+pct(v,tot)+"%)"),"All orders on record, per customer.")}
 ${card2("Customer segments",hbars(segRows,v=>v+" ("+pct(v,act.length)+"%)"),"Share of active customers in "+pLabel()+".")}
 ${card2("Customers by branch",hbars(byBr,v=>String(v)),"Distinct customers who ordered at each branch.")}</div>
 <h3 class="sech">Top customers by spend · ${pLabel()}</h3><div class="sheet-w"><table class="sheet"><thead><tr><th>Customer</th><th class="r">Orders</th><th class="r">Spend</th><th>Main branch</th><th>Favourite</th><th>Last order</th></tr></thead><tbody>${top.map(h=>`<tr><td>${esc(h.name)}${h.stu?' <small class="mut">student</small>':""}</td><td class="r">${C.filter(o=>cKey(o)===h.k).length}</td><td class="r">${PHP(C.filter(o=>cKey(o)===h.k).reduce((a,o)=>a+o.total,0))}</td><td>${esc(hb(h))}</td><td>${fav(h)?esc(fav(h)[0]):"—"}</td><td>${ago(h.last)}</td></tr>`).join("")}</tbody></table></div>
 ${risk.length?`<h3 class="sech">Win-back list · loyal customers gone quiet</h3><div class="sheet-w"><table class="sheet"><thead><tr><th>Customer</th><th class="r">Orders</th><th class="r">Lifetime spend</th><th>Favourite</th><th>Last order</th></tr></thead><tbody>${risk.slice(0,8).map(h=>`<tr><td>${esc(h.name)}</td><td class="r">${h.n}</td><td class="r">${PHP(h.sp)}</td><td>${fav(h)?esc(fav(h)[0]):"—"}</td><td>${ago(h.last)}</td></tr>`).join("")}</tbody></table></div>`:""}`:`<p>No orders in this period.</p>`}`}

function dashFood(all,bar){const S0=dSlice(all),C=live(S0.cur),Pv=live(S0.prev),cat=MENUCAT(),agg=l=>{const m={};l.forEach(o=>(o.items||[]).forEach(i=>{const r=m[i.n]=m[i.n]||{n:i.n,c:i.c||cat[i.n]||"Other",q:0,v:0,o:0};r.q+=i.q;r.v+=i.q*i.p;r.o++}));return m},cur=agg(C),prv=agg(Pv),rows=Object.values(cur).sort((a,b)=>b.q-a.q),units=rows.reduce((a,r)=>a+r.q,0),rv=rows.reduce((a,r)=>a+r.v,0);
 MENU.forEach(m=>{if(!cur[m.n])rows.push({n:m.n,c:m.c,q:0,v:0,o:0})});
 const cats=CATS.map(c=>{const l=rows.filter(r=>r.c===c);return{l:c,q:l.reduce((a,r)=>a+r.q,0),v:l.reduce((a,r)=>a+r.v,0)}}).filter(c=>c.q||c.v),byRev=[...rows].sort((a,b)=>b.v-a.v),tp=rows[0],tr=byRev[0],
 hasCat=(o,c)=>(o.items||[]).some(i=>(i.c||cat[i.n])===c),drinkRate=pct(C.filter(o=>hasCat(o,"Drinks")||hasCat(o,"Combos")||hasCat(o,"Bundles")).length,C.length),sideRate=pct(C.filter(o=>hasCat(o,"Sides")||hasCat(o,"Combos")||hasCat(o,"Bundles")).length,C.length),
 pairs={};C.forEach(o=>{const n=[...new Set((o.items||[]).map(i=>i.n))].sort();for(let i=0;i<n.length;i++)for(let j=i+1;j<n.length;j++){const k=n[i]+" + "+n[j];pairs[k]=(pairs[k]||0)+1}});
 const pr=Object.entries(pairs).sort((a,b)=>b[1]-a[1]).slice(0,6).map(e=>({l:e[0],v:e[1]})),slow=[...rows].sort((a,b)=>a.q-b.q).slice(0,5),
 bundleShare=pct(cats.filter(c=>["Combos","Bundles"].includes(c.l)).reduce((a,c)=>a+c.v,0),rv),oos=MENU.filter(m=>S.out[m.id]).length,
 trend=r=>{const p=prv[r.n]?prv[r.n].q:0;if(!S0.n)return"—";if(!p)return r.q?"new":"—";const d=Math.round((r.q-p)/p*100);return d?(d>0?"▲ ":"▼ ")+Math.abs(d)+"%":"flat"};
 return `<h2>Food analysis</h2>${bar}${perBar()}
 <div class="ad-stats">${kpi(units,"Items sold",dl(units,Object.values(prv).reduce((a,r)=>a+r.q,0),S0.n))}${kpi(tp&&tp.q?esc(tp.n):"—","Top seller",tp&&tp.q?`<small class="dl">${tp.q} sold</small>`:"")}${kpi(tr&&tr.v?esc(tr.n):"—","Top earner",tr&&tr.v?`<small class="dl">${PHP(tr.v)}</small>`:"")}${kpi(C.length?(units/C.length).toFixed(1):"0","Items per order")}${kpi(sideRate+"%","Orders with a side")}${kpi(drinkRate+"%","Orders with a drink")}${kpi(bundleShare+"%","Sales from combos and bundles")}${kpi(oos,"Sold out now")}</div>
 ${C.length?`<div class="dgrid">${card2("Top 10 items by units",hbars(rows.slice(0,10).map(r=>({l:r.n,v:r.q,r:r})),v=>v+" sold",x=>PHP(x.r.v)),"Revenue shown at menu price, before discounts.")}
 ${card2("Sales by category",hbars(cats.sort((a,b)=>b.v-a.v).map(c=>({l:c.l,v:c.v,q:c.q})),PHP,r=>pct(r.v,rv)+"% · "+r.q+" items"),"Share of item revenue.")}
 ${card2("Bought together",pr.length?hbars(pr,v=>v+" orders"):"<p>Not enough multi-item orders yet.</p>","Most common item pairs in the same order. Good candidates for new bundles.")}
 ${card2("Slow movers",hbars(slow.map(r=>({l:r.n,v:r.q})),v=>v+" sold",null,tp?tp.q:0),"Lowest sellers in "+pLabel()+". Consider a promo, a better photo or removal.")}</div>
 <h3 class="sech">Full menu performance · ${pLabel()}</h3><div class="sheet-w"><table class="sheet"><thead><tr><th>Item</th><th>Category</th><th class="r">Units</th><th class="r">Revenue</th><th class="r">Share</th><th class="r">In % of orders</th><th class="r">Trend</th></tr></thead><tbody>${byRev.map(r=>`<tr><td>${esc(r.n)}${MENU.some(m=>m.n===r.n&&S.out[m.id])?' <span class="badge-x">Sold out</span>':""}</td><td>${esc(r.c)}</td><td class="r">${r.q}</td><td class="r">${PHP(r.v)}</td><td class="r">${pct(r.v,rv)}%</td><td class="r">${pct(r.o,C.length)}%</td><td class="r">${trend(r)}</td></tr>`).join("")}</tbody></table></div>`:`<p>No orders in this period.</p>`}`}
