/* Admin: advance/step back/cancel orders, clear, CSV export, queue reset */
function adv(id){const o=S.orders[id];if(o&&o.s<3&&!o.x)o.s++;if(o)o.t=Date.now();save();route()}

function back(id){const o=S.orders[id];if(o&&o.s>0&&!o.x)o.s--;if(o)o.t=Date.now();save();route()}

function cancelOrder(id){const o=S.orders[id];if(o&&o.s<3)ask({title:"Cancel this order?",msg:"Order "+id+(o.q?" ("+qfmt(o)+")":"")+" for "+o.name+" will be marked as cancelled. The customer will see this on their tracking page.",ok:"Cancel order",cancel:"Keep order",danger:1},()=>{o.x=1;save();route()})}

function clearDone(){ask({title:"Clear finished orders?",msg:"This removes all completed and cancelled orders. This can’t be undone.",ok:"Clear orders",danger:1},()=>{Object.keys(S.orders).forEach(k=>{const o=S.orders[k];if(o.x||o.s===3)delete S.orders[k]});if(!S.orders[S.last])S.last=null;save();route()})}

function resetQueue(){ask({title:"Restart queue numbers?",msg:"Numbering goes back to #001 at every branch. Existing orders keep their numbers.",ok:"Restart"},()=>{S.qn={};save();route()})}

function exportCsv(){const r=[["queue","id","name","mode","branch","status","total","items"]].concat(Object.values(S.orders).filter(o=>!SC()||o.br===SC()).map(o=>[o.q?qfmt(o):"",o.id,o.name,o.mode,brn(o.br),o.x?"Cancelled":["Received","Preparing","Ready","Completed"][o.s],o.total,(o.items||[]).map(i=>i.q+"x "+i.n).join("; ")])),c=r.map(a=>a.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n"),l=document.createElement("a");l.href=URL.createObjectURL(new Blob([c],{type:"text/csv"}));l.download="stackd-orders.csv";document.body.append(l);l.click();l.remove()}
