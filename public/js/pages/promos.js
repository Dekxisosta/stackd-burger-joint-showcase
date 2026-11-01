/* Page: promotions */
Object.assign(R,{
promos(){const L=[["tue","STACK’D Tuesday",tueTxt()+(isTue()?"<strong>Live today.</strong>":"")],["dt","Double Trouble","Buy "+dtTxt().replace("Two Classic Stacks for","two Classic Stacks for")],["stu","Student Stack",stuTxt()]].filter(x=>PR(x[0]).on);return `<h2>Promotions</h2>${L.length?L.map(x=>`<div class="promo"><h3>${x[1]}</h3>${x[2]}</div>`).join("")+`<p>Promos stack in this order: Double Trouble, then Tuesday on the rest, then Student Stack. Rules are assumed until confirmed.</p>`:"<p>No promotions are running right now.</p>"}<a class="btn" href="#menu">Order Now</a>`}
});
