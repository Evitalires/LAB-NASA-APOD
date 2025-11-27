import { fetchNasa } from "./fetchNasa.js";

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {

  // Cargar la imagen del día
  fetchNasa();

  // Buscar imagen por fecha
  const selectorFecha = document.getElementById("selectorFecha");

  selectorFecha.addEventListener("change", () => {
    const fechaSeleccionada = selectorFecha.value;
    fetchNasa(fechaSeleccionada);
  });

});
