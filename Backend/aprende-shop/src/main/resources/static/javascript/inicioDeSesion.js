// ----- Config de URL para evitar CORS cuando el front NO corre en 8080 -----
const BASE = location.origin.includes(":8080") ? "" : "http://localhost:8080";
const API_URL_USUARIOS = BASE + "/api/usuarios/";

// Espera a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("[LOGIN] JS cargado y DOM listo");

  const form        = document.getElementById("loginForm");
  const emailInput  = document.getElementById("useremail");
  const passInput   = document.getElementById("userpassword");
  const errorMsg    = document.getElementById("error-msg");

  if (!form || !emailInput || !passInput || !errorMsg) {
    console.error("[LOGIN] Faltan elementos en el DOM");
    return;
  }

  form.addEventListener("submit", onSubmit);

  function showError(message) {
    // alerta inline (por si prefieres verla en la página)
    errorMsg.textContent = message;
    errorMsg.classList.remove("d-none");
    // modal sweetalert
    Swal.fire({
      icon: "error",
      title: "No se pudo iniciar sesión",
      text: message,
      confirmButtonColor: "#00b19a"
    });
  }
  function hideError() {
    errorMsg.textContent = "";
    errorMsg.classList.add("d-none");
  }

  async function onSubmit(e) {
    e.preventDefault();
    hideError();

    const email = (emailInput.value || "").trim().toLowerCase();
    const password = (passInput.value || "").trim();

    if (!email || !password) {
      return showError("Por favor, completa todos los campos.");
    }

    // Spinner de validación
    await Swal.fire({
      title: "Validando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const usuarios = await fetchUsuarios(); // obtiene lista
      const lista = (Array.isArray(usuarios) ? usuarios : [usuarios]).map(u => ({
        id:          u.id ?? u.idUsuario ?? null,
        nombre:      u.nombre ?? u.name ?? "",
        email:       String(u.email ?? u.correoElectronico ?? "").toLowerCase(),
        password:    String(u.password ?? u.contrasena ?? ""),
        tipoUsuario: u.tipoUsuario ?? "ES",
        estado:      Number(u.estado ?? 1)
      }));

      const user = lista.find(u => u.email === email && u.estado === 1);
      if (!user) {
        Swal.close();
        return showError("Usuario no registrado o desactivado.");
      }
      if (user.password !== password) {
        Swal.close();
        return showError("Contraseña incorrecta.");
      }

      // éxito
      localStorage.setItem("usuarioSesion", JSON.stringify({
        id: user.id, nombre: user.nombre, email: user.email, tipoUsuario: user.tipoUsuario
      }));

      // cambia el spinner por “bienvenido”
      await Swal.fire({
        icon: "success",
        title: `¡Bienvenido${user.nombre ? ", " + user.nombre : ""}!`,
        text: "Has iniciado sesión correctamente",
        showConfirmButton: false,
        timer: 1400
      });

      window.location.href = "./index.html";
    } catch (err) {
      console.error("[LOGIN] error:", err);
      Swal.close();
      showError(err.message || "No se pudo iniciar sesión.");
    }
  }

  async function fetchUsuarios() {
    const url = API_URL_USUARIOS.endsWith("/") ? API_URL_USUARIOS : API_URL_USUARIOS + "/";
    console.log("[LOGIN] GET", url);
    const res = await fetch(url, { method: "GET" });
    const raw = await res.text();
    console.log("[LOGIN] status=", res.status, "raw=", raw.slice(0, 200) + (raw.length > 200 ? "..." : ""));
    if (!res.ok) throw new Error(raw || `Error ${res.status} consultando usuarios`);
    try { return JSON.parse(raw); } catch { return []; }
  }
});


