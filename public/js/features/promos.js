/* Promotions: rules, text and promo strip */
const PRD={tue:{on:1,pct:15},dt:{on:1,price:329},stu:{on:1,pct:10}},PR=k=>({...PRD[k],...(S.pr[k]||{})});

const cp=()=>{const m=item("classic");return m?m.p:189};

const tueTxt=()=>PR("tue").pct+"% off selected burgers every Tuesday (Classic Stack, Smokehouse BBQ, Crispy Cluck; placeholder selection). ";

const dtTxt=()=>"Two Classic Stacks for "+PHP(PR("dt").price)+" (regular "+PHP(cp()*2)+").";

const stuTxt=()=>PR("stu").pct+"% off with a valid student ID, checked at pickup or delivery.";

function promoStrip(){const L=[];
 if(PR("tue").on)L.push(`<div class="promo"><h3>${ic("calendar-star")}STACK’D Tuesday</h3>${tueTxt()}${isTue()?"<strong>Live today.</strong>":"Applied automatically in your cart."}${D_CHEESE}</div>`);
 if(PR("dt").on)L.push(`<div class="promo"><h3>${ic("sale")}Double Trouble</h3>${dtTxt()}<p style="margin:8px 0 0"><button class="btn s" onclick="add('classic');add('classic')">Add the deal</button></p>${D_BURGER}</div>`);
 if(PR("stu").on)L.push(`<div class="promo"><h3>${ic("school")}Student Stack</h3>${stuTxt()} Tick the box at checkout.${D_CHEESE}</div>`);
 if(!L.length)return `<section id="promos" aria-label="Deals"><p>No deals running right now. Check back soon.</p></section>`;
 return `<section id="promos" aria-label="Deals"><div class="pgrid" tabindex="0" role="group" aria-label="Current deals">${L.join("")}</div><div class="pnav"><button type="button" class="pb" data-pc="-1" aria-label="Previous deal">‹</button><span class="pdots" aria-hidden="true">${L.map((_,k)=>`<i${k?"":' class="on"'}></i>`).join("")}</span><button type="button" class="pb" data-pc="1" aria-label="Next deal">›</button></div><small class="dnote">${ic("sale")}<span>Deals apply in this order: Double Trouble, Tuesday on the rest, then Student Stack.</span>${D_BURGER}</small></section>`}
