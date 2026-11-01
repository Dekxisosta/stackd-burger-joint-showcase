/* Orders: queue numbers, tracking and the status simulator */
function nextQ(bid){const q=S.qn[bid]=S.qn[bid]||{d:"",n:0},d=mdate();if(q.d!==d){q.d=d;q.n=0}return ++q.n}

const qfmt=o=>o&&o.q?"#"+String(o.q).padStart(3,"0"):"—";

const qAct=bid=>Object.values(S.orders).filter(o=>o.br===bid&&o.qd===mdate()&&!o.x&&o.s<3).sort((a,b)=>a.q-b.q);

function trackOrder(id){S.last=id;save();go("#track")}

setInterval(()=>{let ch=0;Object.values(S.orders).forEach(o=>{if(o.s<3&&!o.x&&Date.now()-(o.t=o.t||Date.now())>10000){o.s++;o.t=Date.now();ch=1}});if(ch){save();if(["#track","#admin"].includes(hh()))route()}},5000);
