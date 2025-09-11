const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");
const btnIngresar = document.getElementById("btnIngresar");

btnIngresar.addEventListener("click", async function validarUsuario(e) {
    e.preventDefault();
    const iptEmail = document.getElementById("useremail").value.trim();
    const iptPassword = document.getElementById("userpassword").value.trim();

    if (iptEmail === "" || iptPassword === "") {
        showError("Por favor, completa todos los campos.");
        return;
    }

    try {
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
            
            // Obtener información completa del usuario
            try {
                const userResponse = await fetch(`http://localhost:8080/api/usuarios/email/${iptEmail}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer: ${data.accessToken}`
                    }
                });
                
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    // CORREGIDO: Guardar con el nombre correcto que espera perfil.js
                    localStorage.setItem('usuarioSesion', JSON.stringify(userData));
                    window.location.href = "./index.html";
                } else {
                    // Fallback si no se puede obtener info completa
                    localStorage.setItem('usuarioSesion', JSON.stringify({
                        email: iptEmail,
                        nombre: iptEmail.split('@')[0]
                    }));
                    window.location.href = "./index.html";
                }
            } catch (userError) {
                console.error('Error obteniendo usuario:', userError);
                localStorage.setItem('usuarioSesion', JSON.stringify({
                    email: iptEmail,
                    nombre: iptEmail.split('@')[0]
                }));
                window.location.href = "./index.html";
            }
        } else {
            showError("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error('Error:', error);
        showError("Error de conexión con el servidor.");
    }
});



