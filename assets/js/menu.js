let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const botonVaciar = document.getElementById('vaciar-carrito');
const contador = document.getElementById('contador');

function actualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  contador.textContent = carrito.length;
}

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const id = boton.getAttribute('data-id');
    const nombre = boton.getAttribute('data-nombre');
    const precio = boton.getAttribute('data-precio');

    carrito.push({ id, nombre, precio });
    actualizarCarrito();
  });
});

botonVaciar.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});
  
actualizarCarrito();