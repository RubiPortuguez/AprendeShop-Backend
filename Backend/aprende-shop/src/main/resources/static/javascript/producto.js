// producto.js — detalle de curso + reseñas (desde la BD)

const API_URL     = "/api/cursos/";
const REVIEWS_URL = "/api/review/curso/";

// Ejecuta SOLO si existe el marcador del detalle en esta página
(async () => {
  const isDetailPage = !!document.getElementById("nombreProducto");
  if (!isDetailPage) return;

  // ---------- Referencias de DOM ----------
  const nombreProducto      = document.getElementById("nombreProducto");
  const precioProducto      = document.getElementById("precioProducto");
  const descripcionProducto = document.getElementById("descripcionProducto");
  const imgContainer        = document.getElementById("imgContainer");
  const botones             = document.querySelectorAll(".botonHide");
  const cardMateriales      = document.getElementById("card-materiales");
  const categoriaContainer  = document.getElementById("categoriaContainer");
  const nivelContainer      = document.getElementById("nivelContainer");
  const idiomaContainer     = document.getElementById("idiomaContainer");
  const duracionContainer   = document.getElementById("duracionContainer");
  const switchKitWrapper = document.getElementById("switchKitWrapper");
  const checkIncluyeKit  = document.getElementById("checkNativeSwitch");

  // ---------- Estado ----------
  let producto = null;
  let hasKit   = false;

  // ---------- Utils ----------
  const toHasKit = v => (v === true || v === 1 || v === "1");

  // ---------- Estrellas (UI local) ----------
  function starsRandom(rate) {
    let res = "";
    const full  = `<i class="bi bi-star-fill" style="color:#D4AC0D"></i>`;
    const half  = `<i class="bi bi-star-half" style="color:#D4AC0D"></i>`;
    const empty = `<i class="bi bi-star" style="color:#D4AC0D"></i>`;
    const ent = parseInt(rate);
    for (let i = 1; i <= ent; i++) res += full;
    if (ent < rate) res += half;
    let c = Math.ceil(rate);
    while (c < 5) { res += empty; c++; }
    return res;
  }

  function crearEstrella() {
    const container = document.getElementById("seleccionarCalificacion");
    if (!container) return;
    container.innerHTML = "";
    let usuarioCalificacion = 0;
    const calificaciones = [];

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.dataset.value = i;
      star.innerHTML = '★<span class="star-fill" style="width:0%">★</span>';
      star.addEventListener("click", (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const half = rect.width / 2;
        usuarioCalificacion = clickX < half ? i - 0.5 : i;
        calificaciones.push(usuarioCalificacion);
        actualizarPromedioLocal(calificaciones);
        actualizarCalificacion(usuarioCalificacion);
      });
      container.appendChild(star);
    }
  }

  function actualizarCalificacion(value) {
    const container = document.getElementById("seleccionarCalificacion");
    if (!container) return;
    const stars = container.children;
    for (let i = 0; i < stars.length; i++) {
      const fill = stars[i].querySelector(".star-fill");
      if (value >= i + 1) fill.style.width = "100%";
      else if (value >= i + 0.5) fill.style.width = "50%";
      else fill.style.width = "0%";
    }
  }

  function actualizarPromedioLocal(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length || 0;
    const promEl = document.getElementById("promedio");
    if (promEl) promEl.textContent = avg.toFixed(1);
    actualizarPromedioEstrella(avg);
  }

  function actualizarPromedioEstrella(value) {
    const container = document.getElementById("calificacionUsuarios");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      let fillPercent = 0;
      if (value >= i) fillPercent = 100;
      else if (value >= i - 1) fillPercent = (value - (i - 1)) * 100;
      const star = document.createElement("span");
      star.classList.add("star");
      star.innerHTML = `★<span class="star-fill" style="width:${fillPercent}%">★</span>`;
      container.appendChild(star);
    }
  }
  
  // ==== Cache y fetch de usuarios (para nombres en reseñas) ====
  const userCache = new Map();

  async function fetchUserName(userId) {
    if (!userId) return null;
    if (userCache.has(userId)) return userCache.get(userId);
  }


  // ---------- Render Not Found (robusto) ----------
  function renderNotFound() {
    if (nombreProducto) nombreProducto.textContent = "Producto no encontrado";
    botones.forEach(btn => btn && (btn.style.display = "none"));
    if (imgContainer) {
      imgContainer.insertAdjacentHTML(
        "afterbegin",
        `<img src="./assets/cursos/carritoVacio.png" class="card-img-top imgProducto" alt="Producto no encontrado">`
      );
    }
  }

  // ---------- Render Producto ----------
  function renderProducto() {
    if (!producto) return;

    // Título + contenedores de rating
    nombreProducto.textContent = producto.nombreCurso;
    nombreProducto.insertAdjacentHTML(
      "afterend",
      `<p class="my-0">Calificación</p>
       <div id="calificacionUsuarios" class="stars"></div>
       <span id="promedio">0</span>
       <p class="my-0">Dale una calificación a nuestro curso</p>
       <div id="seleccionarCalificacion" class="stars"></div>`
    );

    // ---- KIT (usa la variable global let hasKit) ----
    hasKit = (producto.incluyeKit === true || producto.incluyeKit === 1 || producto.incluyeKit === "1");
    if (switchKitWrapper) switchKitWrapper.classList.toggle("d-none", !hasKit);
    if (checkIncluyeKit)  checkIncluyeKit.checked = !!hasKit;

    function actualizarPrecioKit() {
      if (!precioProducto) return;
      precioProducto.style.display = "block";
      if (hasKit && checkIncluyeKit && checkIncluyeKit.checked) {
        precioProducto.innerHTML = `
          <span class="text-muted text-decoration-line-through me-2">$${producto.precio} MXN</span>
          <span class="fw-bold text-morado">$${producto.precioKit} MXN</span>
          <small class="text-verde d-block">Incluye kit de materiales</small>`;
      } else {
        precioProducto.innerHTML = `<span>$${producto.precio} MXN</span>`;
      }
    }
    actualizarPrecioKit();
    if (hasKit && checkIncluyeKit) {
      checkIncluyeKit.addEventListener("change", actualizarPrecioKit);
    }

    // Imagen principal
    if (imgContainer) {
      imgContainer.insertAdjacentHTML(
        "afterbegin",
        `<img src="${producto.imagenPrincipal}" class="imagen-producto imgProducto" alt="${producto.nombreCurso}">`
      );
    }

    // Descripción
    if (descripcionProducto) descripcionProducto.textContent = producto.descripcionDetallada ?? "";

    // Materiales
    const mats = (producto.materiales || "").split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
    if (cardMateriales) {
      cardMateriales.insertAdjacentHTML(
        "afterbegin",
        `<ul class="list-group list-group-flush">
           ${mats.map(m => `<li class="list-group-item py-1">${m}</li>`).join("")}
         </ul>`
      );
    }

    // Metadatos
    if (categoriaContainer) categoriaContainer.textContent = `Categoría : ${producto.categoria}`;
    if (nivelContainer)     nivelContainer.textContent     = `Dificultad : ${producto.nivelDificultad}`;
    if (idiomaContainer)    idiomaContainer.textContent    = `Idioma : ${producto.idioma}`;
    if (duracionContainer)  duracionContainer.textContent  = `Duración : ${producto.duracionTotal} horas`;

    // Estrellas UI local
    crearEstrella();
    actualizarPromedioEstrella(0);
  }


  // ---------- Reseñas ----------
  function agruparComentarios(comentarios, tamanoGrupo) {
    const grupos = [];
    for (let i = 0; i < comentarios.length; i += tamanoGrupo) {
      grupos.push(comentarios.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }

  function renderResenas(comentarios) {
    // Promedio desde la BD
    const promedioDb = comentarios.length
      ? comentarios.reduce((a, r) => a + (r.calificacion || 0), 0) / comentarios.length
      : 0;
    const promEl = document.getElementById("promedio");
    if (promEl) promEl.textContent = promedioDb.toFixed(1);
    actualizarPromedioEstrella(promedioDb);

    const carruselContainer = document.getElementById("commentsCarousel");
    const carruselInner     = document.getElementById("carousel-inner");
    if (!carruselContainer || !carruselInner) return;

    if (!comentarios || comentarios.length === 0) {
      carruselContainer.innerHTML = `
        <div class="text-center p-4">
          <p class="text-muted">Todavía no hay reseñas para este producto 📝</p>
        </div>`;
      return;
    }

    const grupos = agruparComentarios(comentarios, 3);
    grupos.forEach((grupo, index) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${index === 0 ? "active" : ""}`;

      let tarjetasHTML = '<div class="d-flex justify-content-center">';
      grupo.forEach((c) => {
        const uid    = c.fkIdUsuario ?? c.fk_idUsuario;
        const nombre = c.usuario.nombre ?? (`Usuario #${uid}`);
        tarjetasHTML += `
          <div class="card mx-2" style="min-width: 250px; max-width: 300px;">
            <div class="card-body">
              <h6 class="card-title text-center">${nombre}</h6>
              <div class="text-center">${starsRandom(c.calificacion)}</div>
              <p class="card-text text-center m-2">"${c.comentario}"</p>
            </div>
          </div>`;
      });
      tarjetasHTML += "</div>";
      item.innerHTML = tarjetasHTML;
      carruselInner.appendChild(item);
    });

    if (window.bootstrap?.Carousel) {
      new bootstrap.Carousel(carruselContainer, {
        interval: 5000,
        wrap: true,
        touch: true,
      });
    }
  }

  // ---------- Carrito ----------
  // ---- Estado / refs globales ---
    let iconoPA = null;
    let productosCesta = [];
    hasKit = false;               // <-- este es el que usa agregarCarrito()
    let alertaToast = null;

    // helper: ejecuta ahora o cuando el DOM esté listo
    function ready(fn){
      if (document.readyState !== "loading") fn();
      else document.addEventListener("DOMContentLoaded", fn);
    }

    // Carga refs del DOM y engancha eventos
    function cargarElementos() {
      iconoPA     = document.getElementById("iconoPA");
      alertaToast = document.getElementById("liveToast");

      // ¡Re-consulta el botón aquí! (por si fue null al cargar el archivo)
      const btnComprar = document.querySelector(".btnComprar");
      if (btnComprar) {
        btnComprar.addEventListener("click", agregarCarrito);
      }

     // actualizariconoPA();
    }

    // Llama cargarElementos incluso si DOMContentLoaded ya pasó
    ready(cargarElementos);

    // Agrega al carrito
    function agregarCarrito(e) {
      e.preventDefault();
     // if (!window.producto) return;

      // Lee el switch en el momento del click
      const check = document.getElementById("checkNativeSwitch");
      const precioFinal = (hasKit && check && check.checked && Number(producto.precioKit))
        ? Number(producto.precioKit)
        : Number(producto.precio);

      // Vuelve a leer carrito por seguridad (multi-pestaña)
      const cart = JSON.parse(localStorage.getItem("productos-cesta") || "[]");
      cart.push({
        id:     producto.idCurso,
        imagen: producto.imagenPrincipal,
        nombre: producto.nombreCurso,
        precio: precioFinal
      });
      localStorage.setItem("productos-cesta", JSON.stringify(cart));
      productosCesta = cart;

      // Feedback: toast o SweetAlert
      if (window.bootstrap?.Toast && alertaToast) {
        bootstrap.Toast.getOrCreateInstance(alertaToast).show();
      } else if (window.Swal) {
        Swal.fire({ icon: "success", title: "Agregado al carrito" });
      }
  	actualizariconoPA();
    }

    // Badge del carrito
    function actualizariconoPA() {
  	const iconoCarrito     = document.getElementById("iconoPA");
      const cart = JSON.parse(localStorage.getItem("productos-cesta") || "[]");
      if (cart.length > 0) {
        iconoCarrito.classList.remove("visually-hidden");
        iconoCarrito.textContent = cart.length;
      } else {
        iconoCarrito.classList.remove("visually-hidden");
        iconoCarrito.textContent = "";
      }
    }

  // ---------- Wishlist ----------
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const btnWishlistProduct = document.getElementById("btnWishlistProduct");

  function ponerQuitarWishlist(ID, button) {
    if (wishlist.includes(ID)) {
      wishlist = wishlist.filter(prodId => prodId !== ID);
      button?.querySelector("i")?.classList?.replace("bi-heart-fill", "bi-heart");
    } else {
      wishlist.push(ID);
      button?.querySelector("i")?.classList?.replace("bi-heart", "bi-heart-fill");
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function orejasWishlistButtons() {
    if (!producto || !btnWishlistProduct) return;
    const ID = producto.idCurso;
    if (wishlist.includes(ID)) {
      btnWishlistProduct.querySelector("i")?.classList?.replace("bi-heart", "bi-heart-fill");
    }
    btnWishlistProduct.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      ponerQuitarWishlist(ID, btnWishlistProduct);
    });
  }

  // ---------- Carga de datos ----------
  try {
    const params  = new URLSearchParams(location.search);
    const idParam = params.get("id");
    const id      = idParam ? Number(idParam) : NaN;

    if (!id || Number.isNaN(id)) {
      console.warn("ID de curso inválido");
      renderNotFound();
      return;
    }

    // 1) Curso
    const res = await fetch(`${API_URL}${id}`);
    if (!res.ok) throw new Error(`Curso ${id} no encontrado`);
    producto = await res.json();
    renderProducto();

	
	// 2) Reseñas (con nombres desde /api/usuarios/{id} y normalización de 'comentario')
	let comentarios = [];
	try {
	  const r2 = await fetch(`${REVIEWS_URL}${id}`);
	  const raw = r2.ok ? await r2.json() : [];

	  // IDs únicos de usuario
	  const idsUnicos = [...new Set(
	    raw.map(c => c.fkIdUsuario ?? c.fk_idUsuario).filter(Boolean)
	  )];

	  // Resuelve nombres (con caché)
	  const pares = await Promise.all(idsUnicos.map(async uid => [uid, await fetchUserName(uid)]));
	  const nameById = Object.fromEntries(pares);

	  // Normaliza campos y enriquece con nombreUsuario
	  comentarios = raw.map(c => {
	    const uid = c.fkIdUsuario ?? c.fk_idUsuario;
	    // comenta/activa otras llaves si tu backend las usa
	    const texto = (c.comentario ?? c.comentarios ?? c.comment ?? "").toString().trim();
	    return {
	      ...c,
	      nombreUsuario: c.nombreUsuario ?? nameById[uid] ?? `Usuario #${uid}`,
	      comentario: texto || "Sin comentario",
	      calificacion: Number(c.calificacion ?? c.rating ?? 0),
	      fkIdUsuario: uid
	    };
	  });
	} catch {
	  comentarios = [];
	}

	renderResenas(comentarios);



    // 3) Interacciones
    document.addEventListener("DOMContentLoaded", cargarElementos);
    orejasWishlistButtons();

  } catch (err) {
    console.error(err);
    renderNotFound();
  }
})();
