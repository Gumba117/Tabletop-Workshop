
// js/checkout.js
/*
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    alert('Debes iniciar sesión para realizar un pedido.');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const productIds = Object.keys(cart);

  if (productIds.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  const total = products.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  // Crear pedido
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: user.id, total }])
    .select()
    .single();

  if (orderError) {
    console.error('Error creando el pedido:', orderError);
    return;
  }

  // Crear items del pedido
  const items = products.map(p => ({
    order_id: order.id,
    product_id: p.id,
    quantity: cart[p.id],
  }));

  await supabase.from('order_items').insert(items);
  localStorage.removeItem('cart');

  alert('¡Compra realizada con éxito!');
  window.location.href = 'orders.html';
});



document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  alert('Pago simulado exitoso ✅');
  // Guarda el pedido en Supabase
});
*/

// ==============================
// Simulación de pago y registro de pedido
// ==============================

document.addEventListener('DOMContentLoaded', async () => {
  const summaryContainer = document.getElementById('checkout-summary');
  const paymentForm = document.getElementById('payment-form');
  const cart = getCart();

  const user = await checkSession(true); // Requiere sesión

  if (cart.length === 0) {
    summaryContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    paymentForm.style.display = 'none';
    return;
  }

  // Mostrar resumen de compra
  let total = 0;
  summaryContainer.innerHTML = '';

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
    summaryContainer.appendChild(div);
  });

  const totalEl = document.createElement('p');
  totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  summaryContainer.appendChild(totalEl);

  // Manejar el envío del formulario de pago
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Simulación de procesamiento de pago
    paymentForm.querySelector('button').disabled = true;
    paymentForm.querySelector('button').textContent = 'Procesando...';

    // 1. Insertar pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ user_id: user.id, total }])
      .select()
      .single();

    if (orderError) {
      alert('Error al crear pedido: ' + orderError.message);
      return;
    }

    // 2. Insertar detalles del pedido
    const orderDetails = cart.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: detailsError } = await supabase
      .from('order_items')
      .insert(orderDetails);

    if (detailsError) {
      alert('Error al registrar detalles del pedido: ' + detailsError.message);
      return;
    }

    // 3. Limpiar carrito y redirigir
    localStorage.removeItem('tabletop_cart');
    alert('¡Pago simulado exitosamente! Pedido registrado.');
    window.location.href = 'orders.html';
  });
});

