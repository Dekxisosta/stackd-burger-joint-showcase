/* Confirm dialog used by admin actions */
function ask(o,fn){const prev=document.activeElement,bg=document.createElement("div");bg.className="mbg";
 bg.innerHTML=`<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="mt" aria-describedby="mm"><h3 id="mt">${esc(o.title||"Are you sure?")}</h3><p id="mm">${esc(o.msg||"")}</p><div class="macts"><button type="button" class="btn s" data-x="0">${esc(o.cancel||"Cancel")}</button><button type="button" class="btn s ${o.danger?"danger":"p"}" data-x="1">${esc(o.ok||"OK")}</button></div></div>`;
 const bs=[...bg.querySelectorAll("button")];
 const done=ok=>{document.removeEventListener("keydown",key,true);bg.remove();if(prev&&prev.focus&&document.contains(prev))prev.focus();if(ok)fn()};
 const key=e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();done(0)}else if(e.key==="Tab"){const i=bs.indexOf(document.activeElement);e.preventDefault();bs[(i+(e.shiftKey?-1:1)+bs.length)%bs.length].focus()}};
 bg.onclick=e=>{if(e.target===bg)done(0);const b=e.target.closest("[data-x]");if(b)done(b.dataset.x==="1")};
 document.addEventListener("keydown",key,true);document.body.append(bg);bs[0].focus()}
