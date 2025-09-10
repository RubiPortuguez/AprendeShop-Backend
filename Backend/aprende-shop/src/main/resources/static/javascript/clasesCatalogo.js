// // Importación del JSON
// import { products } from "./data.js";

const API_URL = "/api/cursos/";
let products = [];

// Función para agregar un producto al contenedor
export function addItem(product) {
  const container = document.getElementById("itemsContainer");

  const hasKit = product.incluyeKit === true || product.incluyeKit === 1 || product.incluyeKit === "1";

  const card = `
<div class="col-sm-6 col-md-4 col-lg-3">
    <div class="card card-product h-100 shadow-sm clases">
        <img src="${product.imagenPrincipal}" class="card-img-top" alt="${product.nombreCurso
    }">
        
        <button class="btn btn-light btn-sm rounded-circle position-absolute top-0 start-0 m-2 btn-wishlist"
        data-id="${product.idCurso}"> <i class="bi bi-heart"></i> </button>
        <div class="card-body">
            <h5 class="card-title">${product.nombreCurso}</h5>
            <p class="card-text">${product.descripcionCorta}</p>
            <div class="mt-3 pt-2">
			${hasKit && product.precioKit != null
			  ? `<div class="d-flex justify-content-between align-items-start mb-2">
			       <div class="d-flex flex-column">
			         <span class="h6 text-morado fw-bold">$ ${product.precioKit} MXN</span>
			         <small class="text-verde">Incluye kit de materiales</small>
			       </div>
			       <span class="badge bg-morado text-white"><i class="bi bi-box-seam"></i> Kit</span>
			     </div>
			     <div class="text-start">
			       <small class="text-muted">$ ${product.precio} MXN sin kit</small>
			     </div>`
			  : `<div class="d-flex justify-content-between align-items-center">
			       <span class="h5 text-verde fw-bold">$ ${product.precio} MXN</span>
			     </div>`
			}
            </div>
        </div>
    </div>
</div>
`;
  container.insertAdjacentHTML("beforeend", card);
}

// Redireccionamiento y adición del id
export function redirection(card, id) {
  card.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `./producto.html?id=${id}`;
  }); // click
} // redirection

// const cards = document.querySelectorAll(".card-product");
// cards.forEach((card, index) => redirection(card, products[index].idProd));

// //Recorrer la lista de productos y agregarlos a la página
// products.forEach(product => addItem(product));

/*********** Función para filtrar productos por categoría *******************/
function filterProducts(category) {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  let productsToShow = [];

  if (category === "all") {
    productsToShow = products;
  } else {
    productsToShow = products.filter(product => product.categoria === category); /////////
  }

  if (productsToShow.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4>No se encontraron productos en esta categoría</h4>
      </div>
    `;
  } else {
    productsToShow.forEach(product => addItem(product));
  }

  // Usar productsToShow en lugar de products
  const cards = document.querySelectorAll(".card-product");
  cards.forEach((card, index) => {
    if (productsToShow[index]) {
      redirection(card, productsToShow[index].idCurso);
    }
  });

  orejasWishlistButtons();
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", function () {
  // Mostrar todos los productos al cargar la página
  if (window.location.pathname.includes('perfil.html')) {
    return;
  }

  
  // Normaliza lo que viene del backend a claves y tipos que esperamos en el front
  function normalizeCurso(c) {
    const pkRaw =
      c.precioKit ??
      c.precioConKit ??
      c.precioconKit ??
      c.precio_kit ??
      null;

    return {
      ...c,
      // 0/1/"0"/"1"/true/false → boolean
      incluyeKit:
        c.incluyeKit === true ||
        c.incluyeKit === 1 ||
        c.incluyeKit === "1",

      // Asegura número o null
      precio: Number(c.precio ?? c.price ?? 0),
      precioKit: pkRaw !== null && pkRaw !== undefined ? Number(pkRaw) : null,

      // (opcional pero MUY útil) slug de categoría para filtrar sin acentos/mayúsculas
      categoriaSlug: (c.categoria ?? "")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // sin acentos
        .replace(/\s+/g, ""), // sin espacios
    };
  }


  async function loadProducts() {
    try {
      const res = await fetch(API_URL,{method: 'GET'});
      const data = await res.json();
	  products = Array.isArray(data) ? data.map(normalizeCurso) : [];
	  filterProducts("all");
    } catch (err) {
      console.error("Error cargando cursos:", err);
      const container = document.getElementById("itemsContainer");
      container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4>No se pudieron cargar los productos.</h4>
      </div>
    `;
    }
  }

  loadProducts();

  // Agregar event listeners a los filtros
  const filtros = document.querySelectorAll(".nav-link[data-filter]");
  const itemsFiltro = document.querySelectorAll(".nav-filter-item");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", function (e) {
      e.preventDefault();

      // Remover clase active de todos los items
      itemsFiltro.forEach((item) => item.classList.remove("active"));

      // Agregar clase active al item clickeado
      this.parentElement.classList.add("active");

      // Obtener el valor del filtro
      const categoria = this.getAttribute("data-filter");

      // Filtrar productos
      filterProducts(categoria);
    });
  });
});



//traer wishlist de local storage, si no existe trae arreglo vacío
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// --- Función para agregar/quitar un curso de la wishlist ---
export function ponerQuitarWishlist(id, button) {
  // Si ya existe el producto en wishlist
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((prodId) => prodId !== id); // lo quitamos
    button.querySelector("i").classList.replace("bi-heart-fill", "bi-heart"); // cambia icono a vacío
  } else {
    wishlist.push(id); // lo agregamos
    button.querySelector("i").classList.replace("bi-heart", "bi-heart-fill"); // cambia icono a lleno
  } //if-else
  // Guardar cambios en localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
} //fn t

//-----Función para asignar orejitas a los botones wishlist-----
export function orejasWishlistButtons() {
  let btnsWishlist = document.querySelectorAll(".btn-wishlist");

  btnsWishlist.forEach((btn) => {
    const id = Number(btn.dataset.id); //leer data-id de cada botón<3
    // Si el producto ya está en wishlist, que muestre el icono lleno
    if (wishlist.includes(id)) {
      btn.querySelector("i").classList.replace("bi-heart", "bi-heart-fill");
    } //if

    // Evento click en cada botón
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // evita que se dispare redirección de la card
      ponerQuitarWishlist(id, btn);
    }); //oreja
  }); //foreach
} //fn orejasWishlistButtons

// --- Ejecutar ---
orejasWishlistButtons();
