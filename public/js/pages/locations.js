/* Page: locations */
Object.assign(R,{
locations(){const on=openNow();return `<h2>Locations</h2><p>Open daily. <span class="open ${on?"y":"n"}">${on?"Open now":"Closed now"}</span> (Manila time)</p><div class="grid">${BR.map(b=>`<article class="card">${pic(b,"aspect-ratio:16/9")}<div class="b"><h3>${esc(b.n)}</h3><div>${esc(b.a)}</div><div>${esc(b.ph)}</div><div>${hrTxt(b)} · <span class="open ${brOpen(b)?"y":"n"}">${b.paused?"Not taking orders":brOpen(b)?"Open now":"Closed now"}</span></div><a class="btn s" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Santa+Rosa+Laguna">Get directions</a></div></article>`).join("")}</div><section class="cta">${BGW(14,10)}<h2>Pick a branch. Stack up.</h2><a class="btn p" href="#menu">Order Now</a></section>`}
});
