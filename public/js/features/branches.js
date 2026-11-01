/* Branches: hours, open/closed status, names */
function applyBR(){BR.forEach((b,i)=>Object.assign(b,{ph:"+63 900 000 0000 (placeholder)",o:10,c:22,paused:0},BASEBR[i],S.bd[b.id]||{}))}

applyBR();

const hrs=h=>(h%12||12)+(h<12||h===24?" AM":" PM"),hrTxt=b=>hrs(b.o)+"–"+hrs(b.c),brOpen=b=>{const h=manila().getHours();return !b.paused&&h>=b.o&&h<b.c};

const hrsAll=()=>{const u=[...new Set(BR.map(hrTxt))];return u.length===1?u[0]:null};

const brn=id=>{const b=BR.find(x=>x.id===id);return b?b.n:(id||"")};

function openNow(){return BR.some(brOpen)}

const sBr=id=>brn(id).replace(" – Main Branch","").replace(" Branch","");
