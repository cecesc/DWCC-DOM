# Consola

[Teoría: consola](../Teoría/15-consola.md)

**Entorno:** consola de Node.js o herramientas de desarrollo del navegador; consulta las diferencias visuales de tu entorno.  
**Prerrequisitos:** [errores](14-errores.md).  
**Criterio de finalización:** cada actividad utiliza el método de consola solicitado y deja una evidencia observable, sin basar la corrección en un tiempo exacto ni en el estilo visual del entorno.

## Actividades

### 1. Tabla de catálogo

Crea una lista de tres objetos con `codigo`, `nombre` y `precio`; usa `console.table` para mostrarla. Los datos deben incluir `MAP/mapa/12`, `BRU/brújula/8` y `CUE/cuerda/5`.

**Comprueba:** se ve una tabla con tres filas de datos y las tres columnas indicadas. La apariencia puede variar entre Node y el navegador.

### 2. Secciones de un pedido

Usa `console.group("Pedido P-1")` y `console.groupEnd()` para agrupar dos mensajes: `Producto: mapa` y `Estado: pendiente`.

**Resultado esperado:** ambos mensajes quedan dentro del grupo identificado como `Pedido P-1`.

### 3. Subgrupo plegable

Dentro de un grupo `"Validación"`, crea con `console.groupCollapsed` un subgrupo llamado `"Detalles"` y escribe en él `Stock recibido: 3`. Ciérralo correctamente.

**Comprueba:** el grupo de detalles puede aparecer plegado según el entorno, pero el mensaje debe ser accesible al desplegarlo.

### 4. Medir un bloque, no un número fijo

Usa `console.time("suma")` y `console.timeEnd("suma")` para medir un bucle que sume los números del `1` al `10000`. Muestra también la suma.

**Resultado esperado:** la suma es `50005000`; aparece una medición identificada como `suma`.

**Límite:** no afirmes ni compruebes un número concreto de milisegundos: depende del equipo y del entorno.

### 5. Afirmaciones de inventario

Con `const stock = 2;`, usa `console.assert` para comprobar que el stock es positivo y para comprobar, de forma intencionalmente fallida, que es mayor que `5`, con el mensaje `"Stock insuficiente para lote"`.

**Resultado esperado:** la primera aserción no informa de fallo; la segunda informa un fallo o mensaje de aserción según el entorno.

### 6. Contar operaciones por etiqueta

Llama tres veces a `console.count("productos")`, una vez a `console.count("pedidos")`, reinicia `productos` con `console.countReset("productos")` y vuelve a contar `productos`.

**Resultado esperado:** las etiquetas mantienen contadores separados; después del reinicio, `productos` vuelve a empezar en `1`.

### 7. Rastro de una llamada

Crea una función `mostrarRuta` que llame a otra función `registrarRuta`; dentro de la segunda, ejecuta `console.trace("Ruta solicitada")`. Invoca `mostrarRuta`.

**Comprueba:** la salida contiene el mensaje `Ruta solicitada` y un rastro donde se reconozcan ambas funciones. Los nombres de archivos y las líneas exactas varían.

### 8. Diagnóstico breve

Para un pedido `{ codigo: "P-3", productos: 2, total: 17 }`, combina `console.group`, `console.log`, `console.table` y `console.assert` en un diagnóstico que agrupe el pedido, muestre sus datos en tabla y compruebe que `productos > 0`.

**Criterio verificable:** hay un grupo con el código, una tabla de una fila y ninguna aserción fallida.