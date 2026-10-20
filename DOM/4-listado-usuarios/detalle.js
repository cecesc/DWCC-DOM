/**
 * ==============================================================================
 * PRÁCTICA: Vista de Detalle de Usuarie
 * Archivo: detalle.js
 * ==============================================================================
 * 
 * En este archivo aprenderás a:
 * 1. Leer parámetros de la URL actual usando URLSearchParams.
 * 2. Pedir un recurso individual a la API: /users/{id}
 * 3. Pedir recursos relacionados: /posts?userId={id}
 * 4. Gestionar la interfaz y errores si el ID no existe.
 */

// 1. URLs de la API
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// 2. Selectores del DOM
const statusContainer = document.getElementById('status-container');
const profileContainer = document.getElementById('profile-container');

/**
 * Muestra u oculta el indicador de carga
 */
function mostrarCargando(activo) {
    if (activo) {
    statusContainer.innerHTML = `
        <div class="loading-indicator">
        <div class="spinner"></div>
        <span>Cargando datos del perfil...</span>
        </div>
    `;
    profileContainer.innerHTML = '';
    } else {
    statusContainer.innerHTML = '';
    }
}

/**
 * Muestra mensaje de error
 */
function mostrarError(mensaje) {
    statusContainer.innerHTML = `
    <div class="error-card">
        <h3>⚠️ Ha ocurrido un error</h3>
        <p>${mensaje}</p>
        <a href="index.html">⬅ Volver al listado</a>
    </div>
    `;
    profileContainer.innerHTML = '';
}

/**
 * TODO 1: Leer el ID del usuarie desde la URL
 * PISTA: Usa window.location.search y la clase URLSearchParams
 * Ejemplo de URL: detalle.html?id=3
 * @returns {string|null} el id o null si no existe
 */
function obtenerIdDeLaURL() {
  // TODO 1.1: Instancia URLSearchParams con window.location.search
  // const params = new URLSearchParams(...);

  // TODO 1.2: Devuelve el valor del parámetro 'id' usando params.get('id')
  // return params.get('id');
  return null; // Cambia esto por tu código
}

/**
 * Genera el HTML del perfil completo
 * @param {Object} usuarie - Objeto individual devuelto por /users/{id}
 * @returns {string}
 */
function crearPerfilHTML(usuarie) {
    const iniciales = usuarie.name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

    return `
    <article class="profile-card">
        <header class="profile-banner">
        <div class="user-avatar large">${iniciales}</div>
        <div>
            <h1>${usuarie.name}</h1>
            <span class="username-badge">@${usuarie.username}</span>
        </div>
        </header>

        <div class="profile-sections">
        <div class="info-block">
            <h3>📬 Contacto</h3>
            <ul>
            <li><strong>Email:</strong> <a href="mailto:${usuarie.email}">${usuarie.email}</a></li>
            <li><strong>Teléfono:</strong> ${usuarie.phone}</li>
            <li><strong>Web:</strong> <a href="https://${usuarie.website}" target="_blank">${usuarie.website}</a></li>
            </ul>
        </div>

        <div class="info-block">
            <h3>📍 Dirección</h3>
            <ul>
            <li><strong>Calle:</strong> ${usuarie.address?.street}, ${usuarie.address?.suite}</li>
            <li><strong>Ciudad:</strong> ${usuarie.address?.city} (${usuarie.address?.zipcode})</li>
            </ul>
        </div>

        <div class="info-block">
            <h3>🏢 Empresa</h3>
            <ul>
            <li><strong>Nombre:</strong> ${usuarie.company?.name}</li>
            <li><strong>Lema:</strong> <em>"${usuarie.company?.catchPhrase}"</em></li>
            </ul>
        </div>
        </div>
    </article>
    `;
}

/**
 * Genera el HTML de la sección de publicaciones
 * @param {Array} posts - Lista de publicaciones del usuarie
 * @returns {string}
 */
function crearPostsHTML(posts) {
    if (!posts || posts.length === 0) {
    return `
        <section class="posts-section">
        <h2>📝 Publicaciones</h2>
        <p class="empty-message">Este usuarie no tiene publicaciones registradas.</p>
        </section>
    `;
    }

    const postsItems = posts.map(post => `
    <article class="post-item">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
    </article>
    `).join('');

    return `
    <section class="posts-section">
        <h2>📝 Publicaciones (${posts.length})</h2>
        <div class="posts-list">
        ${postsItems}
        </div>
    </section>
    `;
}

/**
 * TODO 2: Función principal que orquesta la carga de datos
 */
async function cargarDetalleUsuarie() {
  // 1. Obtenemos el ID de la URL
    const userId = obtenerIdDeLaURL();

  // Validación: ¿Qué pasa si el usuario entra a detalle.html sin ?id=...?
    if (!userId) {
    mostrarError('No se proporcionó ningún ID de usuarie en la URL. Debes acceder desde el directorio.');
    return;
    }

    mostrarCargando(true);

    try {
    // TODO 2.1: Realiza la petición fetch para obtener el usuarie individual:
    // URL: `${API_URL}/${userId}`
    // const resUser = await ...

    // TODO 2.2: Verifica si resUser.ok es true. Si no, lanza un error:
    // throw new Error(`Usuarie con ID ${userId} no encontrado`);

    // TODO 2.3: Parsea el JSON del usuarie
    // const usuarie = await ...

    // TODO 2.4: Realiza la petición fetch para obtener los posts de este usuarie:
    // URL: `${POSTS_URL}?userId=${userId}`
    // const resPosts = await ...
    // const posts = await resPosts.json();

    // TODO 2.5: Pinta en 'profileContainer' tanto el perfil como los posts
    // profileContainer.innerHTML = crearPerfilHTML(usuarie) + crearPostsHTML(posts);

    } catch (error) {
    console.error('Error al cargar detalle:', error);
    mostrarError(error.message || 'Error al comunicarse con el servidor.');
    } finally {
    mostrarCargando(false);
    }
}

// Inicialización
cargarDetalleUsuarie();
