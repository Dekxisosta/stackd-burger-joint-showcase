/* Promo carousel controls (dots and arrows) */
document.addEventListener("click",e=>{const b=e.target.closest("[data-pc]");if(!b)return;const g=b.closest("#promos").querySelector(".pgrid"),c=g.children[0];if(c)g.scrollBy({left:+b.dataset.pc*(c.offsetWidth+12)})});

document.addEventListener("scroll",e=>{const g=e.target;if(!g||!g.classList||!g.classList.contains("pgrid")||!g.children[0])return;const n=g.children.length;let i=Math.round(g.scrollLeft/(g.children[0].offsetWidth+12));if(g.scrollLeft+g.clientWidth>=g.scrollWidth-4)i=n-1;g.parentNode.querySelectorAll(".pdots i").forEach((d,j)=>d.classList.toggle("on",j===i))},true);
