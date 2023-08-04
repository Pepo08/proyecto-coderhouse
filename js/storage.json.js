const saveProductStorage = (carrito) => {
    sessionStorage.setItem('producto', JSON.stringify(carrito));
};

const getProductStorage = () => {
    const carritoStorage = JSON.parse(sessionStorage.getItem('producto'));
    return carritoStorage || [];
};

const getProduct = () => {
    carrito = getProductStorage();
    const contenedor = document.getElementById('carrito-contenedor');
    contenedor.innerHTML = '';
    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `;
        contenedor.appendChild(div);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getProduct();
});
