/* =========================================================================
   CONTADOR DE ETIQUETAS  —  ejercicio.js
   Solo se usan SELECTORES y MODIFICACIÓN DE CONTENIDO (nada de eventos ni
   de crear/eliminar elementos).
   Rellena cada TODO y comprueba el panel de "Estadísticas" en la página.
   ========================================================================= */

/* -------------------------------------------------------------------------
   BLOQUE A · Seleccionar y contar
   ------------------------------------------------------------------------- */

// TODO A1: guarda el <h1> con getElementById("titulo") y muestra su textContent por consola.
const titulo = document.getElementById("titulo");
console.log("A1 -> ", titulo.textContent);

   
// TODO A2: cuenta los <p> de la página con getElementsByTagName("p")
//          y escribe el número en #num-p.
document.getElementById("num-p").textContent = document.getElementsByTagName("p").length;

//OTRA OPCION
//const parrafos =document.getElementsByTagName("p");
//const estadisticasNumeroParrafos = document.getElementById("num-p");
//estadisticasNumeroParrafos.textContent=nParrafos.length;

// TODO A3: cuenta los <li> con getElementsByTagName("li") y escríbelo en #num-li.
document.getElementById("num-li").textContent= document.getElementsByTagName("li").length;

// TODO A4: cuenta los elementos con clase "card" usando getElementsByClassName
//          y escríbelo en #num-cards.
document.getElementById("num-cards").textContent = document.getElementsByClassName("card").length;

// TODO A5: cuenta todos los enlaces con querySelectorAll("a") -> #num-a,
//          y los que abren en pestaña nueva, querySelectorAll('a[target="_blank"]') -> #num-externos.
const nEnlaces =document.querySelectorAll("a");
const nEnlacesExternos =document.querySelectorAll('a[target="_blank"]');

const estadisticasNumeroEnlaces = document.getElementById("num-a");
const estadisticasNumeroEnlacesExternos = document.getElementById("num-externos");

estadisticasNumeroEnlaces.textContent=nEnlaces.length;
estadisticasNumeroEnlacesExternos.textContent=nEnlacesExternos.length;



// TODO A6: cuenta los elementos que hay dentro de <main> con querySelectorAll("main *")
//          y escríbelo en #num-total.
const nHijosDeMain = document.querySelectorAll("main *");
const estadisticasNumeroHijosMain = document.getElementById("num-total");
estadisticasNumeroHijosMain.textContent=nHijosDeMain.length;



// TODO A7: con querySelectorAll("main > h2") recorre los títulos de sección con forEach
//          y muestra cada textContent por consola.

const titulitos =document.querySelectorAll("main > h2");
console.log("TITULITOS");
titulitos.forEach(element => {
   console.log(element.textContent);
});


/* -------------------------------------------------------------------------
   BLOQUE B · Modificar el contenido
   ------------------------------------------------------------------------- */

// TODO B1: cambia el texto del título (#titulo) por "Estadísticas de la página" con textContent.

// TODO B2: escribe en #resumen, con innerHTML, algo como:
//          "Hay <strong>N</strong> elementos dentro de main", usando el número de A6.

// TODO B3: rellena #detalle con una lista de los títulos de sección, uno por línea,
//          usando innerHTML y el texto obtenido en A7.

// TODO B4: compara por consola textContent e innerText de #pie y explica la diferencia.
