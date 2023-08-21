let carrito = []

const productoContenedor = document.querySelector(".todos-productos");

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
    Toastify({
      text: "El producto se agrego correctamente al carrito",
      className: "notificacion",
      gravity: "bottom",
      position: "left",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }
});

const validarProductoEnCarrito = (id) => {
  const estaRepetido = carrito.some(producto => producto.id == id);
  const producto = productos.find(producto => producto.id == id);
  if (!estaRepetido) {
    carrito.push(producto);
    pintarProductoCarrito(producto);
  } else {
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    producto.cantidad++;
    cantidad.innerText = `Cantidad: ${producto.cantidad}`;
  }

  guardarCarritoStorage(carrito);
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro que queres eliminar este producto del carrito?",
      text: "Si estas seguro toca aceptar y si no es asi toca cancelar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "El producto Ha sido eliminado con exito",
          eliminarProductoDelCarrito(producto.id),
          div.remove(),
          localStorage.removeItem("carrito", JSON.stringify(carrito.id))
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'El producto no se a retirado del carrito',
        )
      }
    })
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
      <button class="vaciarcarrito" value="confirm">Vaciar Carrito</button>
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
      <button class="vaciarcarrito" value="confirm">Vaciar Carrito</button>
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

const guardarCarritoStorage = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

const cargarCarrito = () => {
  if (localStorage.getItem('carrito') != 0) {
      const carritoSorage = localStorage.getItem("carrito")
      pintarProductoCarrito(carritoSorage)
      actualizarTotalesCarrito(carritoSorage)
  }else{}
}