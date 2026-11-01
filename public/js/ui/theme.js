/* Light/dark theme toggle */
const isDark=()=>{const t=document.documentElement.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme:dark)").matches};

const themeBtn=()=>`<button type="button" class="th" id="thb" onclick="toggleTheme()" aria-label="${isDark()?"Switch to light theme":"Switch to dark theme"}" title="${isDark()?"Light theme":"Dark theme"}">${ic(isDark()?"weather-sunny":"weather-night")}</button>`;

function toggleTheme(){const t=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem("stackd-theme",t)}catch(e){}const b=$("#thb");if(b)b.outerHTML=themeBtn();const f=$("#thb");if(f)f.focus()}
