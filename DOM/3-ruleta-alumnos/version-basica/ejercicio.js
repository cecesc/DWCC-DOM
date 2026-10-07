/* =========================================================================
   RULETA DE CLASE — Versión Básica (Enfoque Imperativo / Estilo Java)
   ejercicio.js

   En esta versión usamos conceptos tradicionales de programación (bucles for,
   acumuladores de texto y arrays explícitos), ideales para quienes venís
   de trabajar con Java en 1º curso.
   ========================================================================= */

/* ------------------------------------------------------------------ Datos --
   Mantenemos 3 arrays para que el flujo sea directo y físico:
   1. `alumnos`: la lista maestra fija de la clase. NO se modifica nunca.
   2. `pendientes`: alumnos que aún pueden salir en esta ronda (se van quitando).
   3. `historial`: alumnos que ya han salido (se van añadiendo).
*/
const alumnos = [
  "Ana", "Bruno", "Carla", "Diego", "Elena",
  "Fran", "Gloria", "Hugo", "Irene", "Javier"
];

let pendientes = [];
let historial = [];

/* ----------------------------------------------------------------- Copia --
   TODO 1: Función para copiar los alumnos a `pendientes`.
   
   IMPORTANTE (Memoria y Referencias):
   En Java, si haces `listaB = listaA`, ambas variables apuntan a la misma lista
   en memoria. En JavaScript pasa exactamente lo mismo con los arrays.
   
   Por eso NO podemos hacer `pendientes = alumnos`.
   
   Crea una función llamada `copiarAlumnosAPendientes()` que:
   1. Vacíe `pendientes` asignándole un array nuevo: `pendientes = [];`
   2. Use un bucle `for` tradicional (de i = 0 hasta alumnos.length)
      para ir metiendo cada alumno en `pendientes` con `pendientes.push(...)`.
*/
function copiarAlumnosAPendientes() {
  // Escribe aquí tu código del TODO 1
  pendientes = [];
  for (let index = 0; index < alumnos.length; index++) {
   pendientes.push(alumnos[index]);
  }      
}


/* --------------------------------------------------------------- DOM --
   TODO 2: Guarda en constantes las referencias a los elementos del DOM.
   Usa `document.querySelector(...)`:
   - `#elegido`: el <span> donde se ve el nombre del alumno grande.
   - `#quedan`: el <span> del marcador con los que faltan.
   - `#total`: el <span> del marcador con el total de la clase.
   - `#historial`: la lista <ul> donde mostraremos los que han salido.
*/

const elegidoEl = document.querySelector("#elegido");
const quedanEl = document.querySelector("#quedan");
const totalEl = document.querySelector("#total");
const historialEl = document.querySelector("#historial");


/* ------------------------------------------------------------ Renderizado --
   TODO 3: Función `pintar()` para actualizar la pantalla.
   
   Esta función debe:
   1. Actualizar el texto de `quedanEl` con `pendientes.length`.
   2. Actualizar el texto de `totalEl` con `alumnos.length`.
   3. Construir el HTML de la lista de alumnos que ya han salido:
      - Crea una variable de texto acumuladora: `let lis = "";`
      - Con un bucle `for` clásico sobre el array `historial`, ve concatenando:
          lis = lis + "<li>" + historial[i] + "</li>";
      - Finalmente, mete ese resultado en el DOM:
          historialEl.innerHTML = lis;
*/
function pintar() {
 quedanEl.textContent = pendientes.length;
 totalEl.textContent = alumnos.length;

 let lis = "";
 for (let index = 0; index < historial.length; index++) {
   lis = lis + "<li>" + historial[index] + "</li>"
 }

historialEl.innerHTML = lis;
}


/* ----------------------------------------------------------------- Lógica --
   TODO 4: Función `elegirAlumno()`.
   
   Esta función debe:
   1. Si `pendientes.length === 0`:
      - La ronda ha terminado.
      - Vuelve a rellenar `pendientes` llamando a `copiarAlumnosAPendientes()`.
      - Vacía el array `historial`: `historial = [];`
   2. Calcular una posición aleatoria válida dentro de `pendientes`:
      - Usa `Math.floor(Math.random() * pendientes.length)`
   3. Extraer al alumno en esa posición con `pendientes.splice(indice, 1)[0]`.
      (Recuerda que `splice` quita el elemento del array y devuelve un array con lo quitado).
   4. Añadir ese alumno al final del array `historial` usando `historial.push(...)`.
   5. Devolver (return) el nombre del alumno elegido.
*/
function elegirAlumno() {
  
   if (pendientes.length === 0)
   {
    copiarAlumnosAPendientes();
    historial = [];  
   }

   const indice = Math.floor(Math.random() * pendientes.length);
   const elegido = pendientes.splice(indice, 1)[0];
   historial.push(elegido);

   return elegido;


}


/* --------------------------------------------------------------- Acciones --
   TODO 5: Función `girar()`.
   Es la acción que ocurre al pulsar el botón "Girar". Debe:
   1. Obtener el siguiente alumno llamando a `elegirAlumno()`.
   2. Mostrar su nombre en la pantalla: `elegidoEl.textContent = ...`
   3. Actualizar el resto de la pantalla llamando a `pintar()`.
*/
function girar() {
  elegidoEl.textContent = elegirAlumno();
  pintar();
}


/* TODO 6: Función `reiniciar()`.
   Es la acción que ocurre al pulsar el botón "Reiniciar". Debe:
   1. Volver a llenar `pendientes` con `copiarAlumnosAPendientes()`.
   2. Vaciar el array `historial`: `historial = [];`
   3. Restaurar el texto de `#elegido` a `"—"`.
   4. Actualizar la pantalla llamando a `pintar()`.
*/
function reiniciar() {
  copiarAlumnosAPendientes();
  historial = [];
  elegidoEl.textContent = "-";
  pintar();
}


/* ------------------------------------------------------- Conexión (dada) --
   Conectamos los botones a sus funciones.
*/
document.querySelector("#girar").addEventListener("click", girar);
document.querySelector("#reiniciar").addEventListener("click", reiniciar);

/* -------------------------------------------------------- Arranque inicial --
   Al cargar la página:
   1. Hacemos la primera copia de alumnos a pendientes.
   2. Pintamos el estado inicial en pantalla.
*/
copiarAlumnosAPendientes();
pintar();
