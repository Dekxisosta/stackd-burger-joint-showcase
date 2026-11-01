/* Contact form and scroll-to-contact */
function toContact(){const e=$("#contact");if(!e)return;e.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"start"});setTimeout(()=>{const n=$("#cn");if(n)n.focus({preventScroll:true})},500)}

function fsend(ev){ev.preventDefault();const n=$("#cn").value.trim(),m=$("#ce").value.trim(),t=$("#cm").value.trim();if(!n||!m||!t)return toast("Fill in every field"),false;if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m))return toast("Check your email address"),false;$("#cf").innerHTML='<p role="status"><strong>Message received.</strong> This is a demo, so nothing was sent.</p>';return false}
