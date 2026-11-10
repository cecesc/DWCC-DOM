const productos = [
  {
    id: 1,
    nombre: "Portátil",
    categorias: ["Informática"],
    precio: 500.99,
    stock: 10,
  },
  {
    id: 2,
    nombre: "Teclado",
    categorias: ["Informática", "Accesorios"],
    precio: 52.5,
    stock:0,
  },
  {
    id: 3,
    nombre: "Play station",
    categorias: ["Entretenimiento"],
    precio: 500,
    stock: 4,
  },
  {
    id: 4,
    nombre: "Horno",
    categorias: ["Cocina", "Electrodoméstico"],
    precio: 2533.01,
    stock: 0,
  },
  {
    id: 5,
    nombre: "TouchPad",
    categorias: ["Accesorios"],
    precio: 20,
    stock: 0,
  },
];

for (let i = 0; index < array.length; index++) {
  const element = array[index];
  
}
//Funcion para recorrer la lista de productos
const mostrar = function (productos) {
  productos.forEach((producto) => {
    const { id, nombre, categorias, precio, stock } = producto;
    console.log(`ID: ${id}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Categorías: ${categorias}`);
    console.log(`Precio: ${precio}`);
    console.log(`Stock: ${stock}`);
    console.log(``);
  });
};

mostrar(productos);

//Funcion para encontrar el primer producto sin stock
const productoSinStock = (productos) => {
  // TAMBIEN: for (const {nombre, stock} of productos)
  for (const { nombre, stock } of productos) {
    if (stock === 0) {
      console.log(`Primer producto agotado es el ${nombre}`);
      break;
    }
  }
};

productoSinStock(productos);

const { nombre, categorias, precio, stock } = productos[0];
console.log(
  `El producto ${nombre} tiene las siguientes categorías ${categorias}, cuesta ${precio} € y su stock es de ${stock} unidades`,
);

const bocadilloAburrido = ["jamon", "queso"];
const bocadilloCompleto = [
  "lechuga",
  "cebolla",
  "esparragos",
  "tomate",
  ...bocadilloAburrido,
];
console.log(bocadilloAburrido);
console.log(bocadilloCompleto);

//Necesitamos crear una funcion aplicarDescuento(producto, porcentaje). Retornará un nuevo objeto (sin mutal el original) con el precio actualizado y una nueva propiedad enOferta:true

function aplicarDescuento(producto, porcentaje) {
  let obj = {
    ...producto,
    precio: producto.precio * (1 - porcentaje / 100),
    enOferta: true,
  };
  return obj;
}

let oferta = aplicarDescuento(productos[3], 25);
console.log(oferta);

//YA NO FUNCIONA PORQUE NO TIENE EL INCLUDES Y NO ADMITE ARRAYS[]
//Buscar productos por categoria (la que queraos) con filter() cuyo stock sea mayor que 0
const mostrarProductosPorCateria = (categoria) => {
  const productosFiltrados = productos.filter(
    (producto) => producto.categorias === categoria && producto.stock > 0,
  );
  console.log(productosFiltrados);

  if (productosFiltrados.length > 0) {
    for (const { nombre, precio, categorias } of productosFiltrados) {
      console.log(
        `Producto: ${nombre} - Precio: ${precio} - Categoria: ${categorias}`,
      );
    }
  } else {
    console.log(`No hay productos de la categoría ${categoria}`);
  }
};

mostrarProductosPorCateria("Informática");

// FILTRADO CON EL OPERADOR TERNARIO
//Posicion1 ? Posicion2 = Posicion3
//PredicadoLógico ? PredicadoLógico=TRUE : Predicado=FALSE

const mostrarProductosPorCateria2 = (categoria) => {
  const productosFiltrados = productos.filter(
    (producto) => producto.categorias.includes(categoria) && producto.stock > 0,
  );
  console.log(productosFiltrados);

  productosFiltrados.length > 0
    ? productosFiltrados.forEach((objeto) => {
        console.log(
          `Producto: ${objeto.nombre} - Precio: ${objeto.precio} - Categoria: ${objeto.categorias}`,
        );
      })
    : console.log(`No hay productos de la categoría ${categoria}`);

  //TAMBIEN SE PUEDE
  //productosFiltrados.length ? productosFiltrados.forEach(({ nombre, precio }) => console.log(`Producto: ${nombre} - Precio: ${precio}`), ) : console.log(`No hay productos de la categoría ${categoria}`);
};

mostrarProductosPorCateria2("Accesorios");

//Funcion con IVA usando el map()
const IdProducto = productos.map((producto) => producto.id);
console.log(IdProducto);

const productosConIva = productos.map((producto) => ({
    ...producto,
  precio: producto.precio * 1.21,
}));

console.log(productosConIva);

//Calcular cuanto se gastaría una persona com
const precioTienda = productos.reduce(
  (suma, producto) => suma + producto.precio * producto.stock,
    0,
);
console.log(precioTienda);

//const totalConDescuento=productos.filter().map().reduce()
const totalConDescuento = productos.filter((producto)=>producto.stock >0).map((producto) => producto.precio * 0.9).reduce((suma, precio)=> suma + precio,0)
//Paso 1: filtramos los productos que tengan stock -> filter()
const paso1 = productos.filter((producto) => producto.stock > 0);
console.log(paso1);

//Paso 2: le aplicamos un 10% a los productos -> map()
const paso2 = paso1.map((producto) => producto.precio * 0.9);
console.log(`Paso 2: ${paso2}`);

//Paso 3: calculamos cuanto costaría comprar 1 unidad de estos productos -> reduce()
const paso3 = paso2.reduce((suma, precio) => suma + precio, 0);
console.log(`Paso 3: ${paso3}`);
console.log(totalConDescuento)