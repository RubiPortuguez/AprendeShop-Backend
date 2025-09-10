// import { products } from "./data.js";

const API_URL = "/api/cursos/"; 

document.addEventListener("DOMContentLoaded", () => {
  console.log("[FORM] Formulario cargado");
  
  // --- Referencias mínimas necesarias ---
  const form = document.getElementById("product-form");

  const mainImage = document.getElementById("mainImage");
  const additionalImages = document.getElementById("additionalImages");

  const includesKit = document.getElementById("includesKit");
  const kitDescriptionContainer = document.getElementById("kitDescriptionContainer");
  const kitDescription = document.getElementById("kitDescription");

  const priceWithKitContainer = document.getElementById("priceWithKitContainer");
  const coursePriceWithKit = document.getElementById("coursePriceWithKit");

  const coursePrice = document.getElementById("coursePrice");

  const shortDescription = document.getElementById("shortDescription");
  const charCount = document.getElementById("charCount");

  // Verificar que existan los elementos críticos
  if (!form) {
    console.error("[FORM] No se encontró el formulario con id 'product-form'");
    return;
  }

  // --- Helpers UI ---
  const toggleKitUI = (checked) => {
    if (kitDescriptionContainer) kitDescriptionContainer.style.display = checked ? "block" : "none";
    if (priceWithKitContainer) priceWithKitContainer.style.display = checked ? "block" : "none";
    
    if (checked && coursePriceWithKit) {
      coursePriceWithKit.setAttribute("required", "true");
    } else if (coursePriceWithKit) {
      coursePriceWithKit.removeAttribute("required");
      coursePriceWithKit.value = "";
      if (kitDescription) kitDescription.value = "";
      coursePriceWithKit.classList.remove("is-invalid");
    }
  };

  // Estado inicial
  if (includesKit) {
    toggleKitUI(includesKit.checked);
    
    // Switch kit
    includesKit.addEventListener("change", function () {
      toggleKitUI(this.checked);
    });
  }

  // Contador + validación descripción corta
  if (shortDescription && charCount) {
    shortDescription.addEventListener("input", function () {
      // Limitar máximo a 200
      if (this.value.length > 200) this.value = this.value.slice(0, 200);
      charCount.textContent = this.value.length;

      // Validar mínimo de 10 caracteres
      if (this.value.length < 10) {
        this.setCustomValidity("La descripción corta debe tener al menos 10 caracteres");
      } else {
        this.setCustomValidity(""); // Limpia el error si ya cumple
      }
    });
  }

  // Validación precio kit > precio base
  if (coursePriceWithKit && coursePrice) {
    coursePriceWithKit.addEventListener("input", function () {
      const base = parseFloat(coursePrice.value) || 0;
      const kit = parseFloat(this.value) || 0;
      if (kit > 0 && kit <= base) {
        this.classList.add("is-invalid");
        if (this.nextElementSibling) {
          this.nextElementSibling.textContent = "El precio con kit debe ser mayor al precio base";
        }
      } else {
        this.classList.remove("is-invalid");
      }
    });
  }

  // Guardado en localStorage (clave: "cursos")
  form.addEventListener("submit", async (ev) => {
    console.log("[FORM] === SUBMIT INICIADO ===");
    ev.preventDefault();
    ev.stopPropagation();

    try {
      // Obtener valores básicos
      const courseNameEl = document.getElementById("courseName");
      const fullDescriptionEl = document.getElementById("fullDescription");
      const courseCategoryEl = document.getElementById("courseCategory");
      const courseDurationEl = document.getElementById("courseDuration");
      const courseRatingEl = document.getElementById("courseRating");
      const materialsListEl = document.getElementById("materialsList");
      const difficultyEl = document.querySelector('input[name="difficulty"]:checked');

      // Validar elementos críticos
      if (!courseNameEl || !shortDescription || !fullDescriptionEl) {
        console.error("[FORM] Faltan campos básicos del formulario");
        showError("Faltan campos básicos en el formulario");
        return;
      }

      const base = parseFloat(coursePrice?.value || 0);
      const kitChecked = includesKit?.checked || false;
      const kit = parseFloat(coursePriceWithKit?.value || 0);

      console.log("[FORM] Valores básicos:", { base, kitChecked, kit });

      // Validación precio kit
      if (kitChecked && (isNaN(kit) || kit <= base)) {
        console.log("[FORM] Error en validación de precio kit");
        if (coursePriceWithKit) {
          coursePriceWithKit.classList.add("is-invalid");
          if (coursePriceWithKit.nextElementSibling) {
            coursePriceWithKit.nextElementSibling.textContent =
              "El precio con kit debe ser mayor al precio base";
          }
        }
        return;
      }

      // Validación de imagen principal
      if (!mainImage?.files[0]) {
        console.log("[FORM] Falta imagen principal");
        showError("Debes seleccionar una imagen principal");
        return;
      }

      // Validación general del formulario
      if (!form.checkValidity()) {
        console.log("[FORM] Formulario inválido");
        form.classList.add("was-validated");
        return;
      }

      console.log("[FORM] Todas las validaciones pasaron");

      // Mostrar indicador de carga
      showLoading("Guardando curso...");

      // Subir imagen principal a Cloudinary
      console.log("[FORM] Subiendo imagen principal...");
      let mainImageUrl = null;
      if (mainImage.files[0]) {
        mainImageUrl = await sendImage(mainImage.files[0]);
        console.log("[FORM] Imagen principal subida:", mainImageUrl);
      }

      // Subir imágenes adicionales
      console.log("[FORM] Subiendo imágenes adicionales...");
      let additionalImageUrls = [];
      if (additionalImages?.files?.length > 0) {
        const files = Array.from(additionalImages.files).slice(0, 3);
        for (const file of files) {
          const url = await sendImage(file);
          if (url) additionalImageUrls.push(url);
        }
      }
      console.log("[FORM] Imágenes adicionales subidas:", additionalImageUrls);

      // Duración total
      const duracionTotal = Number(courseDurationEl?.value || 0);

      // Materiales
      const materialesStr = materialsListEl?.value
        ?.split(/[\n,]/)
        ?.map(x => x.trim())
        ?.filter(Boolean)
        ?.join(", ") || "";

      // Construir payload
      const payload = {
        nombreCurso: courseNameEl.value,
        descripcionCorta: shortDescription.value,
        descripcionDetallada: fullDescriptionEl.value,
        categoria: courseCategoryEl?.value || "",
        nivelDificultad: difficultyEl?.value || "Principiante",
        duracionTotal: duracionTotal,
        idioma: "ES",
        precio: base,
        valoracionInicial: parseInt(courseRatingEl?.value || "0", 10),
        imagenPrincipal: mainImageUrl,
        materiales: materialesStr,
        galeriaAdicional: (additionalImageUrls[0] || null),
        incluyeKit: kitChecked ? 1 : 0,
        descripcionKit: kitChecked ? (kitDescription?.value || null) : null,
        estado: 1,
        precioKit: kitChecked ? kit : null
      };

      console.log("[FORM] Payload construido:", payload);

      // Validar que tenemos los datos mínimos
      if (!payload.nombreCurso || !payload.descripcionCorta || !payload.imagenPrincipal) {
        console.error("[FORM] Datos incompletos:", payload);
        hideLoading();
        showError("Faltan datos obligatorios");
        return;
      }

      // Realizar POST
      console.log("[FORM] Enviando POST a:", API_URL);
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("[FORM] Respuesta recibida:", resp.status, resp.ok);

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("[FORM] Error del servidor:", errorText);
        throw new Error(`Error ${resp.status}: ${errorText}`);
      }

      const creado = await resp.json();
      console.log("[FORM] Curso creado:", creado);

      hideLoading();
      showSuccess("¡Curso guardado correctamente!");

      // Reset form
      form.reset();
      toggleKitUI(false);
      if (charCount) charCount.textContent = "0";
      form.classList.remove("was-validated");

    } catch (error) {
      console.error("[FORM] Error completo:", error);
      hideLoading();
      showError(error.message || "No se pudo guardar el curso");
    }
  });

  // Funciones de UI
  function showLoading(message) {
    if (window.Swal) {
      Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });
    }
  }

  function hideLoading() {
    if (window.Swal) {
      Swal.close();
    }
  }

  function showError(message) {
    if (window.Swal) {
      Swal.fire("Error", message, "error");
    } else {
      alert("Error: " + message);
    }
  }

  function showSuccess(message) {
    if (window.Swal) {
      Swal.fire("¡Éxito!", message, "success");
    } else {
      alert(message);
    }
  }
});

// Función para subir imágenes a Cloudinary
async function sendImage(file) {
  console.log("[CLOUDINARY] Subiendo imagen:", file.name);
  
  const formData = new FormData();
  const cloudName = "dwkykeqgz";
  const uploadPreset = "imagen_cursos";
  
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status} subiendo imagen`);
    }
    
    const data = await response.json();
    console.log("[CLOUDINARY] Imagen subida exitosamente:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("[CLOUDINARY] Error al cargar imagen:", error);
    return null;
  }
}



