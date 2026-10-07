/* =========================================================================
   RULETA DE CLASE  —  ejercicio.js
   Rellena los TODO. La solución completa está en ruleta.js.
   La conexión de los botones ya viene hecha: no hay que tocar eventos.
   ========================================================================= */

/* ------------------------------------------------------------------ Datos --
   La lista de la clase (no hay que modificarla).                            */
const alumnos = [
  "Ana", "Bruno", "Carla", "Diego", "Elena",
  "Fran", "Gloria", "Hugo", "Irene", "Javier"
];

/* TODO 1: crea el segundo array `pendientes` con los que aún pueden salir.
   Debe empezar siendo una COPIA de `alumnos`, no el mismo array.
   Pista: spread [...alumnos].       
   */
let pendientes = [...alumnos];


/* ------------------------------------------------------------------ Lógica -- */

/* TODO 2: escribe yaHanSalido() -> devuelve los nombres de `alumnos` que ya NO
   están en `pendientes`. Pista: alumnos.filter(...) con pendientes.includes(...). */
function yaHanSalido() {
   return alumnos.filter((nombre) => !pendientes.includes(nombre));
}

/* TODO 3: escribe elegirAlumno() -> devuelve un nombre al azar y lo elimina de
   `pendientes`, para que no vuelva a salir.
   Pistas: Math.random(), Math.floor(), splice(i, 1)[0].
   Si `pendientes` está vacío, vuelve a llenarlo desde `alumnos` (ronda nueva). */

   function elegirAlumno() {
      if (pendientes.length === 0) {
         pendientes = [...alumnos];
      }
      const indice = Math.floor(Math.random() * pendientes.length);
      return pendientes.splice(indice, 1)[0];
   }

/* --------------------------------------------------------------- DOM -- */

const elegidoEl = document.querySelector("#elegido");
const quedanEl = document.querySelector("#quedan");
const totalEl = document.querySelector("#total");
const historialEl = document.querySelector("#historial");

/* TODO 4: guarda con querySelector las referencias a #elegido, #quedan,
   #total y #historial. */

/* TODO 5: escribe pintar() -> muestra en #quedan y #total los números, y en
   #historial una lista <li> por cada nombre ya salido (usa innerHTML + map + join). */

function pintar() {
 quedanEl.textContent = pendientes.length;
 totalEl.textContent = alumnos.length;
 historialEl.innerHTML = yaHanSalido().map((nombre) =>`<li>${nombre}</li>`).join("");
}

/* TODO 6: escribe girar() -> pone el resultado de elegirAlumno() en #elegido
   y repinta con pintar(). */

function girar() {
  elegidoEl.textContent = elegirAlumno();
  pintar();
}

/* TODO 7: escribe reiniciar() -> vuelve a llenar `pendientes` desde `alumnos`,
   deja #elegido con "—" y repinta. */

function reiniciar()
{
  pendientes = [...alumnos];
  elegidoEl.textContent = "-";
  pintar();
}

/* ------------------------------------------------------- Conexión (dada) -- */
document.querySelector("#girar").addEventListener("click", girar);
document.querySelector("#reiniciar").addEventListener("click", reiniciar);

// Estado inicial de la página.
pintar();
