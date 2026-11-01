/* Admin: locations, hours, promo settings and delivery fee */
function edb(id,k,v){const b=BR.find(x=>x.id===id);if(!b)return;if(k==="o"||k==="c"){v=+v;const o=k==="o"?v:b.o,c=k==="c"?v:b.c;if(c<=o){route();return toast("Closing time must be after opening time")}}else{v=String(v).trim();if(!v&&k!=="ph"){route();return toast("This can't be empty")}}(S.bd[id]=S.bd[id]||{})[k]=v;save();applyBR();chrome();route();toast("Saved")}

function tgb(id){const b=BR.find(x=>x.id===id);if(!b)return;(S.bd[id]=S.bd[id]||{}).paused=b.paused?0:1;save();applyBR();chrome();route();toast(b.paused?"Branch paused":"Branch taking orders")}

function edp(k,f,v){v=Math.max(f==="pct"?1:0,Math.round(+v)||0);if(f==="pct")v=Math.min(100,v);if(f==="price"&&v<1)return route();(S.pr[k]=S.pr[k]||{})[f]=v;save();route();toast("Saved")}

function tgp(k){(S.pr[k]=S.pr[k]||{}).on=PR(k).on?0:1;save();route();toast(PR(k).on?"Promo on":"Promo off")}

function resetStore(){ask({title:"Reset locations and promos?",msg:"All location and promotion edits will be undone.",ok:"Reset",danger:1},()=>{S.bd={};S.pr={};save();applyBR();chrome();route()})}

function setFee(v){S.fee=Math.max(0,Math.round(+v)||0);FEE=S.fee;save();route();toast("Delivery fee saved")}
