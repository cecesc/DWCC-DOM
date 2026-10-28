# Almacenamiento en el navegador

[Teoría: almacenamiento](../Teoría/20-almacenamiento.md)

**Prerrequisitos:** temas 01–19. Haz las actividades en el mismo origen HTTP para poder observar el almacenamiento. No uses contraseñas, tokens ni datos reales en estos ejercicios.

## 1. Memoria, pestaña y persistencia

Crea tres botones que incrementen contadores separados: uno en una variable, otro en `sessionStorage` y otro en `localStorage`. Incluye un botón para recargar la página.

**Resultado esperado:** describe qué contador se reinicia al recargar, cuál sobrevive en la misma pestaña y cuál vuelve tras cerrar y abrir una pestaña del mismo origen. Prueba otro puerto y explica por qué no ve las mismas claves.

## 2. Una preferencia con una clave propia

Crea una casilla `Modo compacto`. Al cambiarla, guarda solo `"true"` o `"false"` bajo una clave con prefijo, por ejemplo `dwcc.ejercicio.modoCompacto`, y restaura el control al cargar.

**Resultado esperado:** la casilla conserva su estado tras recargar. Añade un botón `Restablecer preferencia` que use `removeItem` para esa clave, no `clear()`.

## 3. Lista serializada

Parte de `const favoritos = new Set([1, 3]);`. Diseña funciones pequeñas para guardar la lista de identificadores con `JSON.stringify([...favoritos])` y recuperarla como `Set`.

**Resultado esperado:** al recargar se recuperan los dos identificadores. Explica por qué serializar directamente el `Set` no conserva sus elementos.

## 4. Corrupción y contrato de lectura

En Herramientas de desarrollo, sustituye el valor guardado por `texto roto`; después por `[]`; y después por `[1, "dos"]`. Haz que la lectura use `try/catch` y compruebe que todos los identificadores son enteros positivos.

**Resultado esperado:** el texto roto y la lista mixta producen un mensaje de recuperación comprensible; `[]` es un estado válido de favoritos vacíos. La página sigue usable en todos los casos.

## 5. Fallo al guardar sin falso éxito

Separa una función de guardado de la actualización visual. Durante una prueba, simula que la función de guardado lanza un error (por ejemplo, con un interruptor de pruebas que solo exista en tu código local).

**Resultado esperado:** cuando falla, el mensaje dice que no se pudo guardar y el estado mostrado no confirma el cambio como persistido. Cuando el guardado funciona, el mensaje confirma el cambio real.

## 6. Cuota y seguridad

Consulta en el navegador qué sucede si `setItem` lanza una excepción; trata esa posibilidad en tu función de guardado. Añade junto a la interfaz una frase que indique que no se almacenan secretos.

**Resultado esperado:** distingues un problema de cuota o política de una lectura correcta y puedes explicar por qué cualquier script malicioso del mismo origen podría leer `localStorage`.
