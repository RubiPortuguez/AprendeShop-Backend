// --- Selectores seguros ---
const productosPendientes = document.getElementById("productosPendientes");
const btnPagar           = document.getElementById("btnPagar");
const paso1              = document.getElementById("1");
const paso2              = document.getElementById("2");
const paso3              = document.getElementById("3");
const iconoPA            = document.getElementById("iconoPA"); // <- puede no existir en esta vista

// --- Utilidades de carrito ---
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("productos-cesta")) || [];
  } catch {
    return [];
  }
}
function setCart(arr) {
  localStorage.setItem("productos-cesta", JSON.stringify(arr || []));
}

// --- Render del carrito ---
function mostrarCarrito() {
  if (!productosPendientes) return;

  productosPendientes.innerHTML = "";
  const productosCesta = getCart();

  if (productosCesta.length > 0) {
    productosCesta.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("col", "mt-4", "porductoAgregado");
      const precio = Number(producto.precio) || 0;

      div.innerHTML = `
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre || 'Curso'}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre || 'Curso'}</h5>
            <p class="card-text">$ ${precio.toFixed(2)}</p>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto mb-4">
            <button data-index="${index}" type="button" class="btn btn-outline-success btnEliminar">Eliminar</button>
          </div>
        </div>
      `;
      productosPendientes.appendChild(div);
    });

    // Listeners de eliminar
    document.querySelectorAll(".btnEliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = Number(e.currentTarget.dataset.index);
        eliminarProducto(idx);
      });
    });

  } else {
    productosPendientes.innerHTML = `<p class="text-muted my-4">El carrito está vacío</p>`;
  }

  actualizariconoPA();
  preciosCarrito();
}

// --- Eliminar producto ---
function eliminarProducto(index) {
  const productosCesta = getCart();
  if (index >= 0 && index < productosCesta.length) {
    productosCesta.splice(index, 1);
    setCart(productosCesta);
    mostrarCarrito();

    // Toast opcional
    const alertaToast = document.getElementById("liveToast");
    if (alertaToast && window.bootstrap?.Toast) {
      const toast = bootstrap.Toast.getOrCreateInstance(alertaToast);
      toast.show();
    }
  }
}

// --- Burbuja del carrito en navbar ---
function actualizariconoPA() {
  if (!iconoPA) return; // esta vista puede no tener el badge
  const productosCesta = getCart();
  if (productosCesta.length > 0) {
    iconoPA.classList.remove("visually-hidden");
    iconoPA.textContent = productosCesta.length;
  } else {
    iconoPA.classList.add("visually-hidden");
  }
}

// --- Totales ---
function preciosCarrito() {
  const productosCesta   = getCart();
  const subtotalCarrito  = document.getElementById("subtotalCarrito");
  const descuentosCarrito= document.getElementById("descuentosCarrito");
  const totalCarrito     = document.getElementById("totalCarrito");

  const subtotal = productosCesta.reduce((acc, p) => acc + (Number(p.precio) || 0), 0);
  const descuentos = 0; // si luego aplicas cupones, ajusta esto

  if (subtotalCarrito)   subtotalCarrito.textContent   = `$${subtotal.toFixed(2)}`;
  if (descuentosCarrito) descuentosCarrito.textContent = `$${descuentos.toFixed(2)}`;
  if (totalCarrito)      totalCarrito.textContent      = `$${(subtotal - descuentos).toFixed(2)}`;
}

// --- Paso 2: métodos de pago ---
function metodosPago() {
  if (!productosPendientes) return;
  const productosCesta = getCart();

  if (productosCesta.length === 0) {
    if (window.Swal) {
      Swal.fire({ icon: "warning", title: "Carrito vacío", text: "No hay productos para pagar." });
    } else {
      alert("El carrito está vacío.");
    }
    return;
  }

  if (btnPagar) btnPagar.style.display = "none";
  productosPendientes.innerHTML = "";

  ["Tarjeta", "Transferencia", "PayPal"].forEach((op) => {
    const div = document.createElement("div");
    div.classList.add("col", "mt-4");
    div.innerHTML = `
      <div class="card">
        <div class="card-body text-center">
          <h5 class="card-title">${op}</h5>
        </div>
        <div class="d-grid gap-2 col-8 mx-auto mb-4">
          <button type="button" class="btn btn-outline-success btnTransaccion">
            Realizar pago
          </button>
        </div>
      </div>
    `;
    productosPendientes.appendChild(div);
  });

  document.querySelectorAll(".btnTransaccion").forEach(btn => {
    btn.addEventListener("click", finalizarCompra);
  });

  if (paso2) {
    paso2.classList.remove("btn-inactivo");
    paso2.classList.add("btn-activo");
  }
}

// --- Paso 3: finalizar ---
function finalizarCompra() {
  if (productosPendientes) productosPendientes.innerHTML = "";

  if (window.Swal) {
    Swal.fire({ title: "Gracias por su compra", icon: "success" });
  } else {
    alert("Gracias por su compra");
  }

  if (paso3) {
    paso3.classList.remove("btn-inactivo");
    paso3.classList.add("btn-activo");
  }

  localStorage.removeItem("productos-cesta");
  actualizariconoPA();
  preciosCarrito();
}

// --- Bootstrap ---
document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem('accessToken');
	    if (!token) {
	        // Redirigir al login si no está autenticado
	        window.location.href = './iniciarSesion.html';
	        return;
	    }
  mostrarCarrito();
  if (btnPagar) btnPagar.addEventListener("click", metodosPago);
});

