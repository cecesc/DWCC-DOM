# Clases

[Ejercicios](../Ejercicios/13-clases.md)

**Prerrequisitos:** objetos, funciones y desestructuración (temas 08, 11–12). Una clase agrupa estado y comportamiento cuando esa unión protege invariantes. No conviertas automáticamente cada objeto de datos de una API en una instancia.

## Instancias, constructor y valores por defecto

```js
class Producto {
  constructor(nombre, precio = 0) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
      throw new TypeError("El nombre es obligatorio");
    }
    if (!Number.isFinite(precio) || precio < 0) {
      throw new RangeError("El precio debe ser un número no negativo");
    }
    this.nombre = nombre.trim();
    this.precio = precio;
  }

  etiqueta() {
    return `${this.nombre}: ${this.precio} €`;
  }
}

const mapa = new Producto("Mapa", 12);
console.log(mapa.etiqueta()); // Mapa: 12 €
console.log(mapa instanceof Producto); // true
```

`new` crea la instancia y llama al `constructor`. Una clase base sin constructor explícito recibe uno vacío; una subclase sin constructor explícito recibe uno que pasa sus argumentos a `super`. Los métodos se comparten a través del prototipo: no se copia `etiqueta` en cada objeto. No hay sobrecarga como en Java; el mismo nombre no admite varias implementaciones por firma.

## Campos privados, getters y setters

Un campo `#privado` solo es accesible dentro del cuerpo de la clase. Un getter se lee como propiedad; un setter permite comprobar una modificación antes de conservarla.

```js
class Contador {
  #valor;

  constructor(inicial = 0) {
    this.valor = inicial; // reutiliza la validación del setter
  }

  get valor() {
    return this.#valor;
  }

  set valor(nuevoValor) {
    if (!Number.isInteger(nuevoValor) || nuevoValor < 0) {
      throw new RangeError("El contador debe ser entero no negativo");
    }
    this.#valor = nuevoValor;
  }

  incrementar() {
    this.#valor++;
    return this.#valor;
  }
}

const intentos = new Contador();
console.log(intentos.incrementar(), intentos.valor); // 1 1
// intentos.#valor; // SyntaxError: el campo privado no se puede leer fuera
```

El invariante es `#valor` entero y no negativo; todas las vías públicas deben mantenerlo. Un getter no es necesariamente “gratis”: puede calcular, así que no lo uses para ocultar trabajo costoso.

## Miembros estáticos

Los campos y métodos `static` pertenecen a la clase, no a cada instancia.

```js
class Conversor {
  static IVA = 0.21;

  static conIva(base) {
    return base * (1 + Conversor.IVA);
  }
}
console.log(Conversor.conIva(100)); // 121
// new Conversor().conIva(100); // TypeError: no es método de instancia
```

## Herencia, `super` y sobrescritura

Extiende solo cuando la subclase realmente sea un tipo de la base y conserve sus invariantes. Una subclase con constructor debe llamar `super(...)` antes de usar `this`. Un método con el mismo nombre sobrescribe el heredado; `super.metodo()` permite reutilizarlo.

Este bloque continúa el ejemplo de `Producto` del inicio de la ficha: conserva esa clase antes de declarar la subclase. Las otras demostraciones (`Contador` y `Conversor`) son independientes.

```js
class ProductoDigital extends Producto {
  constructor(nombre, precio = 0, formato = "pdf") {
    super(nombre, precio);
    this.formato = formato;
  }

  etiqueta() {
    return `${super.etiqueta()} (${this.formato})`;
  }
}

const guia = new ProductoDigital("Guía", 5, "epub");
console.log(guia.etiqueta()); // Guía: 5 € (epub)
console.log(guia instanceof Producto, guia instanceof ProductoDigital); // true true
```

`extends` configura la cadena de prototipos, no convierte JavaScript en Java. Si solo necesitas reutilizar una función o guardar un dato, composición (una propiedad u objeto colaborador) suele ser más simple que herencia. Los errores usados aquí se desarrollan en el tema 14.