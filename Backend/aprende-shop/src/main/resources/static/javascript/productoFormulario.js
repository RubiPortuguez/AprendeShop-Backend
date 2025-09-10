// import { products } from "./data.js";

const API_URL = "/api/cursos/"; 

document.addEventListener("DOMContentLoaded", () => {
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

  // --- Helpers UI ---
  const toggleKitUI = (checked) => {
    kitDescriptionContainer.style.display = checked ? "block" : "none";
    priceWithKitContainer.style.display = checked ? "block" : "none";
    if (checked) {
      coursePriceWithKit.setAttribute("required", "true");
    } else {
      coursePriceWithKit.removeAttribute("required");
      coursePriceWithKit.value = "";
      if (kitDescription) kitDescription.value = "";
      coursePriceWithKit.classList.remove("is-invalid");
    }
  };

  // Estado inicial
  toggleKitUI(includesKit.checked);
  // otherLanguageText.style.display = otherLanguage.checked ? "block" : "none";

  // Switch kit
  includesKit.addEventListener("change", function () {
    toggleKitUI(this.checked);
  });

  // Contador + validación descripción corta
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

  // Validación precio kit > precio base
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

  // Guardado en localStorage (clave: "cursos")
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const base = parseFloat(coursePrice.value);
    const kitChecked = includesKit.checked;
    const kit = parseFloat(coursePriceWithKit.value);

    if (kitChecked && (isNaN(kit) || kit <= base)) {
      coursePriceWithKit.classList.add("is-invalid");
      if (coursePriceWithKit.nextElementSibling) {
        coursePriceWithKit.nextElementSibling.textContent =
          "El precio con kit debe ser mayor al precio base";
      }
      return;
    }

    // Validación de imágenes
    if (!mainImage.files[0]) {
      if (window.Swal) {
        Swal.fire("Error", "Debes seleccionar una imagen principal", "error");
      } else {
        alert("Debes seleccionar una imagen principal");
      }
      return;
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Subir imagen principal a Cloudinary
    let mainImageUrl = null;
    if (mainImage.files[0]) {
      mainImageUrl = await sendImage(mainImage.files[0]);
    }

    // Subir imágenes adicionales
    let additionalImageUrls = [];
    if (additionalImages.files.length > 0) {
      const files = Array.from(additionalImages.files).slice(0, 3);
      for (const file of files) {
        const url = await sendImage(file);
        if (url) additionalImageUrls.push(url);
      }
    }


    // Duración total (tu backend no guarda la unidad)
    const duracionTotal = Number(document.getElementById("courseDuration").value) || 0;

    const materialesStr = document
      .getElementById("materialsList")
      .value.split(/[\n,]/).map(x => x.trim()).filter(Boolean).join(", ");


    const payload = {
      // idCurso lo genera el backend
      nombreCurso: document.getElementById("courseName").value,
      descripcionCorta: shortDescription.value,
      descripcionDetallada: document.getElementById("fullDescription").value,
      categoria: document.getElementById("courseCategory").value,
      nivelDificultad: document.querySelector('input[name="difficulty"]:checked').value,
      duracionTotal: duracionTotal,        // número
      idioma: "ES",                        // fijo
      precio: base,                        // precio base
      precioKit: kitChecked ? kit : null,
      valoracionInicial: parseInt(document.getElementById("courseRating").value, 10) || 0,
      imagenPrincipal: mainImageUrl,
      materiales: materialesStr,           // string con comas
      galeriaAdicional: (additionalImageUrls[0] || null),
      incluyeKit: kitChecked ? 1 : 0,      // 0/1
      descripcionKit: kitChecked ? (kitDescription.value || null) : null,
      estado: 1
    };

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(`Error ${resp.status}: ${msg}`);
      }

      const creado = await resp.json(); // { idCurso: ..., ... }

      if (window.Swal) {
        Swal.fire("¡Enviado con éxito!", "El curso se guardó correctamente", "success");
      } else {
        alert("¡Enviado con éxito!");
      }

      // Redirigir al detalle
      // window.location.href = `./producto.html?id=${creado.idCurso}`;

      form.reset();
      toggleKitUI(false);
      charCount.textContent = "0";
      form.classList.remove("was-validated");
    } catch (e) {
      console.error("Error al guardar curso:", e);
      if (window.Swal) {
        Swal.fire("Error", e.message || "No se pudo guardar el curso", "error");
      } else {
        alert(e.message || "No se pudo guardar el curso");
      }
    }


    // Reset
    form.reset();
    toggleKitUI(false);
    charCount.textContent = "0";
    form.classList.remove("was-validated");
  });
});

// Función para subir imágenes a Cloudinary
async function sendImage(file) {
  const formData = new FormData();
  const cloudName = "dwkykeqgz"; // checar si es otro cloud
  const uploadPreset = "imagen_cursos"; // cehcar si coincide con el de Cloudinary
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error al cargar imagen", error);
    return null;
  }
}



