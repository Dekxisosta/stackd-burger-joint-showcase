/* Cart: add/remove, count and pricing with discounts */
function add(id){if(S.out[id])return toast("Sold out");S.cart[id]=(S.cart[id]||0)+1;save();upd();toast("Added "+item(id).n)}

function qty(id,d){S.cart[id]=(S.cart[id]||0)+d;if(S.cart[id]<=0)delete S.cart[id];save();upd();if(hh()==="#order")route()}

function upd(){const n=Object.values(S.cart).reduce((a,b)=>a+b,0);$("#cc").textContent=n;$("#cartbtn").setAttribute("aria-label","Cart, "+n+" items");const k=$("#ksum");if(k)k.textContent=n?n+" item"+(n>1?"s":"")+" · "+PHP(price(0).total):"Your order is empty"}

function price(student){
 let sub=0,lines=[],disc=0;
 for(const[id,q]of Object.entries(S.cart))sub+=item(id).p*q;
 const cl=S.cart.classic||0,pairs=PR("dt").on?Math.floor(cl/2):0;
 if(pairs){const d=pairs*Math.max(0,cp()*2-PR("dt").price);disc+=d;lines.push(["Double Trouble ×"+pairs,-d])}
 if(isTue()&&PR("tue").on){let e=0;for(const[id,q]of Object.entries(S.cart)){const m=item(id);if(S.tue[id]??m.tue){const n=id==="classic"?q-pairs*2:q;e+=n*m.p}}
  if(e>0){const d=Math.round(e*PR("tue").pct/100);disc+=d;lines.push(["STACK’D Tuesday "+PR("tue").pct+"%",-d])}}
 if(student&&PR("stu").on){const d=Math.round((sub-disc)*PR("stu").pct/100);disc+=d;lines.push(["Student Stack "+PR("stu").pct+"%",-d])}
 return{sub,lines,total:sub-disc}}
