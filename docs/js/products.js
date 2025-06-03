
// ==============================
// Carga de productos desde Supabase
// ==============================

document.addEventListener('DOMContentLoaded', async () => {
  const productsContainer = document.getElementById('product-list');

  // Verificamos sesión del usuario
  const user = await checkSession(true); // Redirige si no está logueado

  const contenedor = document.getElementById('productos-container');
  // Cargar productos
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    productsContainer.innerHTML = `<p>Error al cargar productos: ${error.message}</p>`;
    return;
  }

  // Limpiar contenedor antes de renderizar
  productsContainer.innerHTML = '';
  
  // Si no hay productos, mostrar mensaje
  if (products.length === 0) {
    productsContainer.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }


  // Renderizar productos
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}" class="product-img" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
        Añadir al carrito
      </button>
    `;

    productsContainer.appendChild(card);
  });

  // Manejo de clicks en botones "Añadir al carrito"
  productsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);
      addToCart({ id, name, price });
      alert(`"${name}" se ha añadido al carrito.`);
    }
  });
});
