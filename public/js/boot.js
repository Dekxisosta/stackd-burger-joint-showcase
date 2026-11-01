/* Startup: seed demo data/users, first render, splash */
if(!S.seeded&&!Object.keys(S.orders).length)try{seedDemo()}catch(e){console.error(e)}

if(!S.users||!S.users.length)seedUsers();

chrome();

upd();

route();

intro();
