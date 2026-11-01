/* Pages: checkout, confirmation, order tracking */
function initCheckout(){let mode="pickup";const f=$("#f");
 const sum=()=>{const p=price($("#stu")&&$("#stu").checked),fee=mode==="delivery"?FEE:0;$("#sum").innerHTML=`<div class="row"><span>Subtotal</span><span>${PHP(p.sub)}</span></div>${p.lines.map(l=>`<div class="row"><span>${l[0]}</span><span>${PHP(l[1])}</span></div>`).join("")}${fee?`<div class="row"><span>Delivery fee</span><span>${PHP(fee)}</span></div>`:""}<div class="row"><strong>Total</strong><span class="price">${PHP(p.total+fee)}</span></div>`};
 f.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{mode=b.dataset.m;f.querySelectorAll("[data-m]").forEach(x=>x.setAttribute("aria-pressed",x===b));$("#ad").hidden=mode!=="delivery";sum()});
 if($("#stu"))$("#stu").onchange=sum;sum();
 f.onsubmit=e=>e.preventDefault();$("#go").onclick=()=>{const g=$("#go");if(g.disabled)return;
  if(!$("#nm").value.trim()||!$("#ph").value.trim())return $("#err").textContent="Add your name and phone number.";
  if(!$("#br").value)return $("#err").textContent="No branch is taking orders right now. Please try again later.";
  if(mode==="delivery"&&!/santa rosa/i.test($("#addr").value))return $("#err").textContent="Delivery is only within Santa Rosa, Laguna. Include it in the address.";
  g.disabled=true;const p=price($("#stu")&&$("#stu").checked),id="SD-"+Math.random().toString(36).slice(2,7).toUpperCase();
  S.orders[id]={id,q:nextQ($("#br").value),qd:mdate(),ts:Date.now(),uid:(me()||{}).id||null,name:$("#nm").value.trim(),ph:$("#ph").value.trim(),pay:$("#pay").value,stu:$("#stu")&&$("#stu").checked?1:0,sub:p.sub,disc:p.sub-p.total,pl:p.lines,mode,br:$("#br").value,s:0,total:p.total+(mode==="delivery"?FEE:0),items:Object.entries(S.cart).map(([k,q])=>({k,n:item(k).n,p:item(k).p,q,c:item(k).c}))};
  S.last=id;S.cart={};save();upd();go("#confirmation")}}

Object.assign(R,{
checkout(){if(!Object.keys(S.cart).length){go("#order");return ""}
 return `<h2>Checkout</h2><div class="demo">Demo checkout. No real charges. Use test card 4242 4242 4242 4242 (Stripe test mode would be wired here).</div>
 <form id="f" class="two" novalidate><div><label>Fulfilment</label><div class="seg"><button type="button" class="chip" data-m="pickup" aria-pressed="true">Pickup</button><button type="button" class="chip" data-m="delivery" aria-pressed="false">Delivery</button></div>
 <label for="br">Branch</label><select id="br">${BR.filter(b=>!b.paused).map(b=>`<option value="${b.id}">${b.n}</option>`).join("")}</select>
 <label for="nm">Name</label><input id="nm" required autocomplete="name"><label for="ph">Phone</label><input id="ph" type="tel" required autocomplete="tel"><label for="em">Email</label><input id="em" type="email" autocomplete="email">
 <div id="ad" hidden><label for="addr">Delivery address (Santa Rosa, Laguna)</label><input id="addr" autocomplete="street-address"><small>Handed off to a delivery partner. Fee ${PHP(FEE)} and ~35–45 min are placeholders.</small></div>
 <label for="nt">Notes</label><textarea id="nt" rows="2"></textarea></div>
 <div><label for="pay">Payment</label><select id="pay"><option>Card (demo)</option><option>Cash on pickup/delivery</option></select>
 ${PR("stu").on?`<label><input type="checkbox" id="stu" style="width:auto"> I’ll show a valid student ID at handoff (${PR("stu").pct}% off)</label>`:""}
 <div id="sum" style="margin:16px 0"></div><button class="btn" id="go" type="button">Place demo order</button><p id="err" role="alert" style="color:var(--primary);font-weight:600"></p></div></form>`},
confirmation(id){const o=S.orders[id];if(!o)return `<h2>Order not found</h2><a class="btn" href="#menu">Back to menu</a>`;
 return `<h2>Order received</h2><p>Thanks, ${esc(o.name)}. Your order number is <strong>${o.id}</strong>.</p>${o.q?`<div class="qcard"><span>Your queue number</span><strong>${qfmt(o)}</strong><small>${esc(brn(o.br))}</small></div>`:""}${o.items.map(i=>`<div class="row"><span>${i.q}× ${i.n}</span><span>${PHP(i.q*i.p)}</span></div>`).join("")}<div class="row"><strong>Total${o.mode==="delivery"?" (incl. delivery)":""}</strong><span class="price">${PHP(o.total)}</span></div><p>${o.mode==="pickup"?"Pickup at ":"Delivering from "}${BR.find(b=>b.id===o.br).n}.</p><a class="btn" href="#track">Track order</a><div class="demo">Showcase order. Nothing was charged.</div>`},
track(){const o=S.orders[S.last];if(!o)return `<h2>Track order</h2><p>No recent order. Place one and its status shows up here.</p><a class="btn" href="#menu">Order now</a>`;
 const st=["Received","Preparing",o.mode==="pickup"?"Ready for pickup":"Out for delivery","Completed"];
 if(o.x)return `<h2>Order ${o.id}</h2><p><strong>This order was cancelled.</strong> Contact the branch if you have questions.</p><a class="btn" href="#menu">Order again</a>`;
 const qa=o.q&&o.qd===mdate()?qAct(o.br):[],ahead=qa.filter(x=>x.q<o.q).length;
 return `<h2>Order ${o.id}</h2>${o.q?`<div class="qcard"><span>Your queue number</span><strong>${qfmt(o)}</strong><small>${o.s<3?(qa[0]?"Now serving "+qfmt(qa[0])+" · "+(ahead?ahead+" order"+(ahead>1?"s":"")+" ahead of you":"You are next"):""):"Thanks for ordering!"}</small></div>`:""}<div class="steps" role="list">${st.map((s,i)=>`<div role="listitem" class="${i<=o.s?"on":""}" ${i===o.s?'aria-current="step"':""}>${s}</div>`).join("")}</div><p>Status: <strong>${st[o.s]}</strong>. Updates automatically (demo advances every 10 seconds).</p><p>Estimated ready: about ${Math.max(0,(3-o.s)*10)} min.</p>`}
});
