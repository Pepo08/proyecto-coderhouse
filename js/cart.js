let carrito = []

const productoContenedor = document.querySelector(".todos-productos");

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
  }
});

const validarProductoEnCarrito = (id) => {
  const estaRepetido = carrito.some(producto => producto.id == id);
  
  if (!estaRepetido) {
    const producto = productos.find(producto => producto.id == id);
    carrito.push(producto);
    pintarProductoCarrito(producto);
  } else {
    const producto = carrito.find(producto => producto.id == id);
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    producto.cantidad++;
    cantidad.innerText = `Cantidad: ${producto.cantidad}`;
  }

  saveProductStorage(producto);
};

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor');
  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `;

  contenedor.appendChild(div);

  const botonEliminar = div.querySelector('.boton-eliminar');
  botonEliminar.addEventListener('click', () => {
    eliminarProductoDelCarrito(producto.id);
    div.remove();
  });

  contenedor.appendChild(div);
};

const eliminarProductoDelCarrito = (id) => {
  carrito = carrito.filter(producto => producto.id !== id);
};

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = ''

  carrito.forEach(producto => {
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')

    div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
  });
}

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  pintarTotalesCarrito(totalCantidad, totalCompra)
  guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById('contador-carrito')
  const precioTotal = document.getElementById('precio-total')

  contadorCarrito.innerText = totalCantidad
  precioTotal.innerText = totalCompra
}
console.log(carrito);
