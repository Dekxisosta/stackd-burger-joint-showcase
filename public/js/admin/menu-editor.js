/* Admin: menu editing (availability, price, add, delete, restore, reset) */
function tg(id,k){S[k][id]=!(k==="out"?S.out[id]:(S.tue[id]??item(id).tue));save();route()}

function ed(id,k,v){if(k==="p")v=Math.max(0,Math.round(+v)||0);if(k==="n"){v=v.trim();if(!v)return route()}(S.ed[id]=S.ed[id]||{})[k]=v;save();applyMenu();route();toast("Saved")}

function rmItem(id){const m=item(id);if(!m)return;ask({title:"Delete this item?",msg:"“"+m.n+"” will be removed from the menu. You can restore it later under Menu › Deleted.",ok:"Delete",danger:1},()=>{const i=S.nw.findIndex(x=>x.id===id);if(i>-1)S.nw.splice(i,1);else S.rm[id]=1;delete S.ed[id];save();applyMenu();route()})}

function restore(id){delete S.rm[id];save();applyMenu();route()}

function addMenu(){const n=$("#an").value.trim(),p=Math.round(+$("#ap").value);if(!n||!(p>0))return toast("Name and price are required");S.nw.push({id:"n"+Date.now().toString(36),n,d:$("#ad").value.trim()||"New item",p,c:$("#ac").value,l:$("#al").value,tue:0,tags:[],img:$("#ai").value.trim()});save();applyMenu();route();toast("Item added")}

function resetMenu(){ask({title:"Reset the menu?",msg:"All menu edits, additions and deletions will be undone.",ok:"Reset",danger:1},()=>{S.ed={};S.nw=[];S.rm={};save();applyMenu();route()})}
