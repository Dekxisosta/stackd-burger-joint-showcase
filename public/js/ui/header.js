/* Header, footer, mobile nav and nav highlighting */
function mark(){let h=hh().slice(1);if(h==="promos"||h.startsWith("item-"))h="menu";document.querySelectorAll("header nav a").forEach(a=>{if(a.getAttribute("href")==="#"+h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}

function closeNav(){const nv=$("#nv");if(nv&&nv.classList.contains("open")){nv.classList.remove("open");$("#mb").setAttribute("aria-expanded","false");$("#mb").innerHTML=ic("menu")}}

document.addEventListener("click",e=>{if(!e.composedPath().some(n=>n.id==="mb"||n.id==="nv"))closeNav()});

addEventListener("keydown",e=>{if(e.key==="Escape")closeNav()});

function chrome(){
 $("#hd").innerHTML=`<a class="logo" href="#home" aria-label="STACK’D home">${MK}STACK’D</a><nav id="nv" aria-label="Main">${[["home","Home"],["menu","Menu and deals"],["locations","Locations"],["about","Our story"],...navExtra()].map(l=>`<a href="#${l[0]}">${l[1]}</a>`).join("")}</nav><div class="hr"><a class="btn s" href="#menu">Order Now</a>${themeBtn()}<a class="cartl" id="cartbtn" href="#order" aria-label="Cart">${ic("cart-outline")}<b id="cc">0</b></a><button class="mb" id="mb" aria-label="Menu" aria-expanded="false" aria-controls="nv">${ic("menu")}</button></div>`;
 $("#mb").onclick=()=>{const o=$("#nv").classList.toggle("open");$("#mb").setAttribute("aria-expanded",o);$("#mb").innerHTML=ic(o?"close":"menu")};
 $("#ft").innerHTML=`${CK}<div class="fw"><div><div class="fbrand">${MK}STACK’D</div><p>Big stacks. Bigger cravings.</p><a class="btn s" href="#menu">Order Now</a></div>
 <div><h4>Explore</h4><ul>${[["menu","Menu and deals"],["locations","Locations"],["about","Our story"],["contact","Contact"],["legal","Privacy and terms"]].map(l=>`<li><a href="#${l[0]}">${l[1]}</a></li>`).join("")}</ul></div>
 <div><h4>Visit and call</h4><ul><li class="fl">${ic("clock-outline")}${hrsAll()?"Every day, "+hrsAll():"Hours vary by branch"}</li><li class="fl">${ic("phone")}+63 900 000 0000 (placeholder)</li><li class="fl">${ic("email-outline")}hello@stackdburgers.example</li><li class="fl">${ic("map-marker")}4 branches across Laguna</li></ul></div>
 <div><h4>Branches</h4><ul>${BR.map(b=>`<li><a href="#locations">${b.n}</a></li>`).join("")}</ul></div></div>
 <div class="fcon" id="contact"><div><h4>Contact us</h4><p>Questions or feedback? Drop us a line.</p></div><form id="cf" onsubmit="return fsend(event)" novalidate><div class="fcr"><div><label for="cn">Name</label><input id="cn" placeholder="Name" autocomplete="name" required></div><div><label for="ce">Email</label><input id="ce" type="email" placeholder="Email" autocomplete="email" required></div></div><label for="cm">Message</label><textarea id="cm" rows="1" placeholder="Message" required></textarea><p><button class="btn" type="submit">Send message</button></p></form></div>
 <div class="fb"><span>© 2026 STACK’D Burgers</span><span><strong>Showcase only.</strong> No real orders or payments. Branch names, addresses and contact details are placeholders.</span></div>`}
