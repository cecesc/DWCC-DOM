# 04. Ejercicios de operadores

[Teoría](../Teoría/04-operadores.md)

**Preparación:** lee la teoría de este tema y trabaja con los conceptos de los temas anteriores.

**Entorno:** consola del navegador o un archivo `.js` ejecutado con Node. Resuelve cada actividad por separado; no necesitas HTML.

## 1. Monedas de una misión

Declara `monedasIniciales` con `25` y `recompensa` con `18`. Calcula en `monedasTotales` la suma y muestra ese valor con `console.log`. Debe aparecer `43`.

## 2. Precio de un lote

Una tienda vende 4 pociones a 7 monedas cada una. Declara variables para cantidad y precio unitario, calcula el coste total con `*` y muéstralo. El resultado comprobable es `28`.

## 3. Reparto con sobrante

Reparte `29` gemas entre `5` jugadores. Muestra solo el resto usando `%`. El resultado debe ser `4`. Escribe un comentario que aclare qué representa ese resto.

## 4. Potencia de mejora

Declara `baseDeDanio` con `2` y `nivelDeMejora` con `5`. Usa `**` para obtener el daño multiplicado por sí mismo según el nivel y muestra `32`.

## 5. Descuento bien agrupado

Hay 3 camisetas de 20 monedas y un descuento del 25 %. Declara los datos y calcula el precio después de aplicar el descuento al lote completo.

**Comprueba:** debes obtener `45`. **Pista:** pagar con un descuento del 25 % equivale a pagar el 75 % del subtotal.

## 6. Marcador que cambia

Crea `let puntos = 10`. Suma 5 con `+=`, duplica el resultado con `*=`, resta 4 con `-=` y muestra el valor final. Debe ser `26`.

## 7. Acceso a la arena

Declara `nivel` con `7` y `tieneEntrada` con `true`. Muestra si puede entrar alguien que tenga entrada **y** nivel al menos 5. Usa `&&` y una comparación de orden; el resultado debe ser `true`. Prueba también con nivel `4` y con `tieneEntrada` igual a `false`: en ambos casos debe denegarse el acceso.

## 8. Código escrito

Declara `codigoEscrito` con la cadena `"12"`. Muestra primero el resultado de compararlo con el número `12` usando `==` y luego usando `===`. Observa `true` y `false`; añade un comentario indicando cuál usarías en código nuevo.

## 9. Nombre opcional

Declara `nombreJugador` con `null` y crea `nombreVisible` con `??` para que sea `"Invitado"` cuando no haya nombre. Muéstralo: debe aparecer `Invitado`. Después prueba con una cadena no vacía y comprueba que se conserva.

## 10. Mensaje de envío

Declara `totalCompra` con `35`. Usa un ternario para guardar en `mensajeEnvio` `"Envío gratis"` si el total es al menos 40 y `"Faltan monedas para envío gratis"` en caso contrario. Muestra el mensaje esperado para 35.

---

**Criterio de finalización:** comprueba los resultados pedidos y explica las decisiones o errores que señale cada enunciado. No basta con copiar una salida fija cuando se pide calcularla.
