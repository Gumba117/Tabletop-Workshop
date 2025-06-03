

// ==============================
// Historial de pedidos del usuario
// ==============================

document.addEventListener('DOMContentLoaded', async () => {
  const ordersContainer = document.getElementById('orders-container');

  const user = await checkSession(true); // Redirige si no está logueado

  // Obtener pedidos del usuario
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, total, created_at, order_items (product_id, quantity, price), order_items (products (name))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    ordersContainer.innerHTML = `<p>Error al obtener pedidos: ${error.message}</p>`;
    return;
  }

  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p>No tienes pedidos aún.</p>';
    return;
  }

  // Mostrar pedidos
  orders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order-card';

    const date = new Date(order.created_at).toLocaleString();

    let itemsHTML = '';
    order.order_items.forEach(item => {
      const name = item.products?.name || 'Producto';
      itemsHTML += `<li>${name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
    });

    orderDiv.innerHTML = `
      <h3>Pedido #${order.id}</h3>
      <p><strong>Fecha:</strong> ${date}</p>
      <ul>${itemsHTML}</ul>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;

    ordersContainer.appendChild(orderDiv);
  });
});
