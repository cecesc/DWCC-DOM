fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(responde => responde.json())
    .then(json =>console.log(json))
    .catch((error) => console.error(error));


/* 
function lavarPlatos(funcioncita) {
    console.log("Comenzando a lavar los platos..");
    setTimeout(() => {
        console.log("Platos lavados");
        funcioncita();
    }, 2000);
}


function secarPlatos(funcioncita) {
console.log("Comenzando a secar los platos...");
setTimeout(() => {
console.log("Platos secos!");
funcioncita();
}, 1500);
}

function guardarPlatos(funcioncita) {
console.log("Guardando los platos...");
setTimeout(() => {
console.log("Platos guardados!");
funcioncita();
}, 1000);
}




lavarPlatos(() => {
secarPlatos(() => {
guardarPlatos(() => {
console.log("¡Todos los platos están listos!");
});
});
}); */

function jugarLoteria() {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            const exito = Math.random()>0.9;
            if (exito){
                resolve("Me tocó la lotería");
            } else{
                reject("No tuve suerte");
            }
        }, 1000);
    });
}

jugarLoteria()
    .then((res)=> console.log("resultado"))
    .catch((error)=> console.log(error));




function lavarPlatos() {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve("Platos lavados!");
        }, 3000);
    });
}

function secarPlatos() {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve("¡Secando platos!");
        }, 2200);
    });
}

function guardarPlatos() {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve("¡Guardando platos!");
        }, 2200);
    });
}

// Uso con promesas - más limpio que callbacks
/* lavarPlatos()
    .then((resultado) => {
    console.log(resultado);
    return secarPlatos();
    })
    .then((resultado) => {
    console.log(resultado);
    return guardarPlatos();
    })
    .then((resultado) => {
    console.log(resultado);
    console.log("¡Todas las tareas realizadas!");
    })
    .catch((error) => {
    console.error("Error en la realización:", error);
    });
 */




// FORMA CON Async/Await
async function recogerLosPlatos() {
    try {
        const platosLavados =await lavarPlatos();
        console.log(platosLavados);
        
        const platosSecos =await secarPlatos();
        console.log(platosSecos);
        
        const platosGuardados =await guardarPlatos();
        console.log(platosGuardados);
        return "Todas las tareas han sido REALIZADAS";
    } catch (error) {
        console.error("Error en la preparación:", error);
    throw error;
    }
    

}

recogerLosPlatos().then((resultado)=> console.log(resultado)).catch((error)=> console.error(error));

