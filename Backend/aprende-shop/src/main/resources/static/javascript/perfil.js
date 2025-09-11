// ===== PERFIL + PUT a la BD =====

// Evita CORS si el front no corre en 8080

// ----- Config base/API -----
const API_BASE = (typeof window !== "undefined" && window.API_BASE)
  ? window.API_BASE
  : (location.origin.includes(":8080") ? "" : "http://localhost:8080");

if (typeof window !== "undefined") window.API_BASE = API_BASE;

// Endpoints
const API_URL_USUARIOS = `${API_BASE}/api/usuarios/`;
const API_URL_CURSOS   = `${API_BASE}/api/cursos/`;

const avatars = [
	"./assets/avatarPerfil/Canguro.png",
	"./assets/avatarPerfil/gato.png",
	"./assets/avatarPerfil/llama.png",
	"./assets/avatarPerfil/oso.png",
	"./assets/avatarPerfil/pulpo.png",
	"./assets/avatarPerfil/zorro.png",
	"./assets/avatarPerfil/zorro2.png",
	"./assets/avatarPerfil/zorro3.png",
	"./assets/avatarPerfil/zorro4.png",
];

// función para elegir uno aleatorio
function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}

// Normaliza un usuario de la API a las claves que usa el front
function normalizeUser(u = {}) {
  return {
    id:          u.id ?? u.idUsuario ?? null,
    nombre:      u.nombre ?? u.name ?? "",
    email:       u.email ?? u.correoElectronico ?? "",
    telefono:    u.telefono ?? "",
    password:    u.password ?? u.contrasena ?? "",
    tipoUsuario: u.tipoUsuario ?? "ES",
    estado:      Number(u.estado ?? 1),
    avatar:      u.avatar ?? null,
    descripcion: u.descripcion ?? null,
  };
}

// PUT parcial; envía solo los campos que cambian
async function putUsuario(sesionParam) {
	
	const tokenPut = localStorage.getItem('accessToken');
	
	try {
	      const userResponse = await fetch(`http://localhost:8080/api/usuarios/${sesionParam.id}`, {
	          method: 'PUT',
	          headers: {
				  'Content-Type': 'application/json',
	              'Authorization': `Bearer: ${tokenPut}`
	          },
			  
			  body: JSON.stringify({
			          nombre:      sesionParam.nombre,
			          email:       sesionParam.email,
			          telefono:    sesionParam.telefono,
			          password:    sesionParam.password,
			          tipoUsuario: sesionParam.tipoUsuario,
			          estado:      sesionParam.estado
			      })
	      });
	      
	      if (userResponse.ok) {
	          const response = await userResponse.json();
	      } else {
	         Swal.fire({icon:"error", title:"No se pudo actualizar el usuario", text:e.message});
	      }
	  } catch (userError) {
	       Swal.fire({icon:"error", title:"No se pudo actualizar el usuario", text:e.message});
	  }
}

async function changePassword(sesionParam, actual, nueva) {
	
	const tokenPutPwd = localStorage.getItem('accessToken');
	
	try {
	      const userResponse = await fetch(`http://localhost:8080/api/usuarios/changePwd/${sesionParam.id}`, {
	          method: 'PUT',
	          headers: {
				  'Content-Type': 'application/json',
	              'Authorization': `Bearer: ${tokenPutPwd}`
	          },
			  
			  body: JSON.stringify({
			          password:  actual,
			          npassword: nueva
			      })
	      });
	      
	      if (userResponse.ok) {
	          const response = await userResponse.json();
	      } else {
	         Swal.fire({icon:"error", title:"No se pudo actualizar la contraseña", text:e.message});
	      }
	  } catch (userError) {
	      Swal.fire({icon:"error", title:"No se pudo actualizar la contraseña", text:e.message});
	  }
}

document.addEventListener("DOMContentLoaded", async () => {
	const token = localStorage.getItem('accessToken');
	    if (!token) {
	        // Redirigir al login si no está autenticado
	        window.location.href = './iniciarSesion.html';
	        return;
	    }
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // --- Obtener sesión o redirigir ---
  let sesionStr = null;
  const email = localStorage.getItem('usuarioSesion')
  
  // Obtener información completa del usuario
  try {
      const userResponse = await fetch(`http://localhost:8080/api/usuarios/${email}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer: ${token}`
          }
      });
      
      if (userResponse.ok) {
          const userData = await userResponse.json();		  
		  sesionStr = JSON.stringify(userData);

      } else {
         Swal.fire({icon:"error", title:"Error obteniendo usuario"});
      }
  } catch (userError) {
      Swal.fire({icon:"error", title:"Error obteniendo usuario", text:userError.message});
  }
  
  let sesion = normalizeUser(JSON.parse(sesionStr));

  //console.log("[PERFIL] Sesión cargada:", sesion);

  // --- BOTÓN AGREGAR PRODUCTO/CURSO ---
  const btnAgregarProducto = $("#btnNuevoProducto");
  
  if (btnAgregarProducto) {
    //console.log("[PERFIL] Botón agregar producto encontrado");
    
    btnAgregarProducto.addEventListener("click", (e) => {
      e.preventDefault();
      //console.log("[PERFIL] Click en botón agregar producto");
      
      // Verificar si el usuario es tallerista
      if (sesion.tipoUsuario !== "TA") {
        if (window.Swal) {
          Swal.fire({
            icon: "warning",
            title: "Acceso denegado",
            text: "Solo los talleristas pueden agregar cursos",
            confirmButtonColor: "#00b19a"
          });
        } else {
          alert("Solo los talleristas pueden agregar cursos");
        }
        return;
      }
      
      // Redirigir a la página de agregar producto
      console.log("[PERFIL] Redirigiendo a agregar producto...");
      window.location.href = "./formularioProducto.html";
    });
  } else {
    console.warn("[PERFIL] No se encontró el botón agregar producto");
  }

  // --- También buscar por diferentes selectores comunes ---
  const possibleSelectors = [
    "#agregarProducto",
    ".agregar-producto",
    "[data-action='add-product']",
    ".btn[href*='agregar']",
    ".add-product-btn"
  ];

  possibleSelectors.forEach(selector => {
    const btn = $(selector);
    if (btn && !btn.dataset.listenerAdded) {
      console.log("[PERFIL] Encontrado botón con selector:", selector);
      btn.dataset.listenerAdded = "true";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (sesion.tipoUsuario !== "TA") {
          if (window.Swal) {
            Swal.fire({
              icon: "warning", 
              title: "Acceso denegado",
              text: "Solo los talleristas pueden agregar cursos"
            });
          }
          return;
        }
        window.location.href = "./formularioProducto.html";
      });
    }
  });

  // --- Pintar datos básicos ---
  const nombreEl = $("#userName");
  const emailEl  = $("#userEmail");
  const rolEl    = $("#userRole");

  if (nombreEl) nombreEl.textContent = sesion.nombre || "—";
  if (emailEl)  { 
    emailEl.textContent = sesion.email; 
    emailEl.href = `mailto:${sesion.email}`; 
  }
  if (rolEl) {
    const MAP = { ES: "Estudiante", TA: "Tallerista" };
    rolEl.textContent = MAP[sesion.tipoUsuario] || sesion.tipoUsuario || "—";
  }

  // Si existen controles de "editar email", esconderlos
  $("#btnEditEmail")?.remove();
  $("#editEmailModal")?.remove();

  // --- Avatar ---
  const profilePic   = $("#profilePic");
  const headerAvatar = $("#headerAvatar");

  const avatarUrl    = getRandomAvatar();

  if (profilePic)   profilePic.src   = avatarUrl;
  if (headerAvatar) headerAvatar.src = avatarUrl;
  
  // --- Guardar NOMBRE ---
  const nameInput = $("#userNameInput");
  if (nameInput) nameInput.value = sesion.nombre || "";

  $("#saveNameBtn")?.addEventListener("click", async () => {
	    const val = (nameInput?.value || "").trim();
	    if (val.length < 2)	return Swal.fire({icon:"warning", title:"Nombre muy corto"});
	    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
	    if (!re.test(val))  return Swal.fire({icon:"warning", title:"Nombre inválido"});
	
		sesion.nombre = nameInput.value;
		
	    try {
	      const updated = await putUsuario(sesion);
	      sesion = updated ? normalizeUser(updated) : { ...sesion, nombre: val };
	      if (nombreEl) nombreEl.textContent = sesion.nombre;
	      await Swal.fire({icon:"success", title:"Nombre actualizado"});
	      const modalEl = document.getElementById("editNameModal");
	      if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
	    } catch (e) {
	      console.error(e);
	      Swal.fire({icon:"error", title:"No se pudo actualizar tu nombre", text:e.message});
	    }
  });

  // --- Cambio de CONTRASEÑA ---
  const formPwd = $("#changePasswordForm");
  if (formPwd) {
    const currentPassword = $("#currentPassword");
    const newPassword     = $("#newPassword");
    const confirmPassword = $("#confirmPassword");
    const strongRegex     = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    formPwd.addEventListener("submit", async (e) => {
      e.preventDefault();

      const cur = (currentPassword?.value || "").trim();
      const pwd = (newPassword?.value || "").trim();
      const cfm = (confirmPassword?.value || "").trim();

      if (!cur || !pwd || !cfm) {
        return Swal.fire({icon:"warning", title:"Completa todos los campos"});
      }
	  
      if (!strongRegex.test(pwd)) {
        return Swal.fire({icon:"warning", title:"Contraseña débil", text:"Debe tener 8+ caracteres, mayúscula, minúscula y número."});
      }
	  
      if (pwd !== cfm) {
        return Swal.fire({icon:"warning", title:"Las contraseñas no coinciden"});
      }
	  
      if (pwd === cur) {
        return Swal.fire({icon:"warning", title:"Usa una contraseña diferente a la actual"});
      }

      try {
	        const updated = await changePassword(sesion, cur, pwd);
	        sesion = updated ? normalizeUser(updated) : { ...sesion, password: pwd };
	
	        await Swal.fire({icon:"success", title:"Contraseña actualizada"});
	        const modalEl = document.getElementById("changePasswordModal");
	        if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
	        formPwd.reset();
	        [currentPassword, newPassword, confirmPassword]
	          .forEach(i => i?.classList.remove("is-valid","is-invalid"));
	      } catch (e2) {
	        console.error(e2);
	        Swal.fire({icon:"error", title:"No se pudo actualizar la contraseña", text:e2.message});
	      }
    });
  }

  // --- Cerrar sesión ---
  $("#btnLogout")?.addEventListener("click", () => {
    localStorage.removeItem("usuarioSesion");
	localStorage.removeItem("productos-cesta");
	localStorage.removeItem("wishlist");
    window.location.href = "./iniciarSesion.html";
  });
});

// ------------- WISHLIST FUNCTIONALITY -----------------

// Normaliza lo que viene del backend
function normalizeCurso(c) {
  return {
    ...c,
    idCurso:     c.idCurso ?? c.id ?? c.idProd ?? null,
    incluyeKit:  c.incluyeKit === true || c.incluyeKit === 1 || c.incluyeKit === "1",
    precioKit:   c.precioKit ?? c.precio_kit ?? c.precioConKit ?? c.precioconKit ?? null,
  };
}

// State
let products = [];
let productsById = new Map();
let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]").map(Number);

// DOM
const itemsContainer = document.getElementById("itemsContainer");

// Cargar cursos de la BD
async function loadProducts() {
  try {
    const res = await fetch(API_URL_CURSOS, { method: "GET" });
    const raw = await res.text();
    if (!res.ok) throw new Error(raw || `Error ${res.status} cargando cursos`);
    const data = JSON.parse(raw);

    products = Array.isArray(data) ? data.map(normalizeCurso) : [];
    productsById = new Map(products.map(p => [Number(p.idCurso), p]));

    verificarWishlist();
    renderWishlist();
  } catch (e) {
    console.error("[WISHLIST] No se pudieron cargar los cursos:", e);
    if (itemsContainer) {
      itemsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <h4>No se pudieron cargar tus cursos de la wishlist.</h4>
        </div>`;
    }
  }
}

// Verificar integridad de la wishlist
function verificarWishlist() {
  const filtrada = wishlist.filter(id => productsById.has(id));
  if (filtrada.length !== wishlist.length) {
    console.warn("[WISHLIST] Limpiando IDs inexistentes");
    wishlist = filtrada;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

// Mostrar cursos de la wishlist
function mostrarCursosWishlist() {
  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = `<p class="text-muted">No tienes cursos en tu lista de deseos.</p>`;
    return;
  }

  //console.log("[WISHLIST] IDs:", wishlist);

  // Importar dinámicamente solo si existe
  import('./clasesCatalogo.js').then(module => {
    const { addItem, redirection } = module;
    
    wishlist.forEach(id => {
      const product = productsById.get(id);
      if (product) {
        addItem(product);
      } else {
        console.warn("[WISHLIST] Curso no encontrado (id =", id, ")");
      }
    });
    
    renderWishlistItems(redirection);
  }).catch(err => {
    console.error("[WISHLIST] Error importando clasesCatalogo.js:", err);
    // Fallback sin las funciones del catálogo
    renderBasicWishlist();
  });
}

function renderBasicWishlist() {
  wishlist.forEach(id => {
    const product = productsById.get(id);
    if (product) {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-3";
      div.innerHTML = `
        <div class="card">
          <img src="${product.imagenPrincipal || './assets/default.jpg'}" class="card-img-top" alt="${product.nombreCurso}">
          <div class="card-body">
            <h5 class="card-title">${product.nombreCurso}</h5>
            <p class="card-text">${product.descripcionCorta}</p>
            <p class="text-primary fw-bold">$${product.precio}</p>
            <button class="btn btn-danger btn-sm" onclick="quitarCursoWishlist(${id}); renderWishlist();">
              Quitar de favoritos
            </button>
          </div>
        </div>
      `;
      itemsContainer.appendChild(div);
    }
  });
}

function renderWishlistItems(redirection) {
  // Redirección al producto
  const cards = document.querySelectorAll(".card-product");
  cards.forEach(card => {
    const btn = card.querySelector(".btn-wishlist");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (redirection) redirection(card, id);
  });

  // Botón corazón: quitar de wishlist
  const btnsWishlist = document.querySelectorAll(".btn-wishlist");
  //console.log("[WISHLIST] Botones:", btnsWishlist.length);

  btnsWishlist.forEach(btn => {
    const id = Number(btn.dataset.id);
    const icon = btn.querySelector("i");

    icon?.classList?.replace("bi-heart", "bi-heart-fill");

    btn.onclick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      quitarCursoWishlist(id);
      renderWishlist();
    };
  });
}

// Quitar curso de wishlist
function quitarCursoWishlist(id) {
  wishlist = wishlist.filter(prodId => prodId !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  //console.log("[WISHLIST] Removido", id, "->", wishlist);
}

// Render wishlist
function renderWishlist() {
  mostrarCursosWishlist();
}

// Ejecutar solo en perfil.html
if (window.location.pathname.includes("perfil.html")) {
  loadProducts();
}


//Faltan agregar algunos detalles:
//listo 1. que el botón de corazón esté relleno en perfil porque ya están en wishlist
//listo 2.que se quiten los cursos de la página de perfil al presionar el botón de corazon
// listo 3. que redirija a pag de producto desde la wishlist
//4. agregar funcionalidad de botón wishlist en página de producto

//////////////////////////////////////////////////



