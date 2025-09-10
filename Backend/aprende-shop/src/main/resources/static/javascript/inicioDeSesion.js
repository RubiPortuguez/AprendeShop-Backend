///
// ----- Config de URL para evitar CORS cuando el front NO corre en 8080 -----
const BASE = location.origin.includes(":8080") ? "" : "http://localhost:8080";
const API_URL_USUARIOS = BASE + "/api/usuarios/";

// Espera a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    console.log("[LOGIN] JS cargado y DOM listo");

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("useremail");
    const passInput = document.getElementById("userpassword");
    const errorMsg = document.getElementById("error-msg");

    if (!form || !emailInput || !passInput || !errorMsg) {
        console.error("[LOGIN] Faltan elementos en el DOM");
        return;
    }

    form.addEventListener("submit", onSubmit);

    function showError(message) {
        // Asegurar que se cierre cualquier modal antes de mostrar error
        Swal.close();
        
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

        // Mostrar spinner de validación
        const loadingModal = Swal.fire({
            title: "Validando...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            console.log("[LOGIN] Iniciando validación para:", email);
            
            const usuarios = await fetchUsuarios(); // obtiene lista
            console.log("[LOGIN] Usuarios obtenidos:", usuarios);
            
            // Procesar la lista de usuarios
            const lista = (Array.isArray(usuarios) ? usuarios : [usuarios]).map(u => ({
                id: u.id ?? u.idUsuario ?? null,
                nombre: u.nombre ?? u.name ?? "",
                email: String(u.email ?? u.correoElectronico ?? "").toLowerCase(),
                password: String(u.password ?? u.contrasena ?? ""),
                tipoUsuario: u.tipoUsuario ?? "ES",
                estado: Number(u.estado ?? 1)
            }));

            console.log("[LOGIN] Lista procesada:", lista);

            // Buscar usuario
            const user = lista.find(u => u.email === email && u.estado === 1);
            
            if (!user) {
                console.log("[LOGIN] Usuario no encontrado");
                Swal.close();
                return showError("Usuario no registrado o desactivado.");
            }
            
            if (user.password !== password) {
                console.log("[LOGIN] Contraseña incorrecta");
                Swal.close();
                return showError("Contraseña incorrecta.");
            }

            console.log("[LOGIN] Usuario validado correctamente:", user);

            // Guardar en localStorage
            localStorage.setItem("usuarioSesion", JSON.stringify({
                id: user.id, 
                nombre: user.nombre, 
                email: user.email, 
                tipoUsuario: user.tipoUsuario
            }));

            // Cerrar modal de carga antes de mostrar éxito
            Swal.close();

            // Mostrar mensaje de éxito
            await Swal.fire({
                icon: "success",
                title: `¡Bienvenido${user.nombre ? ", " + user.nombre : ""}!`,
                text: "Has iniciado sesión correctamente",
                showConfirmButton: false,
                timer: 1400
            });

            // Redireccionar
            window.location.href = "./index.html";
            
        } catch (err) {
            console.error("[LOGIN] Error completo:", err);
            
            // Asegurar que se cierre el modal de carga
            Swal.close();
            
            // Determinar mensaje de error más específico
            let errorMessage = "No se pudo iniciar sesión.";
            
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión.";
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            showError(errorMessage);
        }
    }

    async function fetchUsuarios() {
        const url = API_URL_USUARIOS.endsWith("/") ? API_URL_USUARIOS : API_URL_USUARIOS + "/";
        console.log("[LOGIN] GET", url);
        
        try {
            const res = await fetch(url, { 
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                // Agregar timeout para evitar requests que se cuelguen
                signal: AbortSignal.timeout(10000) // 10 segundos timeout
            });
            
            const raw = await res.text();
            console.log("[LOGIN] status=", res.status, "raw=", raw.slice(0, 200) + (raw.length > 200 ? "..." : ""));
            
            if (!res.ok) {
                throw new Error(raw || `Error ${res.status} consultando usuarios`);
            }
            
            try { 
                return JSON.parse(raw); 
            } catch (parseError) { 
                console.error("[LOGIN] Error parsing JSON:", parseError);
                throw new Error("Respuesta del servidor inválida");
            }
        } catch (fetchError) {
            console.error("[LOGIN] Error en fetch:", fetchError);
            throw fetchError;
        }
    }
});


