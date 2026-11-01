/* Menu: item lookup, applying edits, product cards, kiosk grid and item picker */
const item=id=>MENU.find(m=>m.id===id);

function applyMenu(){MENU.length=0;BASE.concat(S.nw).forEach(b=>{if(S.rm[b.id])return;const m={...b,...(S.ed[b.id]||{})};if(!m.img)m.img=IMG[m.id];MENU.push(m)});Object.keys(S.cart||{}).forEach(k=>{if(!MENU.some(m=>m.id===k))delete S.cart[k]})}

applyMenu();

function card(m){return `<article class="card">${lbl(m)}${pic(m)}<div class="b"><h3><a href="#item-${m.id}">${m.n}</a></h3><div class="dsc">${m.d}</div><div class="tag">${m.tags.join(" · ")}${(S.tue[m.id]??m.tue)?" · Tuesday deal":""}</div><div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="price">${PHP(m.p)}</span>${S.out[m.id]?'<strong>Sold out</strong>':`<button class="btn s p" onclick="add('${m.id}')">Add to cart</button>`}</div></div></article>`}

let KC="Burgers";

function tile(m){const o=S.out[m.id];return `<button class="tile" ${o?"disabled":""} onclick="pick('${m.id}')">${lbl(m)}${pic(m)}<strong class="d">${m.n}</strong><span class="price">${o?"Sold out":PHP(m.p)}</span></button>`}

function kgrid(){$("#kg").innerHTML=MENU.filter(m=>m.c===KC).map(tile).join("");document.querySelectorAll(".cat").forEach(b=>b.setAttribute("aria-pressed",b.dataset.c===KC));$("#kt").textContent=KC}

function initKiosk(){document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{KC=b.dataset.c;kgrid()});kgrid();upd()}

function pick(id){const m=item(id),ex=["Add-ons","Drinks"].includes(m.c)?[]:MENU.filter(a=>a.c==="Add-ons"&&!S.out[a.id]);let q=1,d=$("#dlg");if(!d){d=document.createElement("dialog");d.id="dlg";document.body.append(d)}
 d.innerHTML=`${pic(m,"aspect-ratio:16/9")}<h3 style="margin-top:12px;font-size:38px">${m.n}</h3><p>${m.d}</p><div class="tag">${m.tags.join(" · ")}</div>${ex.length?`<h3 style="margin-top:14px">Add-ons</h3>${ex.map(a=>`<label class="opt"><input type="checkbox" value="${a.id}" style="width:auto"> ${a.n} (+${PHP(a.p)})</label>`).join("")}`:""}<div class="row"><span class="q"><button type="button" id="qm" aria-label="Fewer">−</button> <strong id="qn">1</strong> <button type="button" id="qp" aria-label="More">+</button></span><button class="btn" id="qa">Add to order</button></div><button class="btn s" id="qc" style="background:transparent;color:inherit;box-shadow:none">Cancel</button>`;
 const tot=()=>{let t=m.p*q;d.querySelectorAll("input:checked").forEach(i=>t+=item(i.value).p*q);$("#qa").textContent="Add to order · "+PHP(t);$("#qn").textContent=q};
 d.onchange=tot;$("#qm").onclick=()=>{q=Math.max(1,q-1);tot()};$("#qp").onclick=()=>{q++;tot()};$("#qc").onclick=()=>d.close();
 $("#qa").onclick=()=>{S.cart[id]=(S.cart[id]||0)+q;d.querySelectorAll("input:checked").forEach(i=>S.cart[i.value]=(S.cart[i.value]||0)+q);save();upd();d.close();toast("Added to your order")};
 tot();d.showModal()}
