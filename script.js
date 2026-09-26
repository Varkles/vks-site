const products=[
 {name:"Camiseta VKS Logo (Preta)",price:129.90},
 {name:"Camiseta VKS Logo (Branca)",price:129.90},
 {name:"Camiseta VKS Back (Preta)",price:149.90},
 {name:"Camiseta VKS Stone (Cinza)",price:139.90},
 {name:"Boné VKS",price:99.90},
 {name:"Touca VKS",price:79.90}
];
let cart=[];
const money=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const productsEl=document.getElementById("products");
function renderProducts(list=products){
 productsEl.innerHTML=list.map((p,i)=>`<article class="product"><div class="product-img"></div><div class="product-info"><h3>${p.name}</h3><p>${money(p.price)}</p></div><button class="add" onclick="addToCart(${i})">+</button></article>`).join("");
}
function addToCart(i){cart.push(products[i]);updateCart();openCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><span>${money(p.price)}</span></div>`).join(""):"<p>Seu carrinho está vazio.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("backdrop").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("backdrop").classList.remove("show")}
document.querySelector(".cart-btn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("backdrop").onclick=closeCart;
document.getElementById("sort").onchange=e=>{
 let list=[...products]; if(e.target.value.includes("Menor"))list.sort((a,b)=>a.price-b.price); if(e.target.value.includes("Maior"))list.sort((a,b)=>b.price-a.price); renderProducts(list);
};
renderProducts();