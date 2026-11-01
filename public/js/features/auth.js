/* Accounts: roles/permissions, login, signup, profile, password */
const DEMO_PW="stackd123";

const ROLES={customer:{l:"Customer",d:"Orders food, sees own order history and profile.",p:[]},
 staff:{l:"Staff",d:"Works the queue at one branch: view orders and move them along.",p:["orders.view","orders.advance"]},
 manager:{l:"Manager",d:"Runs one branch: orders, cancellations, exports, dashboards, menu, promotions and branch details.",p:["orders.view","orders.advance","orders.cancel","orders.export","dash.view","menu.edit","store.edit"]},
 admin:{l:"Admin",d:"Everything, across all branches, including accounts, settings and data.",p:["*"]}};

const CAPS=[["orders.view","View orders and queue"],["orders.advance","Advance or step back orders"],["orders.cancel","Cancel orders"],["orders.export","Export orders to CSV"],["dash.view","Sales, customer and food dashboards"],["menu.edit","Edit menu items"],["store.edit","Edit promotions and branch details"],["settings","Settings, demo data, clear orders"],["users.manage","Manage accounts and roles"]];

const hashPw=(pw,salt)=>{let h1=0xdeadbeef,h2=0x41c6ce57;const s=salt+":"+pw;for(let r=0;r<300;r++)for(let i=0,c;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)};

const me=()=>{const u=(S.users||[]).find(x=>x.id===S.sess&&x.on);if(!u)return null;if(Date.now()-(S.sessT||0)>432e5){S.sess=null;return null}return u};

const can=p=>{const u=me(),r=u&&ROLES[u.role];return!!r&&(r.p.includes("*")||r.p.includes(p)||(p==="settings"||p==="users.manage")&&u.role==="admin")};

const SC=()=>{const u=me();return u&&u.role!=="admin"&&u.br?u.br:null};

const isStaffUp=()=>{const u=me();return !!u&&u.role!=="customer"};

function mkU(id,name,email,role,br,ph,extra){const sl=Math.random().toString(36).slice(2,8);return Object.assign({id,name,email:email.toLowerCase(),ph:ph||"",role,br:br||null,on:1,sl,h:hashPw(DEMO_PW,sl),created:Date.now(),last:0},extra||{})}

function seedUsers(custs,list){const old=S.users||[],keepReal=old.filter(u=>!u.seed),oldStaff=old.filter(u=>u.seed&&u.role!=="customer");let staff=oldStaff;
 if(!staff.length){const slug=["santarosa","binan","cabuyao","calamba"],M=["Liza Mercado","Ramon Villareal","Teresa Ocampo","Dennis Alcantara"],St=[["Joy Dizon","Paolo Evangelista"],["Kyle Soriano","Mia Tolentino"],["Ben Magno","Nina Padilla"],["Carl Yap","Ella Santiago"]];
  staff=[mkU("u_admin","Owner Admin","admin@stackd.example","admin",null,"",{seed:1}),mkU("u_ops","Ops Admin","ops@stackd.example","admin",null,"",{seed:1})];
  BR.forEach((b,i)=>{staff.push(mkU("u_m"+(i+1),M[i],"manager."+slug[i]+"@stackd.example","manager",b.id,"",{seed:1}));St[i].forEach((n,j)=>staff.push(mkU("u_s"+(i+1)+(j+1),n,"staff."+slug[i]+(j+1)+"@stackd.example","staff",b.id,"",{seed:1})))})}
 const taken=new Set(keepReal.concat(staff).map(u=>u.email)),cu=[];
 if(custs&&list){const cnt={};list.forEach(o=>{if(!o.x)cnt[o.ph]=(cnt[o.ph]||0)+1});custs.slice().sort((a,b)=>(cnt[b.ph]||0)-(cnt[a.ph]||0)).slice(0,12).forEach((c,i)=>{let em=i===0?"customer@stackd.example":c.name.toLowerCase().replace(/[^a-z]+/g,".")+"@example.com";if(taken.has(em))return;taken.add(em);cu.push(mkU("u_c"+i,c.name,em,"customer",null,c.ph,{seed:1}))})}
 else if(!taken.has("customer@stackd.example"))cu.push(mkU("u_c0","Demo Customer","customer@stackd.example","customer",null,"",{seed:1}));
 S.users=staff.concat(cu,keepReal);if(!me())S.sess=null;save()}

const navExtra=()=>{const u=me();return u?[...(u.role!=="customer"?[["admin","Admin"]]:[]),["account","Account"]]:[["login","Sign in"]]};

const aerr=m=>{const e=$("#aerr");if(e){e.textContent=m;e.focus&&0}return false};

const afterAuth=()=>{AB="all";AT="overview";chrome();upd()};

const LK={};

const EYE='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M12 5C7 5 2.7 8.1 1 12.5 2.7 16.9 7 20 12 20s9.300-3.100 11-7.500C21.300 8.100 17 5 12 5m0 12.500a5 5 0 1 1 0-10 5 5 0 0 1 0 10m0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6"/></svg>';

const pwField=(id,label,ac,extra)=>`<label for="${id}">${label}</label><div class="pwf"><input id="${id}" type="password" autocomplete="${ac}" required ${extra||""}><button type="button" class="pwt" aria-label="Show password" aria-pressed="false" onclick="tgPw('${id}',this)">${EYE}</button></div>`;

function tgPw(id,b){const i=$("#"+id),show=i.type==="password";i.type=show?"text":"password";b.setAttribute("aria-pressed",show);b.setAttribute("aria-label",show?"Hide password":"Show password")}

function capsChk(e){const w=e.target.closest(".pwf").parentNode.querySelector(".caps");if(w)w.hidden=!(e.getModifierState&&e.getModifierState("CapsLock"))}

function fieldChk(el,kind){const m=el.parentNode.querySelector(".fe")||el.closest("div").querySelector(".fe");let t="";const v=el.value.trim();if(kind==="email"&&v&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))t="Enter a valid email address.";if(kind==="req"&&!v)t="This field is required.";if(m)m.textContent=t;el.setAttribute("aria-invalid",!!t)}

function pwStrength(el){const v=el.value,sc=(v.length>=8)+(v.length>=12)+(/[A-Z]/.test(v)&&/[a-z]/.test(v))+(/\d/.test(v))+(/[^A-Za-z0-9]/.test(v)),m=$("#pws"),L=["Too short","Weak","Okay","Good","Strong","Strong"];if(!m)return;const lv=v.length<8?0:Math.max(1,Math.min(4,sc-1));m.dataset.l=lv;m.querySelector("span").textContent=v?L[lv]:"";if($("#sw2")&&$("#sw2").value)matchChk()}

function matchChk(){const m=$("#sw2").parentNode.parentNode.querySelector(".fe2");if(m)m.textContent=$("#sw2").value&&$("#sw2").value!==$("#sw").value?"Passwords don’t match yet.":""}

function authShell(title,sub,inner,aside){return `<div class="auth"><aside class="authv" aria-hidden="false"><video id="hv" data-d="1" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video><div class="avc"><span class="avb">${MK}STACK’D</span><div><h2>Stack Higher.<br>Bite Harder.</h2><ul><li>Follow your order live with a queue number</li><li>Your details saved for faster checkout</li><li>Your order history, all in one place</li></ul></div></div></aside><div class="authf"><h2>${title}</h2><p class="asub">${sub}</p>${inner}${aside||""}</div></div>`}

function loginForm(next){let em="";try{em=localStorage.getItem("stackd-email")||""}catch(e){}
 const dflt=S.users.filter(u=>u.seed&&u.h===hashPw(DEMO_PW,u.sl)),roles=["admin","manager","staff","customer"].filter(r=>dflt.some(u=>u.role===r));
 const form=`<form id="lf" novalidate onsubmit="event.preventDefault();doLogin('${next||""}')"><div><label for="lem">Email</label><input id="lem" type="email" autocomplete="username" inputmode="email" required value="${esc(em)}" data-af="1" onblur="fieldChk(this,'email')" aria-describedby="lemE"><small class="fe" id="lemE" role="alert"></small></div>
 <div>${pwField("lpw","Password","current-password",'onkeyup="capsChk(event)" onkeydown="capsChk(event)"')}<small class="caps" hidden>Caps Lock is on</small></div>
 <div class="arow"><label class="chk"><input type="checkbox" id="lrm" ${em?"checked":""}> Remember my email</label><a href="#login" onclick="forgotPw();return false">Forgot password?</a></div>
 <p id="aerr" role="alert" class="aerr"></p><button class="btn p wide" type="submit" id="lbtn">Sign in</button></form><p class="aalt">New to STACK’D? <a href="#signup">Create an account</a></p>`;
 const demo=dflt.length?`<button type="button" class="btn demo2b" onclick="demoModal()" aria-haspopup="dialog">Try a demo account</button>`:"";
 return authShell("Welcome back","Sign in to order, track and manage.",form,demo)}

function demoModal(){const prev=document.activeElement,dflt=S.users.filter(u=>u.seed&&u.h===hashPw(DEMO_PW,u.sl)),roles=["admin","manager","staff","customer"].filter(r=>dflt.some(u=>u.role===r)),bg=document.createElement("div");bg.className="mbg";
 bg.innerHTML=`<div class="modal dmodal" role="dialog" aria-modal="true" aria-labelledby="dmt"><button type="button" class="dmx" data-c="1" aria-label="Close">×</button><h3 id="dmt">Try a demo account</h3><p>Pick a role, then a person. Password for every demo account: <strong>${DEMO_PW}</strong>. Accounts live in this browser only.</p><div class="chips" role="group" aria-label="Role">${roles.map(r=>`<button type="button" class="chip" aria-pressed="false" data-r="${r}">${ROLES[r].l}</button>`).join("")}</div><div class="dlist" id="dlist"></div></div>`;
 const m=bg.firstChild,show=r=>{bg.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x.dataset.r===r));bg.querySelector("#dlist").innerHTML=`<p class="mut">${ROLES[r].d}</p>`+dflt.filter(u=>u.role===r).slice(0,8).map(u=>`<button type="button" class="dl2" data-e="${u.email}"><strong>${esc(u.name)}</strong><span>${u.br?esc(sBr(u.br)):r==="customer"?"Customer":"All branches"}</span></button>`).join("")};
 const done=fill=>{document.removeEventListener("keydown",key,true);bg.remove();document.body.style.overflow="";if(fill){fillLogin(fill)}else if(prev&&prev.focus&&document.contains(prev))prev.focus()};
 const key=e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();done()}else if(e.key==="Tab"){const f=[...m.querySelectorAll("button")],i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}};
 bg.onclick=e=>{if(e.target===bg||e.target.closest("[data-c]"))return done();const r=e.target.closest("[data-r]");if(r)return show(r.dataset.r);const a=e.target.closest("[data-e]");if(a)done(a.dataset.e)};
 document.addEventListener("keydown",key,true);document.body.style.overflow="hidden";document.body.append(bg);show(roles[0]);bg.querySelector(".chip").focus()}

function fillLogin(e){$("#lem").value=e;$("#lpw").value=DEMO_PW;$("#lem").dispatchEvent(new Event("blur"));$("#lbtn").focus();aerr("")}

function forgotPw(){toast("Ask an admin to reset it under Admin › Accounts")}

function doLogin(next){const em=$("#lem").value.trim().toLowerCase(),pw=$("#lpw").value,k=LK[em]=LK[em]||{n:0,t:0};if(Date.now()<k.t)return aerr("Too many attempts. Try again in "+Math.ceil((k.t-Date.now())/1000)+" seconds.");
 const u=S.users.find(x=>x.email===em);if(!u||u.h!==hashPw(pw,u.sl)){if(++k.n>=5){k.t=Date.now()+30000;k.n=0}return aerr("Email or password is incorrect.")}
 if(!u.on)return aerr("This account is disabled. Ask an admin.");k.n=0;try{if($("#lrm").checked)localStorage.setItem("stackd-email",em);else localStorage.removeItem("stackd-email")}catch(e){}S.sess=u.id;S.sessT=Date.now();u.last=Date.now();save();afterAuth();toast("Signed in as "+u.name);go(next||(u.role==="customer"?"#menu":"#admin"))}

function logout(){S.sess=null;save();window.A=0;afterAuth();go("#home")}

function doSignup(){const g=id=>$("#"+id).value.trim(),n=g("sn"),em=g("se").toLowerCase(),ph=g("sp"),pw=$("#sw").value;
 if(!n)return aerr("Enter your name.");if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return aerr("Enter a valid email address.");if(ph&&!/^[+\d][\d\s-]{6,}$/.test(ph))return aerr("Enter a valid phone number or leave it blank.");
 if(pw.length<8)return aerr("Password needs at least 8 characters.");if(pw!==$("#sw2").value)return aerr("Passwords don’t match.");if(S.users.some(u=>u.email===em))return aerr("An account with this email already exists. Sign in instead.");
 const u=mkU("u_"+Date.now().toString(36),n,em,"customer",null,ph,{signup:1});u.h=hashPw(pw,u.sl);S.users.push(u);S.sess=u.id;S.sessT=Date.now();u.last=Date.now();save();afterAuth();toast("Welcome, "+n.split(" ")[0]);go("#menu")}

const mine=u=>Object.values(S.orders).filter(o=>o.uid===u.id||(u.ph&&String(o.ph||"").replace(/\D/g,"")===u.ph.replace(/\D/g,""))).sort((a,b)=>oT(b)-oT(a));

function saveProfile(){const u=me();if(!u)return;const n=$("#pn").value.trim();if(!n)return toast("Name can’t be empty");u.name=n;u.ph=$("#pp").value.trim();save();afterAuth();route();toast("Profile saved")}

function changePw(){const u=me();if(!u)return;const c=$("#pc").value,n=$("#pw1").value;if(u.h!==hashPw(c,u.sl))return toast("Current password is wrong");if(n.length<8)return toast("New password needs at least 8 characters");u.sl=Math.random().toString(36).slice(2,8);u.h=hashPw(n,u.sl);save();route();toast("Password changed")}

function meBox(){const u=me();return u?`<div class="ad-me"><strong>${esc(u.name)}</strong><span>${ROLES[u.role].l}${u.br?" · "+esc(sBr(u.br)):" · all branches"}</span><button class="btn s" onclick="logout()">Sign out</button></div>`:""}

const deniedPage=()=>`<h2>No access</h2><p>Your account (${ROLES[me().role].l}) can’t open this page.</p><a class="btn" href="#account">My account</a>`;
