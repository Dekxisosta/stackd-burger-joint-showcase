/* Persistent app state (localStorage "stackd") and defaults */
let FEE=49;

let S={cart:{},orders:{},last:null,out:{},tue:{}};

try{Object.assign(S,JSON.parse(localStorage.getItem("stackd")||"{}"))}catch(e){}

const save=()=>{try{localStorage.setItem("stackd",JSON.stringify(S))}catch(e){}};

S.ed=S.ed||{};

S.nw=S.nw||[];

S.rm=S.rm||{};

if(S.fee!=null)FEE=S.fee;

S.pr=S.pr||{};

S.bd=S.bd||{};

S.qn=S.qn||{};
