/* Splash intro overlay */
function intro(){const i=$("#intro");if(!i)return;try{if(sessionStorage.getItem("si"))return i.remove();sessionStorage.setItem("si","1")}catch(e){}
 const hide=()=>{i.classList.add("out");setTimeout(()=>i.remove(),600)};i.onclick=hide;const g=i.querySelector(".g");let go=false;const start=()=>{if(go)return;go=true;i.classList.remove("wait");setTimeout(hide,matchMedia("(prefers-reduced-motion:reduce)").matches?900:2300)};if(!g||(g.complete))start();else{g.addEventListener("load",start);g.addEventListener("error",start);setTimeout(start,6000)}}
