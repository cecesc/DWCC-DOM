const productos =[
    {id: 1, nombre: "Portátil", categorias:["Informática"], precio:500.99, stock:10},
    {id: 2, nombre: "Teclado", categorias:["Informática"], precio:52.5, stock:6},
    {id: 3, nombre: "Play station", categorias:["Entretenimiento", "Electronica"], precio:500, stock:4},
    {id: 4, nombre: "Horno", categorias:["Cocina", "Electrodomestico"], precio:2533.01, stock:0},
    {id: 5, nombre: "TouchPad", categorias:["Accesorios"], precio:20, stock:5}
];

//Funcion para recorrer la lista de productos
const mostrar= function(productos){
    productos.forEach(producto => {
        const {id,nombre, categorias, precio, stock}= producto;
        console.log(`ID: ${id}`);
        console.log(`Nombre: ${nombre}`);
        console.log(`Categorías: ${categorias}`);
        console.log(`Precio: ${precio}`);
        console.log(`Stock: ${stock}`);
        console.log(``);
        
    //TAMBIEN SE PUEDE HACER
    //
        
    });
}



//Funcion para encontrar el primer producto sin stock
const productoSinStock = (productos) => {
    // TAMBIEN: for (const {nombre, stock} of productos)
    for (const { nombre, stock } of productos) {
        if (stock === 0) {
        console.log(`Primer producto agotado es el ${nombre}`)
        break;
        }

    }   
};




const {nombre, categorias, precio, stock} = productos[0];
console.log(`El producto ${nombre} tiene las siguientes categorías ${categorias}, cuesta ${precio} € y su stock es de ${stock} unidades`);

const bocadilloAburrido = ["jamon", "queso"];
const bocadilloCompleto = [ "lechuga", "cebolla", "esparragos", "tomate", ...bocadilloAburrido];
console.log(bocadilloAburrido);
console.log(bocadilloCompleto);



//Necesitamos crear una funcion aplicarDescuento(producto, porcentaje). Retornará un nuevo objeto (sin mutal el original) con el precio actualizado y una nueva propiedad enOferta:true

function aplicarDescuento(producto, porcentaje) {
    let obj = {
        ...producto,
        precio:producto.precio * (1 - porcentaje / 100),
        enOferta: true,
    };
    return obj;
}

let oferta=aplicarDescuento(productos[3],25);
console.log(oferta);

mostrar(productos)
productoSinStock(productos)


//Buscar productos por categoria (la que queraos) con filter() cuyo stock sea mayor que 0
const mostrarProductosPorCateria = categoria =>
    for (const {nombre, categoria, stock} of productos) {
        if (stock >0 && categoria== "Accesorios") {
            const productosFiltrados = productos.filter((p) => (p.categoria))
            console.log(`Producto: ${nombre} - ${precio}`);
            
        }
    }