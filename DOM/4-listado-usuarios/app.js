/**
 * ==============================================================================
 * PRÁCTICA: Directorio de Usuaries (Listado)
 * Archivo: app.js
 * ==============================================================================
 * 
 * Sigue los comentarios marcados con TODO paso a paso.
 */

// 1. Constantes y URLs de la API
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 2. Selección de elementos del DOM
const usersGrid = document.getElementById('users-grid');
const statusContainer = document.getElementById('status-container');
const searchInput = document.getElementById('search-input');
const reloadBtn = document.getElementById('reload-btn');

// Variable en memoria para guardar la lista original (útil para el buscador)
let usuaries = [];

/**
 * Muestra u oculta el indicador de carga
 * @param {boolean} activo - true para mostrar spinner, false para limpiarlo
 */
function mostrarCargando(activo) {
    if (activo) {
    statusContainer.innerHTML = `
        <div class="loading-indicator">
        <div class="spinner"></div>
        <span>Cargando directorio de usuaries...</span>
        </div>
    `;
    usersGrid.innerHTML = '';
    } else {
    statusContainer.innerHTML = '';
    }  
}

/**
 * Muestra un mensaje de error estilizado en el DOM
 * @param {string} mensaje 
 */
function mostrarError(mensaje) {
    statusContainer.innerHTML = `
    <div class="error-card">
        <h3>⚠️ Ha ocurrido un error</h3>
        <p>${mensaje}</p>
    </div>
    `;
    usersGrid.innerHTML = '';
}

/**
 * Genera el HTML de una tarjeta individual de usuarie
 * Nota cómo creamos el enlace a detalle.html con el ID en la URL: detalle.html?id=${usuarie.id}
 * @param {Object} usuarie - Objeto usuarie de JSONPlaceholder
 * @returns {string} HTML de la tarjeta
 */
function crearTarjetaHTML(usuarie) {
    const iniciales = usuarie.name
    .split(' ')
    .map(palabra => palabra[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

    return `
    <article class="user-card" data-id="${usuarie.id}">
        <header class="user-card-header">
        <div class="user-avatar">${iniciales}</div>
        <div class="user-names">
            <h2>${usuarie.name}</h2>
            <span class="username-badge">@${usuarie.username}</span>
        </div>
        </header>

        <ul class="user-details">
        <li>📧 ${usuarie.email}</li>
        <li>🏙️ ${usuarie.address?.city || 'No especificada'}</li>
        <li>🏢 ${usuarie.company?.name || 'Independiente'}</li>
        </ul>

        <footer class="user-card-footer">
        <!-- Enlace con Query Parameter para navegar a la página de detalle -->
        <a href="detalle.html?id=${usuarie.id}" class="view-profile-btn">
            Ver perfil completo &rarr;
        </a>
        </footer>
    </article>
    `;
}

/**
 * TODO 2: Renderizar la lista de usuaries en el DOM
 * @param {Array} lista - Array de objetos de usuaries
 */
function renderizarUsuaries(lista) {
  // Limpia el contenedor de la cuadrícula
    usersGrid.innerHTML = '';

  // Si no hay usuaries:
    if (!lista || lista.length === 0) {
    usersGrid.innerHTML = '<p class="empty-message">No se encontraron usuaries.</p>';
    return;
    }

  // TODO 2.1: Recorre el array 'lista' y pinta cada tarjeta en 'usersGrid'
  // TIP: Puedes usar 'lista.map(crearTarjetaHTML).join("")'
    usersGrid.innerHTML = lista.map(crearTarjetaHTML).join("");
}


/**
 * TODO 1: Función principal para obtener usuaries desde la API
 */
async function obtenerUsuaries() {
    try {
    // Paso 1.1: Muestra el estado de carga
    mostrarCargando(true);

    // TODO 1.2: Realiza la petición con fetch() a API_URL
    // const respuesta = await ...

    // TODO 1.3: Comprueba si la respuesta fue correcta (!respuesta.ok).
    // Si falló, lanza un error: throw new Error(`Error HTTP: ${respuesta.status}`);

    // TODO 1.4: Parsea el cuerpo de la respuesta a JSON
    // const datos = await ...

    // Guardamos los datos en la variable global
    // usuaries = datos;

    // TODO 1.5: Llama a renderizarUsuaries() pasándole los datos obtenidos
    // renderizarUsuaries(usuaries);
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error (`Error: ${respuesta.status}: ${respuesta.statusText}`)
    }
    const datos = await respuesta.json();
    usuaries = datos;
    renderizarUsuaries(usuaries);
    statusContainer.innerHTML = "";


    } catch (error) {
    console.error('Error al obtener usuaries:', error);
    mostrarError('No pudimos conectar con el servidor. Revisa tu conexión a internet.');
    } finally {
    // Ocultar mensaje de carga
    mostrarCargando(false);
    } 
}

// ==============================================================================
// RETO OPCIONAL: Filtrado en tiempo real
// ==============================================================================
searchInput.addEventListener('input', (evento) => {
    const termino = evento.target.value.toLowerCase().trim();
    
  // TODO RETO: Filtra el array 'usuaries' comparando por nombre o email
  // y llama a renderizarUsuaries(...) con la lista filtrada
});

// Botón de recargar
reloadBtn.addEventListener('click', () => {
    searchInput.value = '';
    obtenerUsuaries();
});

// Inicialización
obtenerUsuaries();
