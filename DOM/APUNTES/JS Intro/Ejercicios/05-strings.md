# 05. Ejercicios de strings

[Teoría](../Teoría/05-strings.md)

**Preparación:** lee la teoría de este tema y trabaja con los conceptos de los temas anteriores.

**Entorno:** consola del navegador o un archivo `.js` ejecutado con Node. Resuelve cada actividad por separado; no necesitas HTML.

## 1. Saludo de un personaje
Declara `const personaje = "Nora"` y crea con un backtick un mensaje que diga `Nora ha entrado en la partida.`. Muéstralo con `console.log`.

**Resultado esperado:** una sola línea con `Nora ha entrado en la partida.`.

## 2. Ticket con interpolación
Una tienda vende una espada por `18` monedas y el jugador tiene `31`. Crea un string con interpolación que comunique cuántas monedas quedarán tras comprarla.

**Resultado esperado:** `Te quedan 13 monedas.`.

**Pista:** dentro de `${...}` puedes escribir una resta.


## 3. Mensaje con comillas y salto
Guarda en un solo string este aviso de dos líneas: primero `El vendedor dijo: "Vuelve pronto".` y después `La tienda cierra a las 20:00.`. Imprímelo.

**Resultado esperado:** las dos frases aparecen en líneas separadas y las comillas rodean `Vuelve pronto`.

**Pista:** usa una secuencia de escape para las comillas y `\n` para el salto de línea.


## 4. Nombre limpio para el marcador
Parte de `const entrada = "  lUnA  ";`. Sin modificar `entrada`, crea una nueva constante que contenga `LUNA` y muéstrala.

**Resultado esperado:** `LUNA`.

**Pista:** primero elimina los espacios exteriores y después cambia el caso.


## 5. Inspeccionar un código de misión
Con `const codigo = "MIS-204"`, muestra en líneas distintas su longitud, el primer carácter y el último carácter.

**Resultado esperado:** `7`, `M` y `4`.

**Pista:** el último índice se calcula con `codigo.length - 1`.


## 6. Validar un nombre de archivo
Con `const archivo = "mapa-secreto.JSON"`, comprueba si termina en `.json` sin importar cómo escribió el usuario las mayúsculas. Muestra solo el booleano.

**Resultado esperado:** `true`.

**Pista:** normaliza el texto con `toLowerCase()` antes de usar `endsWith()`.


## 7. Recortar una etiqueta
Con `const etiqueta = "OFERTA-ESPADA"`, extrae solamente `ESPADA` usando `slice()` e imprímelo.

**Resultado esperado:** `ESPADA`.

**Pista:** cuenta desde cero y recuerda que el límite final no se incluye.


## 8. Corregir el inventario
Parte de `const inventario = "gema rota, gema rota, llave"`. Crea e imprime un nuevo texto donde todas las apariciones de `gema rota` sean `gema pulida`.

**Resultado esperado:** `gema pulida, gema pulida, llave`.

**Pista:** el método que sustituye todas las coincidencias tiene `All` en su nombre.


## 9. Convertir una ruta en lista
Con `const ruta = "bosque>cueva>torre"`, separa las zonas y muestra la segunda zona. Después muestra la ruta otra vez, pero unida con ` → ` entre las zonas.

**Resultado esperado:** primero `cueva`; después `bosque → cueva → torre`.

**Pista:** `split(">")` produce un array y los arrays empiezan en el índice `0`.


## 10. Cartel de victoria
Con `const nombre = "  victoria  "`, crea un cartel que muestre `*** VICTORIA ***`. Debe usar `trim()`, `toUpperCase()` y `repeat()`.

**Resultado esperado:** `*** VICTORIA ***`.

**Pista:** puedes repetir `"*"` tres veces y usar un backtick para colocar el nombre entre ambos grupos.

---

**Criterio de finalización:** comprueba los resultados pedidos y explica las decisiones o errores que señale cada enunciado. No basta con copiar una salida fija cuando se pide calcularla.
