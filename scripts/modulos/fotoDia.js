import { getApodByDate } from "./fetchNasa.js";

const img = document.getElementById("apodImagen");
const titulo = document.getElementById("apodTitulo");
const fecha = document.getElementById("apodFecha");
const descripcion = document.getElementById("apodDescripcion");
const btnFav = document.getElementById("btnFavorito");

// Pinta la card con la data
export function renderFoto(data) {
    titulo.textContent = data.title;
    fecha.textContent = data.date;
    descripcion.textContent = data.explanation;

    if (data.media_type === "image") {
        img.src = data.url;
        img.style.display = "block";
    } else {
        img.src = "";
        img.style.display = "none";
    }
}

// Foto del día
export async function cargarFotoHoy() {
    const today = new Date().toISOString().split("T")[0];
    const data = await getApodByDate(today);
    renderFoto(data);
}
