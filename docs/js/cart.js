// js/cart.js
/*
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  alert('Producto agregado al carrito 🧺');
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}

async function displayCart() {
  const cart = getCart();
  const productIds = Object.keys(cart);

  if (productIds.length === 0) {
    document.getElementById('cart-list').innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  let total = 0;
  const list = document.getElementById('cart-list');
  list.innerHTML = '';

  products.forEach(product => {
    const quantity = cart[product.id];
    const subtotal = product.price * quantity;
    total += subtotal;

    const item = document.createElement('div');
    item.innerHTML = `
      <strong>${product.name}</strong> - $${product.price} x ${quantity}
      <button onclick="removeFromCart('${product.id}');location.reload()">Quitar</button>
    `;
    list.appendChild(item);
  });

  document.getElementById('cart-total').textContent = 'Total: $' + total.toFixed(2);
}
*/

// ==============================
// Gestión del carrito con localStorage
// ==============================

const CART_KEY = 'tabletop_cart';

// ------------------------------
// Obtener el carrito desde localStorage
// ------------------------------
function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// ------------------------------
// Guardar el carrito en localStorage
// ------------------------------
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ------------------------------
// Añadir producto al carrito
// ------------------------------
function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

// ------------------------------
// Eliminar producto del carrito
// ------------------------------
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

// ------------------------------
// Renderizar el carrito (en cart.html)
// ------------------------------
async function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const totalContainer = document.getElementById('cart-total');

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalContainer.textContent = '';
    return;
  }

  let total = 0;
  cartContainer.innerHTML = '';

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <strong>${item.name}</strong> (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      <button data-id="${item.id}">Eliminar</button>
    `;

    cartContainer.appendChild(div);
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;

  // Escuchar botones de eliminación
  cartContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id;
      removeFromCart(id);
      renderCart(); // Volver a renderizar después de eliminar
    }
  });
}
