/* Hash router: page registry (R), navigation and route() */
const R={};

let CUR=location.hash||"#home",VU;

function hh(){return CUR}

function go(h){CUR=h;const nv=$("#nv");if(nv&&nv.classList.contains("open")){nv.classList.remove("open");$("#mb").setAttribute("aria-expanded","false");$("#mb").innerHTML=ic("menu")}try{history.replaceState(null,"",h)}catch(e){}route()}

function route(){let h=hh().slice(1);if(h==="contact"){h="home";setTimeout(toContact,60)}if(h==="promos")h="menu";if(h.startsWith("item-")){S.cur=h.slice(5);h="item"}const k=R[h]?h:null,am=$(".adm-main"),as=am&&k==="admin"&&!AR?am.scrollTop:0;AR=0;
 app.innerHTML=k?R[k]():`<h2>404</h2><p>That page doesn’t exist.</p><a class="btn" href="#home">Go home</a>`;
 if(k==="menu")initKiosk();
 let v=$("#hv");if(v&&v.dataset.d&&!matchMedia("(min-width:768px)").matches){v.remove();v=null}if(v){v.src=VID;v.onloadeddata=()=>v.classList.add("on");v.muted=true;if(matchMedia("(prefers-reduced-motion:reduce)").matches)v.pause();else v.play().catch(()=>{})}
 if(k==="checkout"){initCheckout();const u=me();if(u){if(!$("#nm").value)$("#nm").value=u.name;if(!$("#ph").value)$("#ph").value=u.ph||"";if($("#em")&&!$("#em").value)$("#em").value=u.email}}
 if(k==="confirmation")app.innerHTML=R.confirmation(S.last);
 if(as){const a=$(".adm-main");if(a)a.scrollTop=as}scrollTo(0,0);{const af=app.querySelector("[data-af]");if(af&&matchMedia("(hover:hover)").matches)af.focus({preventScroll:true})}if(hh()==="#promos"){const e=$("#promos");if(e)e.scrollIntoView()}mark()}

addEventListener("hashchange",()=>{CUR=location.hash||"#home";route()});

document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(a&&a.getAttribute("href").length>1){e.preventDefault();if(a.getAttribute("href")==="#contact"){closeNav();toContact();return}go(a.getAttribute("href"))}});
