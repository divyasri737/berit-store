(() => {
  const PRICE = 8000; // Illustrative only — confirm BERIT's final retail price before launch.
  const SHIPPING = 250; // Illustrative only — replace with actual shipping rules.
  let selectedSize = '';
  let cart = [];
  let orders = [];
  const $ = (id) => document.getElementById(id);
  const rupees = (n) => '₹' + Number(n).toLocaleString('en-IN');
  $('year').textContent = new Date().getFullYear();
  const show = (id) => { $(id).classList.add('open'); $(id).setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const hide = (id) => { $(id).classList.remove('open'); $(id).setAttribute('aria-hidden','true'); if(!document.querySelector('.overlay.open')) document.body.style.overflow=''; };
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>hide(b.dataset.close)));
  document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)hide(o.id)}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.overlay.open').forEach(o=>hide(o.id))});
  $('openProduct').addEventListener('click',()=>show('productOverlay'));
  $('quickAdd').addEventListener('click',()=>show('productOverlay'));
  $('openCart').addEventListener('click',()=>{renderCart();show('cartOverlay')});
  $('menuToggle').addEventListener('click',()=>$('main') && document.querySelector('.desktop-nav').classList.toggle('open'));
  document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.desktop-nav').classList.remove('open')));
  $('searchToggle').addEventListener('click',()=>toast('Search will be enabled when more products are added.'));
  $('sizeOptions').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selectedSize=b.dataset.size;$('sizeOptions').querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b))}));
  $('qtyMinus').addEventListener('click',()=> $('quantity').value=Math.max(1,(parseInt($('quantity').value,10)||1)-1));
  $('qtyPlus').addEventListener('click',()=> $('quantity').value=Math.min(5,(parseInt($('quantity').value,10)||1)+1));
  $('addToCart').addEventListener('click',()=>{
    if(!selectedSize){toast('Please choose a size first.');return;}
    const qty=Math.max(1,Math.min(5,parseInt($('quantity').value,10)||1));
    const existing=cart.find(x=>x.size===selectedSize);
    if(existing)existing.qty=Math.min(5,existing.qty+qty);else cart.push({product:'Classic White Maxi Dress',size:selectedSize,qty,price:PRICE});
    updateBag();hide('productOverlay');toast('Added to your bag.');
  });
  function updateBag(){ $('bagCount').textContent=cart.reduce((n,x)=>n+x.qty,0); }
  function renderCart(){
    const host=$('cartItems');
    if(!cart.length){host.innerHTML='<p class="muted">Your bag is currently empty.</p>';}
    else host.innerHTML=cart.map((x,i)=>`<div class="cart-item"><div class="cart-thumb"></div><div><h3>${x.product}</h3><p>Size: ${x.size} · Qty: ${x.qty}</p><strong>${rupees(x.price*x.qty)}</strong><br><button class="remove-item" data-remove="${i}">Remove</button></div></div>`).join('');
    host.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{cart.splice(Number(b.dataset.remove),1);updateBag();renderCart()}));
    const subtotal=cart.reduce((n,x)=>n+x.price*x.qty,0);$('subtotal').textContent=rupees(subtotal);$('shippingCost').textContent=subtotal?rupees(SHIPPING):'Calculated at checkout';$('cartTotal').textContent=rupees(subtotal+(subtotal?SHIPPING:0));
  }
  $('goCheckout').addEventListener('click',()=>{if(!cart.length){toast('Your bag is empty. Choose a size to continue.');return;}hide('cartOverlay');$('checkoutSummaryText').textContent=cart.reduce((n,x)=>n+x.qty,0)+' item(s)';$('checkoutTotal').textContent=rupees(cart.reduce((n,x)=>n+x.price*x.qty,0)+SHIPPING);show('checkoutOverlay')});
  $('checkoutForm').addEventListener('submit',e=>{
    e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());const id='BR-DEMO-'+String(orders.length+1).padStart(4,'0');
    const order={id,name:data.name,email:data.email,phone:data.phone,city:data.city,items:cart.map(x=>({...x})),total:cart.reduce((n,x)=>n+x.price*x.qty,0)+SHIPPING,status:'Demo order — unpaid',created:new Date().toLocaleString('en-IN')};orders.unshift(order);
    $('orderReference').textContent=id;renderAdmin();cart=[];updateBag();hide('checkoutOverlay');e.currentTarget.reset();show('confirmationOverlay');
  });
  $('adminLink').addEventListener('click',()=>{renderAdmin();show('adminOverlay')});
  function renderAdmin(){ $('adminOrders').textContent=orders.length; const host=$('adminOrderList'); if(!orders.length){host.innerHTML='<p class="muted">No demo orders yet.</p>';return;}host.innerHTML=orders.map(o=>`<div class="admin-order"><div><strong>${o.id}</strong><small>${escapeHtml(o.name)} · ${o.created}</small><small>${o.items.map(i=>`${i.size} × ${i.qty}`).join(', ')} · ${escapeHtml(o.city)}</small></div><div><strong>${rupees(o.total)}</strong><small>${o.status}</small></div></div>`).join(''); }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  let toastTimer;function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
})();
