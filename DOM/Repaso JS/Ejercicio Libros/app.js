"use strict";

/*
 * CATÁLOGO DE LIBROS — 32 TODOs, sin soluciones ocultas ni dependencias.
 * Lee en orden: teoría → objetivo → pista → comprobación.
 * Los return provisionales solo permiten cargar el archivo sin errores.
 * Sustitúyelos al resolver cada función: NO son implementaciones correctas.
 *
 * Bloque 1: datos y strings (01–10).
 * Bloque 2: objetos y arrays (11–20), practicables en consola.
 * Bloque 3: DOM y eventos (21–32).
 * Abre index.html y las herramientas de desarrollo del navegador.
 */

const librosIniciales = [
  {
    id: "1",
    titulo: "  JavaScript desde cero  ",
    autor: "Ana López",
    precio: 20,
    disponible: true,
    etiquetas: "javascript, fundamentos, web",
    detalles: { idioma: "español" },
  },
  {
    id: "2",
    titulo: "CSS moderno",
    autor: "Luis Pérez",
    precio: 25,
    disponible: false,
    etiquetas: "css, diseño, web",
  },
  {
    id: "3",
    titulo: "DOM en acción",
    autor: "Marta Ruiz",
    precio: 15,
    disponible: true,
    etiquetas: "javascript, dom, web",
  },
  {
    id: "4",
    titulo: "JavaScript avanzado",
    autor: "Ana López",
    precio: 30,
    disponible: true,
    etiquetas: "javascript, avanzado",
  },
];

// TODO 01 — Copiar un array con spread.
// TEORÍA: asignar un array a otra variable comparte su referencia. [...array]
// crea otro array, pero conserva las referencias de los objetos que contiene.
// OBJETIVO: sustituye [] por una copia superficial de librosIniciales.
// COMPRUEBA: libros !== librosIniciales, pero libros[0] === librosIniciales[0].

const libros = [...librosIniciales];
console.log(libros);
console.log(libros !== librosIniciales);
console.log(librosIniciales[0] === libros[0]);




// TODO 02 — Acceso a propiedades.
  // TEORÍA: objeto.precio usa una clave fija; objeto[variable] evalúa la variable.
  // OBJETIVO: devuelve la propiedad indicada por campo sin usar condicionales.
  // COMPRUEBA: leerCampo(librosIniciales[0], "precio") devuelve 20.
function leerCampo(libro, campo) {
  return libro[campo];
}
console.log(leerCampo(librosIniciales[0],"precio"));



function normalizarLibro(libro) {
  // TODO 03 — Desestructurar con alias y valores por defecto; trim.
  // TEORÍA: { propiedad: alias = valor } extrae y renombra una propiedad.
  // El valor por defecto se aplica a undefined, no a null ni a "".
  // OBJETIVO: extrae titulo como tituloOriginal, autor y etiquetas; extrae
  // editorial con "Desconocida" por defecto. Limpia título y autor con trim().
  // Los datos de entrada tienen etiquetas como string; esta función recibe
  // siempre datos sin normalizar, también cuando vienen del formulario.
  const {
    titulo: tituloOriginal,
    autor,
    etiquetas,
    editorial = "Desconocida"
  } = libro;

  const tituloLimpio = tituloOriginal.trim();
  const autorLimpio = autor.trim();

  // TODO 04 — Crear un slug con métodos de string.
  // TEORÍA: los strings son inmutables; los métodos devuelven nuevos strings.
  // OBJETIVO: título limpio → minúsculas → espacios sustituidos por guiones.
  // PISTA: encadena toLowerCase() y replaceAll(" ", "-"). No hace falta quitar
  // tildes ni tratar espacios interiores repetidos en este ejercicio.
  // COMPRUEBA: el primer libro produce "javascript-desde-cero".
  const slug = tituloLimpio.toLowerCase().replaceAll(" ", "-");

  

  // TODO 05 — Convertir un string en un array de etiquetas.
  // TEORÍA: split separa; map transforma; filter conserva o descarta elementos.
  // OBJETIVO: separa por comas, aplica trim y minúsculas a cada etiqueta,
  // y descarta etiquetas vacías. Conserva duplicadas si las hay.
  // COMPRUEBA: " JS, , DOM " se convierte en ["js", "dom"].
  console.log(etiquetas);
  const etiquetasArray = etiquetas
  .split(",") //["javascript"," fundamentos"," web"]
  .map(etiqueta => etiqueta.trim().toLowerCase())
  .filter(etiqueta => etiqueta !== "");
  console.log(etiquetasArray);
  

  // TODO 06 — Construir un objeto sin modificar el original.
  // TEORÍA: en { ...objeto, propiedad: nuevoValor }, la última propiedad gana.
  // OBJETIVO: devuelve una copia con titulo y autor limpios, etiquetas como
  // array, slug y editorial. Conserva id, precio, disponible y detalles.
  // COMPRUEBA: normalizarLibro(librosIniciales[0]) !== librosIniciales[0].
  return {
  ...libro,
  titulo: tituloLimpio,
  autor: autorLimpio,
  etiquetas: etiquetasArray,
  slug: slug,
  editorial: editorial 
  }
};
console.log(normalizarLibro(librosIniciales[0]));
console.log(normalizarLibro(librosIniciales[0]) !== librosIniciales[0]);
console.log(librosIniciales);



  // TODO 07 — Transformar una colección con map.
  // TEORÍA: map devuelve un array nuevo, con un resultado por elemento.
  // OBJETIVO: aplica normalizarLibro a cada libro y devuelve el nuevo array.
  // COMPRUEBA: prepararLibros(librosIniciales)[0].etiquetas es un array.
function prepararLibros(datos) {
  return datos.map(libro => normalizarLibro(libro));
  //OTRA FORMA
  //return datos.map(normalizarLibro);
}
console.log(prepararLibros(librosIniciales)[0]);



// TODO 08 — length y slice.
  // TEORÍA: length es una propiedad (sin paréntesis); slice(inicio, fin)
  // extrae hasta fin sin incluirlo. Para estos títulos no necesitamos tratar emojis.
  // OBJETIVO: si supera limite, devuelve los primeros limite caracteres + "…";
  // en caso contrario, devuelve el título completo. No alteres el string original.
  // COMPRUEBA: resumirTitulo("JavaScript", 4) devuelve "Java…".
function resumirTitulo(titulo, limite = 24) {
  if (titulo.length > limite) {
    titulo=titulo.slice(0, limite);
    titulo += "...";
    //OTRA OPCIÓN
    //return `${titulo.slice(0, limite)}...`;
    
  }
    return titulo;

  //OTRA OPCIÓN
    //return titulo.length >limite ? `${titulo.slice(0,limite)}...`: titulo;
}
console.log(resumirTitulo("JavaScript",11))



// TODO 09 — Encadenar split, filter, map, at, toUpperCase y join.
  // TEORÍA: at(0) obtiene el primer elemento; join es de ARRAYS, no de strings.
  // OBJETIVO: "  ana   lópez  " → "AL". Para "" devuelve "".
  // PISTA: limpia, separa por espacios, elimina partes vacías, transforma
  // cada palabra en su inicial mayúscula y une sin separador.
function obtenerIniciales(autor) {
  return autor
    .trim()
    .split(" ")
    .filter(palabra => palabra !== "")
    .map(palabra => palabra.at(0).toUpperCase())
    .join("");
}

console.log(obtenerIniciales(librosIniciales[1].autor));
console.log();




// TODO 10 — startsWith, endsWith e indexOf.
  // TEORÍA: includes responde sí/no; indexOf devuelve la posición o -1.
  // startsWith/endsWith comprueban prefijos/sufijos. Distinguen mayúsculas.
  // OBJETIVO: devuelve { empiezaPorJS, terminaEnPDF, posicionDOM } usando
  // una copia del texto sin espacios exteriores y en minúsculas. Comprueba
  // el prefijo "javascript", el sufijo ".pdf" y la posición de "dom".
  // COMPRUEBA: " JavaScript DOM.pdf " produce true, true y 11 respectivamente.
function analizarTexto(texto) {
  const textoLimpio =texto.trim().toLowerCase();
  return {
    empiezaPorJS: textoLimpio.startsWith("javascript"), 
    terminaEnPDF: textoLimpio.endsWith(".pdf"),
    posicionDOM: textoLimpio.indexOf("dom")
  };
}
console.log(analizarTexto("JavaScript DOM.pdf"));


// TODO 11 — Rest en objetos.
  // TEORÍA: { clave, ...resto } separa una propiedad y agrupa las demás.
  // Spread expande; rest recoge. delete, en cambio, modificaría el objeto destino.
  // OBJETIVO: devuelve otro objeto sin id, conservando el original intacto.
  // PISTA: extrae id y devuelve el resto. No uses delete sobre libro.
function quitarId(libro) {
  const {id, ...resto}= libro;
  return resto;
}


// TODO 12 — Object.keys, Object.values, Object.entries y Object.hasOwn.
  // TEORÍA: producen claves, valores y pares [clave, valor]; hasOwn comprueba
  // si una propiedad pertenece al propio objeto, aunque su valor sea undefined.
  // OBJETIVO: devuelve { claves, valores, entradas, tienePrecio }.
  // COMPRUEBA: para { precio: 0 }, obtienes ["precio"], [0], [["precio", 0]], true.
function inspeccionarObjeto(libro) {
    return { 
      claves: Object.keys(libro), 
      valores: Object.values(libro), 
      entradas: Object.entries(libro), 
      tienePrecio: Object.hasOwn(libro, "precio") 
    };
}
//Prueba
const libroDePrueba = { precio: 0 };
const resultado = inspeccionarObjeto(libroDePrueba);
console.log(resultado);



// TODO 13 — Acceso opcional ?. y valor alternativo ??.
  // TEORÍA: ?. evita fallar ante null/undefined; ?? usa el valor alternativo
  // solo ante null/undefined. || también reemplazaría 0, false y "".
  // OBJETIVO: lee detalles.idioma, o devuelve "Sin especificar" si falta.
  // COMPRUEBA: obtenerIdioma({}) no lanza errores; un idioma "" se conserva.
function obtenerIdioma(libro) {
  return libro?.detalles?.idioma ?? "Sin especificar";
}



// TODO 14 — Referencias y copia superficial.
  // OBJETIVO: copia libro con spread y devuelve { copia, esOtroObjeto,
  // comparteDetalles }. Compara con !== y ===, sin modificar nada.
  // COMPRUEBA con el primer libro: esOtroObjeto y comparteDetalles son true.
  // Una copia superficial NO independiza detalles. Para datos compatibles,
  // structuredClone hace copia profunda; no hace falta implementarla aquí.
function explorarCopia(libro) {
  const copia = { ...libro };
  return { 
    copia: copia, 
    esOtroObjeto: copia !== libro, 
    comparteDetalles: copia.detalles === libro.detalles
  };
}



// TODO 15 — Actualización inmutable con map y spread.
  // OBJETIVO: si nuevoPrecio es un número finito >= 0, devuelve un nuevo array
  // con una copia del libro indicado y su precio actualizado. Los demás libros
  // mantienen su referencia. Si el precio es inválido, devuelve datos sin cambios.
  // PISTA: Number.isFinite, map, comparación por id y spread de objeto.
  // COMPRUEBA: el precio del libro original nunca cambia; 0 es válido.
function cambiarPrecio(datos, id, nuevoPrecio) {
  if (!Number.isFinite(nuevoPrecio) || nuevoPrecio < 0) {
    return datos;
  }

  return datos.map(libro => {
    if (libro.id === id) {
      return { ...libro, precio: nuevoPrecio };
    }
    return libro;
  });
}



// TODO 16 — find frente a filter.
  // TEORÍA: find devuelve el PRIMER elemento coincidente o undefined;
  // filter devuelve un ARRAY con todas las coincidencias.
  // OBJETIVO: devuelve el libro con ese id. Los identificadores son strings.
function buscarPorId(datos, id) {
  return datos.find(libros => libros.id === id);
}



// TODO 17 — some y every.
  // TEORÍA: some pregunta "¿alguno?"; every pregunta "¿todos?".
  // OBJETIVO: devuelve { hayDisponibles, todosDisponibles }.
  // COMPRUEBA: para los datos iniciales, true y false.
  // En un array vacío: some da false y every da true. Compruébalo en consola.
function comprobarDisponibilidad(datos) {
  
  return { 
    hayDisponibles: datos.some(libro => libro.disponible), 
    todosDisponibles: datos.every(libro => libro.disponible)};
}



// TODO 18 — Ordenación sin mutar.
  // TEORÍA: sort modifica el array; toSorted devuelve uno nuevo. Sin comparador,
  // los números se ordenan como texto (10 aparece antes que 2).
  // OBJETIVO: "original" conserva el orden; "precio-asc" ordena por precio;
  // "titulo-asc" ordena alfabéticamente por título.
  // PISTA: toSorted((a, b) => ...); resta para números y localeCompare para texto.
  // Alternativa si tu navegador no tiene toSorted: copia con spread y usa sort.
  // COMPRUEBA: precios iniciales ordenados → [15, 20, 25, 30]; datos no cambia.
function ordenarLibros(datos, orden) {
  if (orden === "precio-asc") {
    return datos.toSorted((a, b) => a.precio - b.precio);
  } else if (orden === "titulo-asc") {
    return datos.toSorted((a, b) => a.titulo.trim().localeCompare(b.titulo.trim()));
  }
  return datos;
}



// TODO 19 — filter, includes y condiciones combinadas.
  // CONTRATO: filtros = { busqueda: string, soloDisponibles: boolean,
  // precioMaximo: string }. El precio llega como string desde el input.
  // OBJETIVO: busca por título O autor, sin mayúsculas ni espacios exteriores;
  // combina eso con disponibilidad Y precio máximo. "" significa sin límite.
  // PISTA: desestructura filtros y normaliza la búsqueda una sola vez.
  // No conviertas "" directamente: Number("") es 0. Un límite no vacío debe
  // ser finito y >= 0; si es inválido, devuelve [] para no mostrar datos engañosos.
  // COMPRUEBA: buscar " ANA " y máximo "25" deja solo el libro "1".
function filtrarLibros(datos, filtros) {
  const { busqueda, soloDisponibles, precioMaximo } = filtros;
  
  // Validación del precio máximo cuando no es un string vacío
  let maxPrecioNum = Infinity;
  if (precioMaximo !== "") {
    const parsed = Number(precioMaximo);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return []; // Límite inválido -> devuelve array vacío
    }
    maxPrecioNum = parsed;
  }

  const busquedaLimpia = busqueda.trim().toLowerCase();

  return datos.filter(libro => {
    // 1. Filtro por búsqueda (Título O Autor)
    const cumpleBusqueda = 
      libro.titulo.toLowerCase().includes(busquedaLimpia) || 
      libro.autor.toLowerCase().includes(busquedaLimpia);

    // 2. Filtro por disponibilidad (si soloDisponibles es true, libro.disponible debe ser true)
    const cumpleDisponibilidad = !soloDisponibles || libro.disponible;

    // 3. Filtro por precio máximo
    const cumpleprecio = libro.precio <= maxPrecioNum;

    return cumpleBusqueda && cumpleDisponibilidad && cumplePrecio;
  });
}



// TODO 20 — reduce y acumuladores.
  // TEORÍA: reduce combina elementos en un valor; proporciona un valor inicial
  // para que también funcione con []. Cada vuelta debe devolver el acumulador.
  // OBJETIVO: devuelve { cantidad, total, media }, con media 0 si no hay libros.
  // PISTA: suma los precios con reduce y usa length para la cantidad.
  // COMPRUEBA: datos iniciales → { cantidad: 4, total: 90, media: 22.5 }.
  // Aquí practicamos aritmética; en una app financiera real usaríamos céntimos.
function calcularResumen(datos) {
  const cantidad = datos.length;
  
  if (cantidad === 0) {
    return { cantidad: 0, total: 0, media: 0 };
  }

  const total = datos.reduce((acumulador, libro) => acumulador + libro.precio, 0);
  const media = total / cantidad;
  return { cantidad, total, media};
}



// Un selector resuelto sirve de ejemplo; completa el resto en el siguiente paso.
const elementos = {
  formulario: document.querySelector("#formulario-libro"),
  busqueda: null,
  precioMaximo: null,
  soloDisponibles: null,
  orden: null,
  catalogo: null,
  resumen: null,
  sinResultados: null,
  mensaje: null,
};



// TODO 21 — querySelector y referencias al DOM.
  // TEORÍA: querySelector devuelve el primer elemento coincidente o null.
  // OBJETIVO: sustituye los null de elementos por sus nodos. Puedes hacerlo
  // arriba o asignar aquí. Los id están en index.html; mensaje corresponde
  // a #mensaje-formulario. No necesitas seleccionar lo mismo en cada render.
  // COMPRUEBA: elementos.catalogo es un HTMLUListElement, no un string.
function conectarDOM() {
  elementos.busqueda = document.querySelector("#busqueda");
  elementos.precioMaximo = document.querySelector("#precio-maximo");
  elementos.soloDisponibles = document.querySelector("#solo-disponibles");
  elementos.orden = document.querySelector("#orden");
  elementos.catalogo = document.querySelector("#catalogo");
  elementos.resumen = document.querySelector("#resumen");
  elementos.sinResultados = document.querySelector("#sin-resultados");
  elementos.mensaje = document.querySelector("#mensaje-formulario")
}

function crearTarjeta(libro) {
  // TODO 22 — Crear elementos y separar datos de presentación.
  // OBJETIVO: desestructura el libro y crea un <li> con clase "tarjeta".
  // Crea un <h3>, párrafos y un botón usando document.createElement.
  // PISTA: classList.add y textContent. No uses innerHTML con datos de usuarios.

  // TODO 23 — Rellenar nodos, propiedades, dataset y append.
  // OBJETIVO: muestra título abreviado, autor con iniciales, precio, editorial,
  // idioma, disponibilidad, etiquetas unidas por " · ", slug y longitud del título.
  // PISTA: reutiliza resumirTitulo, obtenerIniciales, obtenerIdioma y join.
  // El botón tendrá texto "Eliminar", type="button" y dataset.id = id.
  // Usa append para introducir los nodos en el <li> y devuelve ese <li>.
  // COMPRUEBA: un título "<img src=x>" se muestra como texto, nunca como HTML.
  return null;
}

function renderizarLibros(datos) {
  // TODO 24 — Vaciar y reconstruir el listado; hidden y classList.
  // TEORÍA: replaceChildren() vacía un nodo; append acepta varios nodos.
  // OBJETIVO: crea tarjetas con map, reemplaza las anteriores y muestra
  // #sin-resultados solo si datos.length === 0. Usa hidden para ese mensaje.
  // PISTA: puedes pasar un array de nodos usando spread como argumentos.
  // Activa la clase "sin-libros" en el catálogo con classList.toggle(clase, condición).
  // COMPRUEBA: ejecutar dos veces el render no duplica tarjetas.
}

function renderizarResumen(datos) {
  // TODO 25 — Desestructuración y template literals en el DOM.
  // OBJETIVO: usa calcularResumen y muestra cantidad, total y media en #resumen.
  // PISTA: desestructura el resultado, usa `${expresion}` y toFixed(2) en importes.
  // toFixed devuelve un string: úsalo para presentar, no para seguir sumando.
}

function actualizarVista() {
  // TODO 26 — Conectar el flujo completo.
  // OBJETIVO: lee value de búsqueda/precio/orden y checked del checkbox;
  // construye filtros, filtra libros, ordena el resultado y pásalo a ambos renders.
  // TEORÍA: los inputs dan strings con value; checked proporciona un booleano.
  // Cada actualización parte de libros, no del último resultado filtrado.
}

function leerFormulario(formulario) {
  // TODO 27 — Leer campos de un formulario.
  // OBJETIVO: devuelve { titulo, autor, precio, etiquetas, disponible }.
  // PISTA: formulario.elements.namedItem("titulo").value; usa checked para
  // disponible. Conserva precio como STRING aquí para poder detectar el vacío.
  // No normalices etiquetas todavía: normalizarLibro lo hará tras validar.
  return {};
}

function validarLibro(datos) {
  // TODO 28 — Validar antes de guardar.
  // OBJETIVO: devuelve un mensaje si título/autor quedan vacíos al aplicar trim,
  // si el precio está vacío, no es finito o es negativo. Devuelve "" si todo vale.
  // PISTA: comprueba el string vacío ANTES de Number(datos.precio), después
  // usa Number.isFinite. No rechaces 0 por confundirlo con false.
  // COMPRUEBA: "", "   ", "hola", "Infinity" y "-1" no son precios válidos; "0" sí.
  return "Pendiente de implementar la validación.";
}

function registrarEventos() {
  // TODO 29 — input, change y click.
  // TEORÍA: addEventListener recibe una FUNCIÓN, no el resultado de ejecutarla.
  // OBJETIVO: búsqueda/precio escuchan input; checkbox/orden escuchan change.
  // Todos llaman a actualizarVista. El catálogo escucha click y llama a
  // manejarClickCatalogo. Registra los listeners una sola vez, no al renderizar.
  // El listener de submit ya está preparado al final como ejemplo.
}

function manejarEnvio(evento) {
  // TODO 30 — Añadir un libro sin mutar y comunicar el resultado.
  // OBJETIVO: lee y valida los datos. Si fallan, muestra el mensaje en
  // elementos.mensaje y termina sin guardar ni borrar los campos.
  // Si valen, construye un objeto con id = crypto.randomUUID(), precio numérico
  // y el resto de datos; normalízalo y añádelo creando otro array con spread.
  // Después: reset del formulario, mensaje de éxito y actualizarVista().
  // PISTA: evento.currentTarget es el formulario; la última propiedad prevalece
  // al combinar objetos. Mantén los filtros: el libro nuevo podría quedar oculto.
  // crypto.randomUUID requiere un navegador moderno y un contexto seguro;
  // si no está disponible al abrir el archivo, usa localhost (ver README).
}

function manejarClickCatalogo(evento) {
  // TODO 31 — Delegación de eventos, closest y filter.
  // TEORÍA: target es donde comenzó el click; currentTarget es el contenedor
  // que escucha. closest busca el propio nodo o su ancestro coincidente.
  // OBJETIVO: busca un button[data-id] desde evento.target; si no existe,
  // termina. Comprueba que pertenece al catálogo con contains antes de actuar.
  // Lee dataset.id, elimina ese libro con filter y llama a actualizarVista.
  // COMPRUEBA: pulsar el título no borra nada; eliminar funciona también
  // en tarjetas creadas después de registrar el listener.
}

function iniciar() {
  // TODO 32 — Arrancar, en orden.
  // OBJETIVO: conecta el DOM, normaliza el array de trabajo con prepararLibros,
  // registra los eventos y actualiza la vista. Hazlo una sola vez.
  // TEORÍA: defer en el <script> permite que el HTML exista al ejecutar este archivo.
  // COMPRUEBA: 4 tarjetas, total 90.00 y media 22.50 al recargar la página.
}

// Ejemplo resuelto de evento: evita la recarga incluso mientras faltan los TODOs.
// preventDefault cancela la acción del navegador, no detiene la propagación.
elementos.formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  manejarEnvio(evento);
});

iniciar();

/*
 * AUTOCOMPROBACIÓN OPCIONAL
 * Ejecuta comprobarEjercicio() en consola tras resolver los bloques 1 y 2.
 * Estos asserts expresan resultados esperados, no son la solución.
 * Que pasen NO comprueba el DOM: completa también la lista del README.
 */
function comprobarEjercicio() {
  const entradaAntes = JSON.stringify(librosIniciales);
  const datos = prepararLibros(librosIniciales);
  console.assert(datos !== librosIniciales, "07: map debe crear otro array");
  console.assert(datos[0] !== librosIniciales[0], "06: devuelve otro objeto");
  console.assert(datos[0].titulo === "JavaScript desde cero", "03: limpia el título");
  console.assert(datos[0].slug === "javascript-desde-cero", "04: revisa el slug");
  console.assert(Array.isArray(datos[0].etiquetas), "05: etiquetas debe ser un array");
  console.assert(normalizarLibro({ ...librosIniciales[0], etiquetas: " JS, , DOM " }).etiquetas.join("|") === "js|dom", "05: limpia etiquetas y descarta vacías");
  console.assert(resumirTitulo("JavaScript", 4) === "Java…", "08: revisa slice");
  console.assert(obtenerIniciales("  ana   lópez  ") === "AL", "09: revisa iniciales");
  console.assert(obtenerIniciales("") === "", "09: contempla el string vacío");
  console.assert(analizarTexto(" JavaScript DOM.pdf ").posicionDOM === 11, "10: revisa indexOf");
  console.assert(!Object.hasOwn(quitarId(datos[0]), "id"), "11: excluye id");
  console.assert(inspeccionarObjeto({ precio: 0 }).tienePrecio, "12: cero también es un precio");
  console.assert(obtenerIdioma({}) === "Sin especificar", "13: falta detalles");
  console.assert(obtenerIdioma({ detalles: { idioma: "" } }) === "", "13: ?? no reemplaza vacío");
  const copia = explorarCopia(datos[0]);
  console.assert(copia.esOtroObjeto && copia.comparteDetalles, "14: revisa referencias");
  const actualizados = cambiarPrecio(datos, "1", 0);
  console.assert(actualizados !== datos && actualizados[0].precio === 0 && datos[0].precio === 20, "15: actualiza sin mutar");
  console.assert(actualizados[1] === datos[1], "15: conserva los demás objetos");
  console.assert(cambiarPrecio(datos, "1", -1) === datos, "15: rechaza negativos");
  console.assert(buscarPorId(datos, "3")?.titulo === "DOM en acción", "16: revisa find");
  console.assert(buscarPorId(datos, "no-existe") === undefined, "16: id inexistente");
  console.assert(!comprobarDisponibilidad([]).hayDisponibles && comprobarDisponibilidad([]).todosDisponibles, "17: array vacío");
  const ordenAntes = datos.map((libro) => libro.id).join();
  console.assert(ordenarLibros(datos, "precio-asc").map((libro) => libro.precio).join() === "15,20,25,30", "18: comparador numérico");
  console.assert(datos.map((libro) => libro.id).join() === ordenAntes, "18: no ordenes el original");
  const visibles = filtrarLibros(datos, { busqueda: " ANA ", soloDisponibles: false, precioMaximo: "25" });
  console.assert(visibles.length === 1 && visibles[0].id === "1", "19: combina filtros");
  console.assert(filtrarLibros(datos, { busqueda: "", soloDisponibles: false, precioMaximo: "" }).length === 4, "19: vacío no significa cero");
  console.assert(calcularResumen(datos).total === 90 && calcularResumen(datos).media === 22.5, "20: suma y media");
  console.assert(calcularResumen([]).media === 0, "20: evita dividir entre cero");
  console.assert(JSON.stringify(librosIniciales) === entradaAntes, "No modifiques los datos iniciales");
  console.info("Fin de comprobaciones. Revisa los mensajes 'Assertion failed'; también faltan las pruebas visuales del README.");
}
