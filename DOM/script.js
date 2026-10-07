//PARTE 1: SELECTORES

//Selecciono la img
const imagen= document.querySelector("img");
//Selecciono la btn
const btn= document.querySelector("button");

//PARTE 2: Listener (tipo click) del boton
btn.addEventListener("click", function (evento) {
    //PARTE 3: dentro del listener
    //modificar el archivo
    let source = imagen.getAttribute("src");
    console.log(source);

    if (source.includes("perro")) {
    imagen.setAttribute("src","gato.jpeg");
    }else{
    imagen.setAttribute("src","perro.jpeg");
    }
});



