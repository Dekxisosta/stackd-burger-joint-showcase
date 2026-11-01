/* Page: about */
Object.assign(R,{
about(){return `<section class="split"><div><h2 style="margin-top:0">Our story</h2><p>STACK’D is a casual burger joint in Laguna built on one idea: a burger should be tall, messy and worth the napkins.</p><p>We keep the menu short and the stacks big, from the double-patty Classic to the Triple Threat. Everything is made for students, young professionals and families who want a good meal without the fuss.</p><a class="btn" href="#menu">Order Now</a></div>${pic(STORY,"aspect-ratio:4/3")}</section>
<section class="band"><h2>What we’re about</h2><div class="feat">${[["layers-triple","Big stacks","Generous patties and layers in every burger."],["account-group","Open to everyone","Student deals, family-sized orders and quick bites."],["gesture-tap","Easy to order","Pick, pay and follow your order in a few taps."]].map(x=>`<div>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div></section>
<h2>Four branches, one stack</h2><p style="max-width:60ch">Find us in ${BR.map(b=>b.n.replace(" – Main Branch","").replace(" Branch","")).join(", ")}. ${hrsAll()?"Every branch is open daily, "+hrsAll().replace("–"," to ")+".":"See the Locations page for each branch’s hours."}</p><p><a class="btn p" href="#locations">See locations</a></p>
<section class="cta">${BGW(14,10)}<h2>Hungry yet?</h2><a class="btn p" href="#menu">Order Now</a></section>`}
});
