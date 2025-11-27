const claveNASA = "wXxgiwA31Ktt9yVEPSSEiZUG3imX2XweVmfWLjAc";
/* const claveNASA = "GsqCas0fRjMfDdL7koVMiBSlcgBrXCChyg7J49vi"; */
let fotoActual = null;
let listaDeFavoritos = [];


function traerFoto(fecha) {
    let direccion = "https://api.nasa.gov/planetary/apod?api_key=" + claveNASA;

    if (fecha) {
        direccion = direccion + "&date=" + fecha;
    }

    fetch(direccion)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            fotoActual = datos;

            document.getElementById('foto').src = datos.url;
            document.getElementById('titulo').innerText = datos.title;
            document.getElementById('dia').innerText = datos.date;
            document.getElementById('texto').innerText = datos.explanation;
        })
        .catch(function(error) {
            alert('Error: ' + error);
        });
}

function guardarFavorito() {
    if (fotoActual == null) {
        alert('No hay foto para guardar');
        return;
    }

    let existe = false;
    for (let i = 0; i < listaDeFavoritos.length; i++) {
        if (listaDeFavoritos[i].date === fotoActual.date) {
            existe = true;
        }
    }

    if (existe) {
        alert('Ya guardaste esta foto');
        return;
    }

    listaDeFavoritos.unshift(fotoActual);

    const textoParaGuardar = JSON.stringify(listaDeFavoritos);
    localStorage.setItem('fotos', textoParaGuardar);

    mostrarFavoritos();
    alert('¡Guardado!');
}


function cargarFavoritos() {
    const textoGuardado = localStorage.getItem('fotos');

    if (textoGuardado) {
        listaDeFavoritos = JSON.parse(textoGuardado);
    }

    mostrarFavoritos();
}


function mostrarFavoritos() {
    const contenedor = document.getElementById('favoritos');
    const totalFavoritos = listaDeFavoritos.length;

    document.getElementById('total').innerText = totalFavoritos;
    
    if (totalFavoritos === 0) {
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">No tienes favoritos</div>
            </div>';
        `
        return;
    }
    //Cambiar a una funcion for each.
    let favoritos = '';
    for (let i = 0; i < totalFavoritos; i++) {
        const foto = listaDeFavoritos[i];

        favoritos += '<div class="col-md-4 mb-3">';
        favoritos += '<div class="card">';
        favoritos += '<img src="' + foto.url + '" style="height: 200px; object-fit: cover;">';
        favoritos += '<div class="card-body">';
        favoritos += '<h5>' + foto.title + '</h5>';
        favoritos += '<p>' + foto.date + '</p>';
        favoritos += '<button class="btn btn-sm btn-danger" onclick="borrar(' + i + ')">Borrar</button>';
        favoritos += '</div>';
        favoritos += '</div>';
        favoritos += '</div>';
    }

    contenedor.innerHTML = favoritos;
}


function borrar(numero) {
    listaDeFavoritos.splice(numero, 1);

    const nuevosFavoritos = JSON.stringify(listaDeFavoritos);
    localStorage.setItem('fotos', nuevosFavoritos);

    mostrarFavoritos();
}


function cambioFecha() {
    const fechaElegida = document.getElementById('fecha').value;
    traerFoto(fechaElegida);
}

const hoy = new Date();
let año = hoy.getFullYear();
let mes = hoy.getMonth() + 1;
let dia = hoy.getDate();

if (mes < 10) mes = '0' + mes;
if (dia < 10) dia = '0' + dia;

const fechaHoy = año + '-' + mes + '-' + dia;

document.getElementById('fecha').value = fechaHoy;
document.getElementById('fecha').max = fechaHoy;


cargarFavoritos();
traerFoto();

document.getElementById('btnGuardar').onclick = guardarFavorito;
document.getElementById('fecha').onchange = cambioFecha;
