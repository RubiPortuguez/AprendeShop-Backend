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

if (typeof window !== "undefined") window.API_BASE = API_BASE; // opcional, por si otra parte la necesita

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
    // campos solo front:
    avatar:      u.avatar ?? null,
    descripcion: u.descripcion ?? null,
  };
}

// PUT parcial; envía solo los campos que cambian (form-url-encoded para @RequestParam)
async function putUsuario(id, partial) {
  const url = API_URL_USUARIOS + id;

  // Por seguridad, NO permitir cambiar email desde front:
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
  return raw ? JSON.parse(raw) : null; // si tu servicio regresa el Usuario
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

  // --- Pintar datos básicos ---
  const nombreEl = $("#userName");
  const emailEl  = $("#userEmail");     // <a>
  const rolEl    = $("#userRole");      // opcional

  if (nombreEl) nombreEl.textContent = sesion.nombre || "—";
  if (emailEl)  { emailEl.textContent = sesion.email; emailEl.href = `mailto:${sesion.email}`; }
  if (rolEl) {
    const MAP = { ES: "Estudiante", TA: "Tallerista" };
    rolEl.textContent = MAP[sesion.tipoUsuario] || sesion.tipoUsuario || "—";
  }

  // Si existen controles de "editar email" en el HTML, esconderlos
  $("#btnEditEmail")?.remove();
  $("#editEmailModal")?.remove();

  // --- Avatar (solo local; no hay columna en BD) ---
  const profilePic   = $("#profilePic");
  const headerAvatar = $("#headerAvatar");
  const avatarKey    = sesion.id ? `userAvatar:${sesion.id}` : "userAvatar:anon";
  const storedAvatar = localStorage.getItem(avatarKey) || localStorage.getItem("userAvatar"); // compat
  const avatarUrl    = sesion.avatar || storedAvatar || "./assets/avatars/default.png";

  if (profilePic)   profilePic.src   = avatarUrl;
  if (headerAvatar) headerAvatar.src = avatarUrl;

  $$(".avatar-select").forEach(img => {
    img.addEventListener("click", () => {
      const url = img.src;
      if (profilePic)   profilePic.src   = url;
      if (headerAvatar) headerAvatar.src = url;
      sesion.avatar = url; // guardar en sesión local
      localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
      localStorage.setItem(avatarKey, url);
      localStorage.setItem("userAvatar", url); // compat
      const modalEl = document.getElementById("avatarModal");
      if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    });
  });

  // --- Descripción breve (solo front/localStorage) ---
  const descSpan  = document.getElementById("userDescText"); // <span id="userDescText">
  const descP     = document.getElementById("userDesc");     // o <p id="userDesc">Texto <span>...</span>
  const descKey   = sesion.id ? `userDesc:${sesion.id}` : "userDesc:anon";
  let savedDesc   = sesion.descripcion || localStorage.getItem(descKey) || "";

  // Pintar descripción si existe
  if (savedDesc) {
    if (descSpan) descSpan.textContent = savedDesc;
    else if (descP && descP.firstChild) descP.firstChild.nodeValue = savedDesc + " ";
  }

  // Guardar descripción desde modal/botón
  $("#saveDescBtn")?.addEventListener("click", () => {
    const val = ($("#userDescInput")?.value || "").trim();
    if (val.length > 250) {
      return window.Swal
        ? Swal.fire('Muy largo', 'Máximo 250 caracteres', 'warning')
        : alert('Máximo 250 caracteres');
    }

    // Actualiza UI
    if (descSpan) descSpan.textContent = val;
    else if (descP && descP.firstChild) descP.firstChild.nodeValue = val + " ";

    // Guarda por usuario + en sesión
    localStorage.setItem(descKey, val);
    sesion.descripcion = val;
    localStorage.setItem("usuarioSesion", JSON.stringify(sesion));

    if (window.Swal) Swal.fire('Listo', 'Descripción guardada', 'success');
    const modalEl = document.getElementById("editDescModal");
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
  });

  // Prefill del input de nombre (si existiera)
  const nameInput = $("#userNameInput");
  if (nameInput) nameInput.value = sesion.nombre || "";

  // --- Guardar NOMBRE (PUT) ---
  $("#saveNameBtn")?.addEventListener("click", async () => {
    const val = (nameInput?.value || "").trim();
    if (val.length < 2)  return Swal.fire({icon:"warning", title:"Nombre muy corto"});
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!re.test(val))   return Swal.fire({icon:"warning", title:"Nombre inválido"});

    try {
      const updated = await putUsuario(sesion.id, { nombre: val });
      // si el backend devuelve el usuario, actualizamos desde ahí
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

  // --- Cambio de CONTRASEÑA (PUT) ---
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

  // (Opcional) Cerrar sesión
  $("#btnLogout")?.addEventListener("click", () => {
    localStorage.removeItem("usuarioSesion");
    window.location.href = "./iniciarSesion.html";
  });
});



// ------------- wishlist (desde la BD) -----------------

// IMPORTA solo helpers de la UI
import { addItem, redirection } from "./clasesCatalogo.js";

// Normaliza lo que viene del backend a claves/tipos del front
function normalizeCurso(c) {
  return {
    ...c,
    idCurso:     c.idCurso ?? c.id ?? c.idProd ?? null,
    incluyeKit:  c.incluyeKit === true || c.incluyeKit === 1 || c.incluyeKit === "1",
    precioKit:   c.precioKit ?? c.precio_kit ?? c.precioConKit ?? c.precioconKit ?? null,
  };
}

// --- State ---
let products = [];                 // lista completa desde la BD
let productsById = new Map();      // índice rápido por idCurso

// --- Wishlist en LS (IDs numéricos) ---
let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]").map(Number);

// --- DOM ---
const itemsContainer = document.getElementById("itemsContainer");

// --- Carga cursos de la BD ---
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

// --- Verificar integridad de la wishlist ---
function verificarWishlist() {
  const filtrada = wishlist.filter(id => productsById.has(id));
  if (filtrada.length !== wishlist.length) {
    console.warn("[WISHLIST] Limpiando IDs inexistentes");
    wishlist = filtrada;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

// --- Mostrar cursos de la wishlist ---
function mostrarCursosWishlist() {
  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = `<p class="text-muted">No tienes cursos en tu lista de deseos.</p>`;
    return;
  }

  console.log("[WISHLIST] IDs:", wishlist);

  // Mantiene el orden de la wishlist
  wishlist.forEach(id => {
    const product = productsById.get(id);
    if (product) {
      addItem(product); // usa tu card del catálogo (muestra precioKit si aplica)
    } else {
      console.warn("[WISHLIST] Curso no encontrado (id =", id, ")");
    }
  });
}

// --- Quitar curso de la wishlist ---
function quitarCursoWishlist(id) {
  wishlist = wishlist.filter(prodId => prodId !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log("[WISHLIST] Removido", id, "->", wishlist);
}

// --- Render + listeners en las cards recién renderizadas ---
function renderWishlist() {
  mostrarCursosWishlist();

  // Redirección al producto
  const cards = document.querySelectorAll(".card-product");
  cards.forEach(card => {
    const btn = card.querySelector(".btn-wishlist");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    redirection(card, id);
  });

  // Botón corazón: quitar de wishlist (y re-render)
  const btnsWishlist = document.querySelectorAll(".btn-wishlist");
  console.log("[WISHLIST] Botones:", btnsWishlist.length);

  btnsWishlist.forEach(btn => {
    const id = Number(btn.dataset.id);
    const icon = btn.querySelector("i");

    // Estado visual asegurado (relleno porque están en wishlist)
    icon?.classList?.replace("bi-heart", "bi-heart-fill");

    btn.onclick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      quitarCursoWishlist(id);
      renderWishlist();
    };
  });
}

// --- Ejecuta SOLO en perfil.html ---
if (window.location.pathname.includes("perfil.html")) {
  loadProducts();
}


//Faltan agregar algunos detalles:
//listo 1. que el botón de corazón esté relleno en perfil porque ya están en wishlist
//listo 2.que se quiten los cursos de la página de perfil al presionar el botón de corazon
// listo 3. que redirija a pag de producto desde la wishlist
//4. agregar funcionalidad de botón wishlist en página de producto

//////////////////////////////////////////////////



