/* Core utilities: currency, Manila time, DOM helpers, toast */
const VID="/hero.mp4";

const PHP=n=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",maximumFractionDigits:0}).format(n);

const $=s=>document.querySelector(s),app=$("#app");

const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const mdate=()=>{const d=manila();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()};

const manila=()=>new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Manila"}));

const isTue=()=>manila().getDay()===2;

function toast(t){const e=document.createElement("div");e.className="toast";e.setAttribute("role","status");e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),1800)}
