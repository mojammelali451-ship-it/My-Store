const WHATSAPP='917699680029';
const products=[
 {id:1,name:'Premium T-Shirt',price:599,icon:'👕'},
 {id:2,name:'Classic Sneakers',price:1499,icon:'👟'},
 {id:3,name:'Everyday Backpack',price:899,icon:'🎒'},
 {id:4,name:'Smart Watch',price:1999,icon:'⌚'},
 {id:5,name:'Wireless Earbuds',price:1299,icon:'🎧'},
 {id:6,name:'Premium Sunglasses',price:799,icon:'🕶️'}
];
let cart=JSON.parse(localStorage.getItem('myStoreCart')||'[]');
const grid=document.getElementById('productGrid'),count=document.getElementById('cartCount'),items=document.getElementById('cartItems'),total=document.getElementById('cartTotal');
function money(n){return '₹'+n.toLocaleString('en-IN')}
function save(){localStorage.setItem('myStoreCart',JSON.stringify(cart));renderCart()}
function renderProducts(list=products){grid.innerHTML=list.map(p=>`<article class="product"><div class="product-image">${p.icon}</div><div class="product-body"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add-btn" onclick="add(${p.id})">Add to Cart</button></div></article>`).join('')}
function add(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,delta){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=delta;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function renderCart(){let sum=0,totalQty=0;items.innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id),v=p.price*i.qty;sum+=v;totalQty+=i.qty;return `<div class="cart-row"><div><b>${p.name}</b><div>${money(p.price)} × ${i.qty}</div></div><div class="qty"><button onclick="change(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="change(${p.id},1)">+</button></div></div>`}).join(''):'<p>Your cart is empty.</p>';count.textContent=totalQty;total.textContent=money(sum)}
function openCart(){document.getElementById('cartPanel').classList.add('open');document.getElementById('overlay').classList.add('open')}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('overlay').classList.remove('open')}
document.getElementById('cartButton').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('overlay').onclick=closeCart;
document.getElementById('checkoutButton').onclick=()=>{if(!cart.length)return alert('Your cart is empty.');document.getElementById('checkoutModal').classList.add('open')};
document.getElementById('closeModal').onclick=()=>document.getElementById('checkoutModal').classList.remove('open');
document.getElementById('searchInput').oninput=e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)))};
document.getElementById('checkoutForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);let lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${p.name} × ${i.qty} = ${money(p.price*i.qty)}`}).join('\n');const sum=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);const msg=`*NEW ORDER — MY STORE*\n\n*Customer:* ${f.get('name')}\n*Mobile:* ${f.get('mobile')}\n*Address:* ${f.get('address')}\n*PIN:* ${f.get('pincode')}\n\n*Items:*\n${lines}\n\n*Total:* ${money(sum)}\n*Payment:* Cash on Delivery`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank');};
renderProducts();renderCart();