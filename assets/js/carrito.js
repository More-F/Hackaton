let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const botonesAgregar = document.querySelectorAll('.agregar-carrito')
const botonVaciar = document.getElementById('vaciar-carrito')
const contador = document.getElementById('contador')
const listaCarrito = document.getElementById('lista-carrito')
const iconoCarrito = document.getElementById('icono-carrito')

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

    let botonEliminar = document.createElement('button')
    botonEliminar.textContent = ' X'
    botonEliminar.addEventListener('click', function () {
      if (producto.cantidad > 1) {
        producto.cantidad = producto.cantidad - 1
      } else {
        carrito.splice(i, 1)
      }
      actualizarCarrito()
    })

    item.appendChild(botonEliminar)
    listaCarrito.appendChild(item)
  }
}

for (let i = 0; i < botonesAgregar.length; i++) {
  botonesAgregar[i].addEventListener('click', function () {
    let boton = this
    let rectBoton = boton.getBoundingClientRect()
    let rectCarrito = iconoCarrito.getBoundingClientRect()

    let imagenAnimada = document.createElement('div')
    imagenAnimada.classList.add('fly-img')
    imagenAnimada.style.left = rectBoton.left + 'px'
    imagenAnimada.style.top = rectBoton.top + 'px'
    document.body.appendChild(imagenAnimada)

    let deltaX = rectCarrito.left - rectBoton.left
    let deltaY = rectCarrito.top - rectBoton.top

    requestAnimationFrame(() => {
      imagenAnimada.style.transform = 'translate3d(' + deltaX + 'px,' + deltaY + 'px, 0) scale(0.2)'
    })

    setTimeout(function () {
      imagenAnimada.remove()
    }, 600)

    let id = boton.getAttribute('data-id')
    let nombre = boton.getAttribute('data-nombre')
    let precio = parseFloat(boton.getAttribute('data-precio'))

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