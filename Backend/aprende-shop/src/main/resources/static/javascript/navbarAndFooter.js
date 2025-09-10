// Detecta si estamos en perfil.html para usar anchors locales
const isPerfil = /(^|\/)perfil\.html(\?|#|$)/.test(location.pathname);

const hrefPerfil = isPerfil ? '#perfil' : './perfil.html#perfil';
const hrefConfig = isPerfil ? '#configuracion' : './perfil.html#configuracion';
const hrefWishlist = isPerfil ? '#wishlist' : './perfil.html#wishlist';

const navBarLoggedIn = `
  <nav id="perfilMenu" class="navbar navbar-expand-lg sticky-top">
            <div class="container-fluid align-items-center">
                <a class="navbar-brand" href="./index.html">Aprende<span id="shop">Shop</span></a>
                <button class="navbar-toggler color-boton-nav" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                   
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-end">
                        <li class="nav-item ">
                            <a class="nav-link active" aria-current="page" href="./clases.html">Clases</a>
                         </li>
                         
                        <li class="nav-item ">
                            <a class="nav-link active" aria-current="page" href="./foro.html">Foro</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link active" aria-current="page" href="./contacto.html">Contacto</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link active" id="carrito" aria-current="page" href="./carrito.html">
                                <i class="bi bi-cart d-none d-lg-inline">
                                <span id="iconoPA" class="translate-middle badge rounded-pill bg-danger visually-hidden"></span>
                                </i>
                                    
                                <span class="d-lg-none"> Carrito</span>

        
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href=" href="${hrefPerfil}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle d-none d-lg-inline"></i>
                            <span class="d-lg-none">Mi perfil</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item desktop-menu d-none d-md-block" href="${hrefPerfil}">Mi perfil</a></li>
                            <li><a class="dropdown-item" href="${hrefConfig}">Configuración</a></li>
                            <li><a class="dropdown-item" href="${hrefWishlist}">Lista de deseos</a></li>
                            <li><a class="dropdown-item" id="cerrar-sesion" href="./registro.html">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;

const navBarNotLoggedIn = `  <nav class="navbar navbar-expand-lg sticky-top">
            <div class="container-fluid align-items-center">
                <a class="navbar-brand d-flex align-content-center" href="./index.html">Aprende<span id="shop">Shop</span></a>
                <button class="navbar-toggler color-boton-nav" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <br>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                        <li class="nav-item align-self-end">
                            <a class="nav-link active" aria-current="page" href="./clases.html">Clases</a>
                        </li>
                        <li class="nav-item align-self-end">
                            <a class="nav-link active" aria-current="page" href="./contacto.html">Contacto</a>
                        </li>
                         <li class="nav-item align-self-end mx-2" id="boton-nav">
                            <a class="nav-link active" aria-current="page" href="./iniciarSesion.html">IniciarSesión</a>
                        </li>
                        <li class="nav-item align-self-end mx-1" id="boton-nav">
                            <a class="nav-link active" aria-current="page" href="./registro.html">Registrarse</a>
                        </li>
                    </ul>

                   

                </div>
            </div>
        </nav>`;

const footerAprendeShop =
    `<footer class="py-4 border-top"> 
<div class="container">
        <div class="row">
                        <div class="col-md-3 mb-2">
                <h2 class="navbar-brand fs-1 text-white">Aprende<span id="shop" class="fs-1">Shop</span></h2>

            </div>

            <div class="col-md-3 mb-1">
                <h2 id="titulo-istok-footter">Cursos</h2>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="./clases.html" class="nav-link p-0 text-muted">Catálogo completo</a></li>
                    <li class="nav-item"><a href="./foro.html" class="nav-link p-0 text-muted">Foro</a></li>
                </ul>
            </div>

            <div class="col-md-3 mb-1">
                <h2 id="titulo-istok-footter">Usuario</h2>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="${hrefPerfil}" class="nav-link p-0 text-muted">Perfil</a></li>
                    <li class="nav-item"><a href="${hrefConfig}" class="nav-link p-0 text-muted">Configuración de cuenta</a></li>
                    <li class="nav-item"><a href="./clases.html" class="nav-link p-0 text-muted">Mis cursos</a></li>
                    <li class="nav-item"><a href="./perfil.html" class="nav-link p-0 text-muted">Wishlist</a></li>
                    <li class="nav-item"><a href="./carrito.html" class="nav-link p-0 text-muted">Carrito de compras</a></li>

                </ul>
            </div>

            <div class="col-md-3 mb-1">
                <h2 id="titulo-istok-footter">Más sobre AprendeShop</h2>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="./nosotras.html" class="nav-link p-0 text-muted">Nosotras</a>
                    </li>
                    <li class="nav-item"><a href="./contacto.html" class="nav-link p-0 text-muted">Contacto</a></li>
                </ul>
            </div>
        </div>

        <!-- línea + copyright + iconos abajo -->
        <div class="d-flex justify-content-between align-items-center pt-3 mt-2">
            <small class="text-muted">© 2025 AprendeShop</small>
            <div class="d-flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" data-correo="aprendeshop808@gmail.com"
                    class="copiarCorreoFooter"><i class="fas fa-envelope fa-lg iconos-redes-footer"></i></a>
                <a href="https://www.linkedin.com/" target="_blank"
                    rel="noopener noreferrer"><i class="fab fa-linkedin fa-lg iconos-redes-footer"></i></a>
                <a href="https://github.com/RubiPortuguez/Aprende-Shop" target="_blank" rel="noopener noreferrer"><i
                        class="fab fa-github fa-lg iconos-redes-footer"></i></a>
            </div>
        </div>

    </div>
    </footer>`;

	// navbarAndFooter.js

	document.addEventListener("DOMContentLoaded", () => {
	  // --- sesión actual desde login (nuevo flujo) ---
	  const sesionStr = localStorage.getItem("usuarioSesion");
	  const sesion = sesionStr ? JSON.parse(sesionStr) : null;

	  // --- helpers ---
	  const isPerfil = /(^|\/)perfil\.html(\?|#|$)/.test(location.pathname);

	  function actualizarIconoCarrito() {
	    const iconoPA = document.getElementById("iconoPA");
	    if (!iconoPA) return;
	    const productos = JSON.parse(localStorage.getItem("productos-cesta") || "[]");
	    const n = productos.length;
	    if (n > 0) {
	      iconoPA.classList.remove("visually-hidden");
	      iconoPA.textContent = String(n);
	    } else {
	      iconoPA.classList.add("visually-hidden");
	      iconoPA.textContent = "";
	    }
	  }

	  // --- inyecta navbar y footer según esté logueado o no ---
	  // (navBarLoggedIn, navBarNotLoggedIn y footerAprendeShop deben existir como strings HTML)
	  if (!sesion) {
	    document.body.insertAdjacentHTML("afterbegin", navBarNotLoggedIn);
	  } else {
	    document.body.insertAdjacentHTML("afterbegin", navBarLoggedIn);
	  }
	  document.body.insertAdjacentHTML("beforeend", footerAprendeShop);

	  // Si el navbar logueado tiene el nombre/rol, pónselos
	  if (sesion) {
	    const nombreEl = document.getElementById("navUserName");
	    if (nombreEl) nombreEl.textContent = sesion.nombre || sesion.email || "Mi perfil";
	    const avatarEl = document.getElementById("navUserAvatar");
	    const avatarUrl = sesion.avatar || localStorage.getItem("userAvatar") || "./assets/avatars/default.png";
	    if (avatarEl) avatarEl.src = avatarUrl;
	  }

	  // Actualiza el iconito del carrito (si existe)
	  actualizarIconoCarrito();
	  // si cambia en otra pestaña
	  window.addEventListener("storage", (ev) => {
	    if (ev.key === "productos-cesta") actualizarIconoCarrito();
	  });

	  // --- ScrollSpy solo en perfil ---
	  if (isPerfil && window.bootstrap) {
	    document.body.setAttribute("data-bs-spy", "scroll");
	    document.body.setAttribute("data-bs-target", "#perfilMenu");
	    document.body.setAttribute("data-bs-offset", "80");
	    document.body.setAttribute("tabindex", "0");

	    new bootstrap.ScrollSpy(document.body, {
	      target: "#perfilMenu",
	      offset: 80
	    });
	  }

	  // --- marcar link activo en navbar ---
	  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

	  document.querySelectorAll(".navbar a.nav-link[href]").forEach(a => {
	    const page = a.getAttribute("href").split("/").pop().toLowerCase();
	    if (page && page === current) {
	      a.classList.add("active");
	      a.setAttribute("aria-current", "page");
	    } else {
	      a.classList.remove("active");
	      a.removeAttribute("aria-current");
	    }
	  });

	  document.querySelectorAll(".navbar .dropdown-menu a.dropdown-item[href]").forEach(a => {
	    const page = a.getAttribute("href").split("/").pop().toLowerCase();
	    if (page && page === current) a.classList.add("active");
	    else a.classList.remove("active");
	  });
	});

	// --- copiar correo del footer (delegación de eventos) ---
	document.body.addEventListener("click", (event) => {
	  const btnCopy = event.target.closest(".copiarCorreoFooter");
	  if (!btnCopy) return;

	  event.preventDefault();
	  const correo = btnCopy.dataset.correo || "";
	  navigator.clipboard.writeText(correo).then(() => {
	    Swal.fire({
	      title: `Correo ${correo} copiado al portapapeles`,
	      icon: "success",
	      buttonsStyling: true,
	      confirmButtonText: "Aceptar",
	      confirmButtonColor: "#985EFF",
	      customClass: {
	        title: "mi-titulo",
	        content: "mi-contenido",
	        confirmButton: "mi-boton",
	      },
	    });
	  });
	});

	// --- cerrar sesión (delegación de eventos) ---
	document.body.addEventListener("click", (event) => {
	  const cerrar = event.target.closest("#cerrar-sesion");
	  if (!cerrar) return;

	  event.preventDefault();
	  Swal.fire({
	    title: "¿Estás seguro que deseas cerrar sesión?",
	    icon: "warning",
	    showCancelButton: true,
	    confirmButtonText: "Sí, cerrar sesión",
	    cancelButtonText: "Cancelar",
	    confirmButtonColor: "#985EFF",
	    cancelButtonColor: "#d33",
	    customClass: {
	      title: "mi-titulo",
	      content: "mi-contenido",
	      confirmButton: "mi-boton",
	    },
	  }).then((result) => {
	    if (result.isConfirmed) {
	      // nuevo flujo
	      localStorage.removeItem("usuarioSesion");
	      // limpieza vieja por compatibilidad
	      localStorage.removeItem("usuarioInicio");
	      window.location.href = "./index.html";
	    }
	  });
	});


