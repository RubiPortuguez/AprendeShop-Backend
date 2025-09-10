// //Script Dark Mode + Modales 
//   window.addEventListener("DOMContentLoaded", () => {
//     const savedName = localStorage.getItem("userName");
//     if (savedName)
//       document.getElementById("userName").textContent = savedName;

//     const savedDesc = localStorage.getItem("userDesc");
//     if (savedDesc)
//       document.getElementById("userDesc").firstChild.textContent =
//         savedDesc + " ";

//     const savedEmail = localStorage.getItem("userEmail");
//     if (savedEmail) {
//       document.getElementById("userEmail").textContent = savedEmail;
//       document.getElementById("userEmail").href = "mailto:" + savedEmail;
//     }

//     // Cargar avatar guardado si tienes avatar con id profilePic
//     const savedAvatar = localStorage.getItem("userAvatar");
//     if (savedAvatar) {
//       document.getElementById("profilePic").src = savedAvatar;
//       if (document.getElementById("headerAvatar"))
//         document.getElementById("headerAvatar").src = savedAvatar;
//     }
//   });

//   const switchMode = document.getElementById("modeSwitch");

//   // Aplicar preferencia al cargar con localStorage
//   if (localStorage.getItem("theme") === "dark") {
//     applyDarkMode(true);
//     switchMode.checked = true;
//   }

//   // Evento cambio de tema
//   switchMode.addEventListener("change", () => {
//     if (switchMode.checked) {
//       applyDarkMode(true);
//       localStorage.setItem("theme", "dark");
//     } else {
//       applyDarkMode(false);
//       localStorage.setItem("theme", "light");
//     }
//   });

//   function applyDarkMode(enable) {
//     document.body.classList.toggle("bg-dark", enable);
//     document.body.classList.toggle("text-white", enable);

//     // Tarjetas
//     document.querySelectorAll(".card").forEach((card) => {
//       card.classList.toggle("bg-dark", enable);
//       card.classList.toggle("text-white", enable);
//     });

//     // Descripción (para que no se quede gris en dark mode)
//     document.querySelectorAll("#userDesc").forEach((desc) => {
//       if (enable) {
//         desc.classList.remove("text-muted");
//         desc.classList.add("text-light");
//       } else {
//         desc.classList.remove("text-light");
//         desc.classList.add("text-muted");
//       }
//     });

//     // Íconos de edición (para que se vean en dark mode)
//     document.querySelectorAll(".bi-pencil-square").forEach((icon) => {
//       if (enable) {
//         icon.style.color = "#fff";
//       } else {
//         icon.style.color = "";
//       }
//     });
//   }

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
async function putUsuario(id, partial) {
  const url = API_URL_USUARIOS + id;

  if ("email" in partial) delete partial.email;

  const params = new URLSearchParams();
  Object.entries(partial).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") params.append(k, v);
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });

  const raw = await res.text();
  if (!res.ok) {
    let msg = raw;
    try { msg = JSON.parse(raw).message || msg; } catch {}
    if (res.status === 409) msg = "El correo ya está registrado.";
    throw new Error(`Error ${res.status}: ${msg}`);
  }
  return raw ? JSON.parse(raw) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // --- Obtener sesión o redirigir ---
  const sesionStr = localStorage.getItem("usuarioSesion");
  if (!sesionStr) {
    window.location.href = "./iniciarSesion.html";
    return;
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
  const avatarKey    = sesion.id ? `userAvatar:${sesion.id}` : "userAvatar:anon";
  const storedAvatar = localStorage.getItem(avatarKey) || localStorage.getItem("userAvatar");
  const avatarUrl    = sesion.avatar || storedAvatar || "./assets/avatarPerfil/default-avatar-profile.jpg";

  if (profilePic)   profilePic.src   = avatarUrl;
  if (headerAvatar) headerAvatar.src = avatarUrl;

  $$(".avatar-select").forEach(img => {
    img.addEventListener("click", () => {
      const url = img.src;
      if (profilePic)   profilePic.src   = url;
      if (headerAvatar) headerAvatar.src = url;
      sesion.avatar = url;
      localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
      localStorage.setItem(avatarKey, url);
      localStorage.setItem("userAvatar", url);
      const modalEl = document.getElementById("avatarModal");
      if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    });
  });

  // --- Descripción breve ---
  const descSpan  = document.getElementById("userDescText");
  const descP     = document.getElementById("userDesc");
  const descKey   = sesion.id ? `userDesc:${sesion.id}` : "userDesc:anon";
  let savedDesc   = sesion.descripcion || localStorage.getItem(descKey) || "";

  if (savedDesc) {
    if (descSpan) descSpan.textContent = savedDesc;
    else if (descP && descP.firstChild) descP.firstChild.nodeValue = savedDesc + " ";
  }

  $("#saveDescBtn")?.addEventListener("click", () => {
    const val = ($("#userDescInput")?.value || "").trim();
    if (val.length > 250) {
      return window.Swal
        ? Swal.fire('Muy largo', 'Máximo 250 caracteres', 'warning')
        : alert('Máximo 250 caracteres');
    }

    if (descSpan) descSpan.textContent = val;
    else if (descP && descP.firstChild) descP.firstChild.nodeValue = val + " ";

    localStorage.setItem(descKey, val);
    sesion.descripcion = val;
    localStorage.setItem("usuarioSesion", JSON.stringify(sesion));

    if (window.Swal) Swal.fire('Listo', 'Descripción guardada', 'success');
    const modalEl = document.getElementById("editDescModal");
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
  });

  // --- Guardar NOMBRE ---
  const nameInput = $("#userNameInput");
  if (nameInput) nameInput.value = sesion.nombre || "";

  $("#saveNameBtn")?.addEventListener("click", async () => {
    const val = (nameInput?.value || "").trim();
    if (val.length < 2)  return Swal.fire({icon:"warning", title:"Nombre muy corto"});
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!re.test(val))   return Swal.fire({icon:"warning", title:"Nombre inválido"});

    try {
      const updated = await putUsuario(sesion.id, { nombre: val });
      sesion = updated ? normalizeUser(updated) : { ...sesion, nombre: val };
      localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
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
      if (cur !== sesion.password) {
        return Swal.fire({icon:"error", title:"Contraseña actual incorrecta"});
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
        const updated = await putUsuario(sesion.id, { password: pwd });
        sesion = updated ? normalizeUser(updated) : { ...sesion, password: pwd };
        localStorage.setItem("usuarioSesion", JSON.stringify(sesion));

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



