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
                const userResponse = await fetch(`http://localhost:8080/api/usuarios/${iptEmail}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer: ${data.accessToken}`
                    }
                });
                
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    // CORREGIDO: Guardar con el nombre correcto que espera perfil.js
                    localStorage.setItem('usuarioSesion', userData.email);
                    window.location.href = "./index.html";
                } else {
                    window.location.href = "./index.html";
                }
            } catch (userError) {
                Swal.fire({icon:"error", title:"Usuario o contraseña incorrectos", text:userError.message});
            }
        } else {
            Swal.fire({icon:"error", title:"Usuario o contraseña incorrectos"});
        }
    } catch (error) {
        Swal.fire({icon:"error", title:"Error de conexión", text:error.message});
    }
});



