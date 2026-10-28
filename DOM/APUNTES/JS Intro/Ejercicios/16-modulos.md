# Módulos

[Teoría: módulos](../Teoría/16-modulos.md)

**Entorno:** Node.js con módulos ES configurados, o navegador servido por HTTP con `<script type="module">`; no abras el HTML directamente con `file://`.  
**Prerrequisitos:** [clases](13-clases.md), [errores](14-errores.md) y [consola](15-consola.md).  
**Criterio de finalización:** cada actividad se distribuye en los archivos indicados, importa solo lo exportado y produce el resultado esperado sin depender de red ni de paquetes externos.

## Actividades

### 1. Función con exportación nombrada

Crea `precio.js` que exporte con nombre una función `conIva(precio)` que calcule el 10 % adicional. Crea `principal.js` que la importe y muestre el resultado para `20`.

**Resultado esperado:** `22`.

**Comprueba:** el nombre importado coincide con el nombre exportado.

### 2. Constante de configuración

En `configuracion.js`, exporta con nombre la constante `MONEDA` con valor `"monedas"`. En `ticket.js`, impórtala y muestra `Total: 12 monedas` usando también una constante local `total = 12`.

**Resultado esperado:** `Total: 12 monedas`.

### 3. Exportación por defecto

Crea `formatear.js` cuya exportación por defecto sea una función que reciba un nombre y devuelva su versión en mayúsculas. Impórtala en `principal.js` bajo el nombre local `mayusculas` y úsala con `"mapa"`.

**Resultado esperado:** `MAPA`.

**Comprueba:** en la importación puedes elegir `mayusculas`, pero el módulo solo tiene una exportación por defecto.

### 4. Renombrar una exportación nombrada

En `catalogo.js`, exporta la constante nombrada `LIMITE_STOCK` con valor `5`. Impórtala en otro archivo usando el nombre local `minimoStock` y muestra dicho valor.

**Resultado esperado:** `5`.

**Límite:** no cambies el nombre con el que se exporta dentro de `catalogo.js`; usa un alias al importar.

### 5. Módulo de clase

Crea `producto.js` que exporte la clase `Producto`, con `nombre` y `precio` inicializados por constructor. Desde `principal.js`, importa la clase, crea `new Producto("cuerda", 5)` y muestra ambas propiedades.

**Resultado esperado:** `cuerda` y `5`.

### 6. Proyecto de tres módulos

Distribuye estas responsabilidades en `constantes.js`, `calculos.js` y `principal.js`: el primer archivo exporta `DESCUENTO = 0.2`; el segundo exporta una función que reciba precio y descuento y devuelva el precio rebajado; el tercero importa ambos y calcula el resultado para `50`.

**Resultado esperado:** `40`.

**Comprueba:** `calculos.js` no debe importar la constante si recibe el descuento como argumento; así se mantiene reutilizable.

### 7. Importación agregada con espacio de nombres

En un archivo `mensajes.js`, exporta dos funciones nombradas que devuelvan `"Pedido creado"` y `"Pedido cancelado"`. En `principal.js`, impórtalas como espacio de nombres y llama solo a la que crea el pedido.

**Resultado esperado:** `Pedido creado`.

**Límite:** accede a la función a través del objeto de espacio de nombres, no mediante una importación nombrada adicional.

### 8. Contraste con CommonJS y módulo integrado

En un archivo de texto aparte, compara estas dos formas de cargar el módulo integrado `node:path` en Node: importación ES y `require` de CommonJS. Indica qué sistema usa cada una y por qué no debes mezclar su sintaxis al azar en un mismo archivo.

Después crea **dos archivos separados**: uno ESM que importe `basename` desde `node:path` y otro CommonJS que obtenga la misma función con `require`. Haz que ambos muestren el nombre base de `"/tienda/mapa.json"`.

**Resultado esperado en ambos casos:** `mapa.json`.

**Comprueba:** no uses ningún paquete externo ni una URL; `node:path` lo proporciona Node.