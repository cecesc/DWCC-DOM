# Desestructuración y spread

[Teoría: desestructuración y spread](../Teoría/12-desestructuracion-spread.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [objetos](11-objetos.md).  
**Criterio de finalización:** cada extracción, alias o copia deja visibles los valores esperados sin modificar el dato original cuando se solicite una copia.

## Actividades

### 1. Extraer una ficha

Parte de `const producto = { nombre: "mapa", precio: 12, stock: 3 };`. Extrae `nombre` y `precio` mediante desestructuración de objeto y muéstralos.

**Resultado esperado:** `mapa` y `12`.

**Límite:** no leas después `producto.nombre` ni `producto.precio` para esas salidas.

### 2. Alias para un dato ambiguo

Con `const pedido = { codigo: "P-32", estado: "enviado" };`, extrae `codigo` bajo el nombre local `codigoPedido` y muéstralo junto a `estado`.

**Resultado esperado:** `P-32` y `enviado`.

**Comprueba:** el objeto sigue teniendo una propiedad llamada `codigo`, no `codigoPedido`.

### 3. Valor ausente por defecto

Parte de `const perfil = { nombre: "Ivo" };`. Desestructura `nivel` asignándole el valor por defecto `1` y muestra `nombre` y `nivel`.

**Resultado esperado:** `Ivo` y `1`. Repite con un objeto que incluya `nivel: 4`: debe prevalecer `4`.

### 4. Posiciones de una ruta

Con `const ruta = ["plaza", "puente", "torre"];`, extrae el primer y el tercer lugar mediante desestructuración de array. Muestra ambos.

**Resultado esperado:** `plaza` y `torre`.

**Pista:** deja una posición vacía en el patrón si no necesitas el segundo elemento.

### 5. Ficha anidada

Parte de:

```js
const pedido = {
  codigo: "P-45",
  destino: { ciudad: "Oviedo", zona: "centro" }
};
```

Extrae `codigo` y `ciudad` directamente con un patrón de desestructuración anidado. Muestra ambos.

**Resultado esperado:** `P-45` y `Oviedo`.

### 6. Ampliar una lista sin tocarla

Con `const base = ["mapa", "cuerda"];`, crea `inventario` usando spread para que añada `"linterna"` al final. Muestra ambas listas.

**Resultado esperado:** `base` sigue teniendo dos elementos; `inventario` contiene tres y termina en `linterna`.

### 7. Actualizar una propiedad al copiar

Parte de `const producto = { nombre: "brújula", precio: 8, stock: 2 };`. Crea una copia que conserve todas las propiedades y cambie solo `stock` a `0`. Muestra el stock original y el de la copia.

**Resultado esperado:** `2` y `0`.

**Comprueba:** coloca la propiedad actualizada después del spread para que gane ese valor.

### 8. Unir pedidos y separarlos

Con `const manana = ["P-1", "P-2"];` y `const tarde = ["P-3"];`, crea una lista `todos` con los tres códigos mediante spread. Después usa rest en una desestructuración para dejar `primero` con el primer código y `restantes` con los demás.

**Resultado esperado:** `primero` vale `P-1`; `restantes` contiene `P-2` y `P-3`.

**Límite:** no uses `concat`, `slice` ni índices para construir esas dos variables.