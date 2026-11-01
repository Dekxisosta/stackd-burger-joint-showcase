/* Page: cart */
Object.assign(R,{
order(){const ids=Object.keys(S.cart);if(!ids.length)return `<h2>Your cart</h2><p>Your cart is empty. Pick a burger to start your stack.</p><a class="btn" href="#menu">Browse menu</a>`;
 const p=price(0);return `<h2>Your cart</h2>${ids.map(id=>{const m=item(id);return `<div class="row"><strong>${m.n}</strong><span class="q"><button aria-label="Remove one" onclick="qty('${id}',-1)">−</button> ${S.cart[id]} <button aria-label="Add one" onclick="qty('${id}',1)">+</button></span><span>${PHP(m.p*S.cart[id])}</span></div>`}).join("")}
 <div class="row"><span>Subtotal</span><span>${PHP(p.sub)}</span></div>${p.lines.map(l=>`<div class="row"><span>${l[0]}</span><span>${PHP(l[1])}</span></div>`).join("")}
 <div class="row"><strong>Total</strong><span class="price">${PHP(p.total)}</span></div><p><a class="btn" href="#checkout">Checkout</a></p>`}
});
