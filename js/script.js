const $ = (id) => document.getElementById(id);

const apiRickAndMorty = "https://rickandmortyapi.com/api/character/";
const apiUsuario = "https://jsonplaceholder.typicode.com/users/1";
const apiFrase = "https://api.quotable.io/random";

const botonPersonaje = $("btnPersonaje");
const cajaPersonaje = $("resultado");
const botonFrase = $("btnFrase");
const cajaFrase = $("fraseResultado");

document.addEventListener("DOMContentLoaded", cargarUsuario);

if (botonPersonaje) {
    botonPersonaje.addEventListener("click", mostrarPersonaje);
}

if (botonFrase) {
    botonFrase.addEventListener("click", mostrarFrase);
}

async function pedirDatos(url) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return respuesta.json();
}

function numeroPersonajeAleatorio() {
    return Math.floor(Math.random() * 826) + 1;
}

async function mostrarPersonaje() {
    const idPersonaje = numeroPersonajeAleatorio();

    try {
        const personaje = await pedirDatos(`${apiRickAndMorty}${idPersonaje}`);
        pintarPersonaje(personaje);
    } catch (error) {
        console.error("No se pudo cargar el personaje:", error);
        if (cajaPersonaje) {
            cajaPersonaje.innerHTML = "<p>Error al obtener el personaje.</p>";
        }
    }
}

function pintarPersonaje(personaje) {
    if (!cajaPersonaje) return;

    cajaPersonaje.innerHTML = `
        <h2>${personaje.name}</h2>
        <img src="${personaje.image}" width="200">
        <p><strong>Estado:</strong> ${personaje.status}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
    `;
}

async function cargarUsuario() {
    const nombre = $("nombreUsuario");
    const correo = $("emailUsuario");
    const telefono = $("telefonoUsuario");

    try {
        const usuario = await pedirDatos(apiUsuario);

        if (nombre) nombre.textContent = usuario.name;
        if (correo) correo.textContent = usuario.email;
        if (telefono) telefono.textContent = usuario.phone;
    } catch (error) {
        console.error("No se pudo cargar el usuario:", error);
        if (nombre) nombre.textContent = "No disponible";
    }
}

async function mostrarFrase() {
    if (cajaFrase) {
        cajaFrase.innerHTML = "<p>Cargando...</p>";
    }

    if (botonFrase) {
        botonFrase.disabled = true;
    }

    try {
        const frase = await pedirDatos(apiFrase);
        pintarFrase(frase);
    } catch (error) {
        console.error("No se pudo cargar la frase:", error);
        if (cajaFrase) {
            cajaFrase.textContent = "No se pudo obtener la frase. Revisa la consola.";
        }
    } finally {
        if (botonFrase) {
            botonFrase.disabled = false;
        }
    }
}

function pintarFrase(frase) {
    if (!cajaFrase) return;

    cajaFrase.innerHTML = `
        <p>"${frase.content}"</p>
        <p><em>- ${frase.author}</em></p>
    `;
}
