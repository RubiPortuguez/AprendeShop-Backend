const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");
const btnIngresar = document.getElementById("btnIngresar");

btnIngresar.addEventListener("click", async function validarUsuario(e) {
    e.preventDefault();
    const iptEmail = document.getElementById("useremail").value.trim();
    const iptPassword = document.getElementById("userpassword").value.trim();

    // Validar campos vacíos
    if (iptEmail === "" || iptPassword === "") {
        showError("Por favor, completa todos los campos.");
        return;
    }

    try {
        // Hacer petición a Spring Boot
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: iptEmail,
                password: iptPassword
            })
        });

        if (response.ok) {
            const data = await response.json();
            
            // Guardar token en localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('usuarioInicio', iptEmail);
            
            // Redirigir al index
            window.location.href = "./index.html";
        } else {
            const errorText = await response.text();
            showError("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error('Error:', error);
        showError("Error de conexión con el servidor.");
    }
});

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("d-none");
}



