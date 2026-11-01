/* Admin UI state: active tab, filters, branch scope */
let AF="all",AQ="",AT="overview",AC="all",AB="all",AR=0;

function setAF(k){AF=k;route()}

function setAB(k){if(SC())k=SC();AB=k;route()}

function setAC(k){AC=k;route()}

function setAT(k){AT=k;AR=1;route();const t=document.querySelector(".ad-tab[aria-current]");if(t)t.focus()}

function setAQ(v){AQ=v;route()}
