/* Static data: menu items, branches, images, story */
const MENU=[
{id:"classic",l:"best",n:"Classic Stack",d:"Double beef patty, cheddar, house sauce",p:189,c:"Burgers",tue:1,tags:["Contains dairy"]},
{id:"triple",l:"best",n:"Triple Threat",d:"Triple patty, three cheese layers",p:259,c:"Burgers",tue:0,tags:["Contains dairy"]},
{id:"smoke",n:"Smokehouse BBQ",d:"Beef patty, smoked BBQ sauce, bacon",p:229,c:"Burgers",tue:1,tags:["Contains pork"]},
{id:"cluck",n:"Crispy Cluck",d:"Crispy chicken, slaw, spicy mayo",p:169,c:"Burgers",tue:1,tags:["Spicy"]},
{id:"fries",l:"best",n:"Loaded Fries",d:"Fries, cheese sauce, bacon bits",p:129,c:"Sides",tue:0,tags:["Contains pork","Contains dairy"]},
{id:"combo",l:"saver",n:"Stack’d Combo",d:"Classic Stack, fries, drink",p:249,c:"Combos",tue:0,tags:["Contains dairy"]},
{id:"tea",n:"Iced Tea",d:"Cold, lightly sweet",p:59,c:"Drinks",tue:0,tags:[]},
{id:"cola",n:"Cola",d:"Ice-cold, 16 oz",p:49,c:"Drinks",tue:0,tags:[]},
{id:"seaside",n:"Seaside Burger",d:"Crispy fish fillet, tartar sauce, lettuce",p:199,c:"Burgers",tue:0,tags:["Contains fish","Contains dairy"]},
{id:"dstack",n:"Double Stack’d Burger",d:"Two beef patties, double cheese, pickles",p:239,c:"Burgers",tue:0,tags:["Contains dairy"]},
{id:"chic",n:"Chic Fillet",d:"Crispy chicken fillet, mayo, pickles",p:179,c:"Burgers",tue:0,tags:[]},
{id:"super",l:"best",n:"Super Stack’d",d:"Our tallest stack: triple patty, bacon, cheese",p:289,c:"Burgers",tue:0,tags:["Contains pork","Contains dairy"]},
{id:"wings",l:"best",n:"Korean Wings",d:"Crispy wings glazed in sweet-spicy gochujang",p:199,c:"Sides",tue:0,tags:["Spicy"]},
{id:"sundae",n:"Tiramisu Sundae",d:"Coffee-soaked cake, mascarpone cream, cocoa",p:99,c:"Desserts",tue:0,tags:["Contains dairy","Contains caffeine"]},
{id:"matcha",n:"Matcha Milkshake",d:"Creamy iced matcha shake",p:119,c:"Drinks",tue:0,tags:["Contains dairy","Contains caffeine"]},
{id:"rice",n:"Rice",d:"Steamed jasmine rice",p:35,c:"Add-ons",tue:0,tags:[]},
{id:"rings",n:"Onion Rings",d:"Beer-battered, crispy golden rings",p:99,c:"Sides",tue:0,tags:["Contains gluten"]},
{id:"mozz",n:"Mozzarella Sticks",d:"Crispy outside, melty cheese inside",p:119,c:"Sides",tue:0,tags:["Contains dairy","Contains gluten"]},
{id:"b67",n:"67 Burger",d:"Six patties, seven cheese slices. Good luck.",p:267,c:"Burgers",tue:0,tags:["Contains dairy"]},
{id:"bstack",l:"saver",n:"Stack’d Bundle",d:"2 Classic Stacks, Loaded Fries, 2 drinks",p:499,c:"Bundles",tue:0,tags:["Contains pork","Contains dairy"]},
{id:"family",l:"saver",n:"Family Friendly",d:"4 burgers, 2 Loaded Fries, onion rings, 4 drinks",p:899,c:"Bundles",tue:0,tags:["Contains pork","Contains dairy"]},
{id:"chomp",l:"saver",n:"Chompin’ Bundle",d:"6 smash burgers with fries and onion rings to share",p:749,c:"Bundles",tue:0,tags:["Contains dairy"]},
{id:"supreme",l:"saver",n:"Supreme Bundle",d:"Super Stack’d, Triple Threat, Korean Wings, mozzarella sticks, 2 shakes",p:999,c:"Bundles",tue:0,tags:["Contains pork","Contains dairy","Spicy"]},
{id:"bacon",n:"Extra Bacon",d:"Two crispy strips",p:25,c:"Add-ons",tue:0,tags:["Contains pork"]},
{id:"cheese",n:"Extra Cheese",d:"One more slice",p:20,c:"Add-ons",tue:0,tags:["Contains dairy"]}];

const U="https://images.unsplash.com/photo-";

const BR=[["Santa Rosa – Main Branch","Santa Rosa","1555396273-367ea4eb4db5"],["Biñan Branch","Biñan","1517248135467-4c7edcad34c4"],["Cabuyao Branch","Cabuyao","1552566626-52f8b828add9"],["Calamba Branch","Calamba","1514933651103-005eec06c04b"]].map((b,i)=>({id:"b"+(i+1),n:b[0],a:"Placeholder address, "+b[1]+", Laguna",img:U+b[2]+"?auto=format&fit=crop&w=1200&q=80"}));

const IMG={classic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoIkN5aG7we2paKIA7d2UqdIrdQw5bGsScSjT_Glm3qzWGTJfCBa8XL0&s=10",triple:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsyp_4Vv2w_Bv4StK5evhsbv3OrL1zCO_y17jUESU4HDI9pXAlnquN78E&s=10",smoke:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNKRKGD88bDT0VuW5owoqA3ml85PWGotsIqseQeRAqcskpKf9P55iIcBw&s=10",cluck:"https://images.immediate.co.uk/production/volatile/sites/30/2025/04/Crispiest-buttermilk-fried-chicken-burgers-90854e5.jpg?resize=768,713",combo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPqzlVe1iy_BXxFCfT38Nw7jETuLhROUWRHQTvSmNnAI86x9wc4QmW_C3&s=10",fries:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-aE3QY-25Tt5Yb92by6prPs1q5UNSNGixru81jD8SMp0F3zoYKcZYsdf1&s=10",tea:"https://digitalcontent.api.tesco.com/v2/media/realfood/fcff0cfe-2609-455c-8362-69cac2825ec3/RFO+1400x919+IcedTea.jpeg",cola:"https://media.istockphoto.com/id/2198906555/photo/cola-soft-drink-with-ice-cubes-close-up-of-soda-fizzy-drink-in-cold-glass-on-gray-background.jpg?s=612x612&w=0&k=20&c=ecolisYeWbz8Mxjw9GV30MzUSyVqaUcVa4WVNRJQ5cw=",bacon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJVVuHIbp0IBQNcBr3TFEAmT0MmR5Q5LRyKLXOV03C9vshTVj467aSPI&s=10",cheese:"https://rppizzeria.com/web/image/product.template/397/image_1024?unique=832b6b3",seaside:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeSvrboW6WAOq7gCjplZNSfuUx66t9VEEERq5bJOkxcKyxVYW9a22WmaE&s=10",dstack:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnQdAYzUx46GMXFr7A9axImuYbzTtSVDYkPtVUf7dqgggJdUgJuuctENG&s=10",chic:"https://carlsbadcravings.com/wp-content/uploads/2018/03/Oven-Fried-Chicken-2.jpg",rice:"https://healthynibblesandbits.com/wp-content/uploads/2018/10/Jasmine-Rice-FF.jpg",sundae:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRliqeT8U_ySBbOssIfLCkWreYurt_mW0gsvHKlBm1UtpXN31dueksk-8&s=10",matcha:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqGXiya0MilEr4z5AgzhMw_ntQ6HSC1Z6K7uMvHGgei9EY3kzKKm-Pjmo&s=10",super:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk9c3YnsUotxicWogtqDWb29thdNmgnQGwBjf86BpymjUGy4WIURoztrI&s=10",wings:"https://omnivorescookbook.com/wp-content/uploads/2026/07/170318_Korean-Fried-Chicken-Wings_550.jpg",rings:"https://sweetsimplevegan.com/wp-content/uploads/2022/03/close_up_Vegan_beer_battered_crispy_onion_rings_sweet_simple_vegan_2.jpg",mozz:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJ1tJHHRzoe2gRvu8viG1U6YU1QNPYMGtKWsGAw-8hIkntvuPQ9i67mk&s=10",b67:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98gxcbLoFQvcHawG2C5lqPrMgv1h_W45MJlgJuEH62Pq5gSZLSxD3RCQ&s=10",bstack:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLY9rpsGn0frXv9E8LSp9s4xVwt3_0MeGfLxvXwFqjXLj35QPHc9jvAhzQ&s=10",family:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHtVkiB7hGh8JtqqNx_p4YlvLQ9vPuia7ddZpMPPRmTkS0v5xgXRMvIA&s=10",chomp:"https://whamburg.com/wp-content/uploads/2025/08/Whamburg-Smash-Burger-Party-Pack.jpg",supreme:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqrLWLMLHtae3RTfgKcKHK2Vy3H0ffIL5zA3WuNX-ZQ&s=10"};

MENU.forEach(m=>m.img=IMG[m.id]);

const CATS=["Burgers","Combos","Bundles","Sides","Drinks","Desserts","Add-ons"];

const BASE=MENU.map(m=>({...m}));

const BASEBR=BR.map(b=>({...b}));

const STORY={n:"Our story",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWsqzdKy2w05na3M9L7huJrALpFwR8ibjV_936dxXI22I7L64RoMOlBxQ&s=10"};
