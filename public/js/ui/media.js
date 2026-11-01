/* Image helper with loading shimmer and fallback */
function phEl(i){const d=document.createElement("div");d.className="ph";d.style.cssText=i.style.cssText;d.textContent=i.alt+" photo";return d}

function pic(o,st){st=st||"";return o.img?`<img class="ph ld" src="${o.img}" alt="${o.n}" loading="lazy" referrerpolicy="no-referrer" style="${st}" onload="this.classList.remove('ld')" onerror="this.replaceWith(phEl(this))">`:`<div class="ph" style="${st}">${o.n} photo</div>`}
