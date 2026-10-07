/* =========================================================================
   REPASO DE MANIPULACIÓN DEL DOM  —  ejercicio.js
   Rellena cada apartado. La solución está en solucion.js.
   Abre la página y usa la Consola para comprobar cada resultado.
   ========================================================================= */

/* -------------------------------------------------------------------------
   BLOQUE 1 · Selección de elementos
   1.1  getElementById("titulo")
   1.2  getElementsByClassName("item")   -> length
   1.3  getElementsByTagName("li")       -> recorre con for...of y muestra textContent
   1.4  querySelector(".item") y querySelector("a[href]")
   1.5  querySelectorAll(".item")        -> recorre con forEach
   ------------------------------------------------------------------------- */

// TODO 1.1: guarda el <h1> en una constante y muestra su textContent por consola.
const titulo = document.getElementById("titulo");
console.log("1.1", titulo.textContent);

// TODO 1.2: obtén la colección de elementos con clase "item" y su número.
const items = document.getElementsByClassName("item");
console.log("1.2", items.length);

// TODO 1.3: obtén todos los <li> y muestra el texto de cada uno con for...of.
const elementosLi = document.getElementsByTagName("li");

for (const li of elementosLi) {
  console.log("1.3", li.textContent);
}

// TODO 1.4: selecciona el primer ".item" y el enlace con href; muestra sus datos.
const primerItem = document.querySelector(".item");
const enlace = document.querySelector("a[href]");

console.log("1.4", primerItem.textContent, enlace.getAttribute("href"));

// TODO 1.5: obtén una NodeList de ".item" y recórrela con forEach mostrando el índice.
const listaItems = document.querySelectorAll(".item");
console.log("1.5");

listaItems.forEach((item, indice) => {
  console.log(indice, item.textContent);
});
/* -------------------------------------------------------------------------
   BLOQUE 2 · Modificación de contenido
   2.1  textContent (leer y escribir) sobre #resumen
   2.2  innerHTML sobre #contenedor (con aviso XSS)
   2.3  Comparar textContent e innerText sobre #parrafo-mixto
   ------------------------------------------------------------------------- */

// TODO 2.1: escribe en #resumen un texto seguro con el número de objetos iniciales.
const resumen = document.querySelector("#resumen");
resumen.textContent = items.length;

// TODO 2.2: inserta HTML en #contenedor con innerHTML.
const contenedor = document.getElementById("contenedor");
contenedor.innerHTML = `<p>Contenido insertado con <strong>innerHTML</strong></p>`;

// TODO 2.3: muestra por consola `textContent` e `innerText` de #parrafo-mixto y explica la diferencia.
const mixto = document.getElementById("parrafo-mixto");

console.log("2.3 -> textContent:", mixto.textContent);
console.log("2.3 -> innerText:", mixto.innerText);

/* -------------------------------------------------------------------------
   BLOQUE 3 · Manipulación de atributos
   3.1  getAttribute("data-peso") del primer item
   3.2  setAttribute("src"/"alt"/"data-peso") en #logo
   3.3  removeAttribute("disabled") en #fragil
   3.4  hasAttribute para comprobar el resultado
   ------------------------------------------------------------------------- */

// TODO 3.1: lee y muestra el atributo data-peso del primer item.
const primero = document.querySelector(".item");
const dataPeso = primero.getAttribute("data-peso");
console.log("3.1 ", dataPeso);

// TODO 3.2: asígnale a #logo un src válido y un alt descriptivo.
const logo = document.getElementById("logo");

logo.setAttribute("src", "idea.png");
logo.setAttribute("alt", "Logo de una idea");
logo.setAttribute("data-peso", -10);

// TODO 3.3: habilita la casilla #fragil quitándole el atributo disabled.
const fragil = document.getElementById("fragil");
fragil.removeAttribute("disabled");

// TODO 3.4: comprueba con hasAttribute que ya no está deshabilitada.
console.log("3.4 ", fragil.hasAttribute("disabled"));

/* -------------------------------------------------------------------------
   BLOQUE 4 · Manipulación de clases CSS
   4.1  classList.add    4.2 classList.remove
   4.3  classList.toggle 4.4 classList.contains
   4.5  classList.replace
   ------------------------------------------------------------------------- */

// TODO 4.1: añade las clases "activo" y "destacado" al primer item.
primero.classList.add("activo", "destacado");

// TODO 4.2: elimina la clase "destacado" de ese mismo item.
primero.classList.remove("destacado");

// TODO 4.3: alterna ("toggle") la clase "activo" en el primer item.
primero.classList.toggle("activo");

// TODO 4.4: comprueba con contains si queda "activo".
console.log(primero.classList.contains("activo"));

// TODO 4.5: reemplaza temporalmente "item" por "item-especial" y vuelve a dejarlo como estaba.
primero.classList.replace("item", "item-especial");
primero.classList.replace("item-especial", "item");

/* -------------------------------------------------------------------------
   BLOQUE 5 · Creación y eliminación de elementos
   5.1 createElement + appendChild
   5.2 insertBefore (al principio de #objetos)
   5.3 removeChild
   5.4 remove()
   5.5 cloneNode(true)
   ------------------------------------------------------------------------- */

const lista = document.getElementById("objetos");
// TODO 5.1: crea un <li class="item"> con texto "Cuerda" y añádelo al final de #objetos.

//Opción 1 -> createElement

const cuerda = document.createElement("li");
cuerda.classList.add("item");
cuerda.textContent = "Cuerda";
lista.appendChild(cuerda);

//Opción 2 -> innerHTML
//lista.innerHTML += `<li class="item">Cuerda</li>`;

// TODO 5.2: crea otro <li> con texto "Antorcha" e insértalo antes del primer hijo.
const antorcha = document.createElement("li");
antorcha.classList.add("item");
antorcha.textContent = "Antorcha";
lista.insertBefore(antorcha, lista.firstChild);

// TODO 5.3: elimina "Cuerda" usando removeChild desde su padre.
lista.removeChild(cuerda);

// TODO 5.4: añade un <li> temporal y elimínalo con su propio método remove().
const temporal = document.createElement("li");
temporal.classList.add("item");
temporal.textContent = "Temporal";
lista.appendChild(temporal);
temporal.remove();

// TODO 5.5: clona el primer item (con hijos) y añade la copia a #contenedor.
const copia = primerItem.cloneNode(true);
contenedor.appendChild(copia);

/* -------------------------------------------------------------------------
   BLOQUE 6 · Navegación por el DOM
   6.1 parentElement     
   6.2 children        
   6.3 childNodes
   6.4 firstElementChild / lastElementChild
   6.5 nextElementSibling / previousElementSibling
   ------------------------------------------------------------------------- */

// TODO 6.1: muestra el id del padre del primer item.
const primerElemento = objetos.firstElementChild;
console.log("6.1 Padre:", primerElemento.parentElement.id);

// TODO 6.2: muestra cuántos elementos hijos tiene #objetos.
console.log("6.2 Número de elementos hijos:", objetos.children.length);

// TODO 6.3: muestra cuántos nodos hijos tiene (incluye nodos de texto) y explica la diferencia.
console.log("6.3 Número de nodos hijos:", objetos.childNodes.length);
//children cuenta únicamente elementos HTML, mientras que childNodes también incluye nodos de texto, comentarios, etc.


// TODO 6.4: muestra el texto del primer y del último elemento hijo.
console.log("6.4 Primer elemento:",objetos.firstElementChild.textContent);
console.log("6.4 Último elemento:", objetos.lastElementChild.textContent);


// TODO 6.5: partiendo del segundo hijo, muestra su hermano siguiente y el anterior.
const segundoHijo = objetos.children[1];

console.log("6.5 Hermano siguiente:", segundoHijo.nextElementSibling.textContent);
console.log("6.5 Hermano anterior:", segundoHijo.previousElementSibling.textContent);
/* -------------------------------------------------------------------------
   BLOQUE 7 · Eventos
   7.1 addEventListener   7.2 removeEventListener   7.3 objeto event
   7.4 preventDefault     7.5 stopPropagation      7.6 eventos comunes
   ------------------------------------------------------------------------- */

// TODO 7.0: define la función actualizarResumen() que escriba en #resumen el número
//           actual de ".item" de la lista.

// TODO 7.1: al enviar #formulario, evita el envío por defecto, crea un <li> con el valor
//           del input, lo añade a la lista, limpia el input y actualiza el resumen.

// TODO 7.2: crea una función NOMBRADA que alterne la clase "destacado" en todos los
//           items y conéctala al botón #alternar. Luego quítala con removeEventListener
//           desde #quitar-manejador (misma referencia).

// TODO 7.3: conecta #vaciar para dejar la lista sin hijos usando removeChild y actualiza el resumen.

// TODO 7.4: en el botón #btn-burbuja usa stopPropagation para que solo se ejecute su manejador
//           y no el de #caja-evento.

// TODO 7.5: muestra en consola información del objeto event (target, clientX, clientY) en algún clic.

// TODO 7.6: añade a #nombre los eventos input, focus, blur y keydown (Escape limpia el campo).
