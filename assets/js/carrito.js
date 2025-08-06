let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const botonesAgregar = document.querySelectorAll('.agregar-carrito')
const botonVaciar = document.getElementById('vaciar-carrito')
const contador = document.getElementById('contador')
const listaCarrito = document.getElementById('lista-carrito')

function actualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito))

  let total = 0
  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad
  }

  contador.textContent = total
  listaCarrito.innerHTML = ''

  for (let i = 0; i < carrito.length; i++) {
    let producto = carrito[i]
    let totalProducto = producto.precio * producto.cantidad

    let item = document.createElement('li')
    item.textContent = producto.cantidad + ' x ' + producto.nombre + ' - $' + totalProducto.toLocaleString()
    listaCarrito.appendChild(item)
  }
}

for (let i = 0; i < botonesAgregar.length; i++) {
  botonesAgregar[i].addEventListener('click', function () {
    let id = this.getAttribute('data-id')
    let nombre = this.getAttribute('data-nombre')
    let precio = parseFloat(this.getAttribute('data-precio'))

    let existe = false

    for (let j = 0; j < carrito.length; j++) {
      if (carrito[j].id == id) {
        carrito[j].cantidad = carrito[j].cantidad + 1
        existe = true
      }
    }

    if (!existe) {
      carrito.push({
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: 1
      })
    }

    actualizarCarrito()
  })
}

botonVaciar.addEventListener('click', function () {
  carrito = []
  actualizarCarrito()
})

actualizarCarrito()