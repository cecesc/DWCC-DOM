# Instalar Node.js en macOS

[Introducción](../Teoría/00-introduccion.md) · [Instalación en Linux](instalar-node-linux.md)

**Objetivo:** disponer de Node y npm y ejecutar un archivo JavaScript desde Terminal. No necesitas Xcode completo ni un proyecto web para empezar.

**Elección recomendada para empezar:** el instalador oficial de una versión **LTS** soportada. Si ya gestionas tus herramientas con Homebrew, puedes usar la alternativa de esta guía. **Elige un método, no ejecutes ambos.**

## 1. Comprobar el equipo y la instalación actual

Abre **Terminal**, disponible en Aplicaciones → Utilidades, y ejecuta cada comando por separado:

```bash
node --version
npm --version
command -v node
command -v npm
uname -m
```

Si Node y npm ya muestran versiones compatibles con el curso, no necesitas reinstalarlos. `command -v` indica qué ejecutable utiliza esa terminal. Si no están instalados, es normal ver `command not found` en los comandos de versión.

Para elegir descargas por arquitectura:

- `arm64` corresponde a una sesión nativa en un Mac con Apple Silicon (familias M).
- `x86_64` corresponde a Intel o a una sesión traducida mediante Rosetta.

Confirma el chip en **Acerca de este Mac**. En Apple Silicon, usa una terminal nativa para no mezclar herramientas Intel y ARM sin necesidad. Comprueba en la descarga oficial que la versión de Node admite tu versión de macOS.

## 2. Instalar desde la web oficial

1. Abre [la página de descargas de Node.js](https://nodejs.org/en/download).
2. Elige una versión marcada como **LTS**, selecciona macOS y busca el instalador **`.pkg`**. Si la página ofrece elegir arquitectura, selecciona la correspondiente a tu equipo; un instalador universal puede no exigir esa elección.
3. Descarga el paquete desde `nodejs.org`, ábrelo y sigue el asistente. Revisa el destino y confirma los permisos que solicite macOS. Si el equipo está gestionado por el centro, puede ser necesaria la intervención del administrador.
4. El instalador de Node incluye npm; no necesitas descargarlo por separado.
5. Cierra la terminal anterior y abre una nueva antes de verificar.

LTS significa soporte a largo plazo. No se fija aquí un número porque la versión recomendada cambia; el proyecto puede exigir una versión concreta compatible. No descargues un instalador desde una web de terceros para resolver un error de compatibilidad.

## 3. Alternativa: Homebrew

Usa esta vía si prefieres administrar Node con Homebrew, **en lugar del instalador `.pkg`**.

1. Comprueba si Homebrew está disponible:

   ```bash
   brew --version
   ```

2. Si falta, sigue la [instalación oficial de Homebrew](https://brew.sh/) y sus [requisitos](https://docs.brew.sh/Installation). Puede requerir las Command Line Tools de Xcode. Completa también los pasos de configuración del shell que muestre el instalador y abre una nueva terminal; instalar Homebrew sin configurar su `PATH` no basta.
3. Actualiza el catálogo y, si termina correctamente, instala Node:

   ```bash
   brew update
   brew install node
   ```

No uses `sudo brew install`. La fórmula `node` instala Node y npm, pero **no garantiza la rama LTS**: consulta la [fórmula actual](https://formulae.brew.sh/formula/node) antes de elegirla. Si el curso exige una LTS concreta, prefiere el instalador oficial correspondiente o un gestor de versiones, no una instalación adicional que compita en el `PATH`.

La ubicación habitual de Homebrew es `/opt/homebrew` en Apple Silicon y `/usr/local` en Intel. Sigue las instrucciones que imprima tu instalación; no copies una ruta de otro equipo a ciegas.

## 4. Verificar Node y npm

En una terminal nueva:

```bash
node --version
npm --version
node -e 'console.log("Node listo")'
```

Resultado esperado: una versión de Node, otra de npm y `Node listo`. Consulta también `command -v node` y `command -v npm` si el resultado no corresponde al método elegido.

Esta comprobación acredita que el entorno ejecuta JavaScript. Antes de instalar Vite u otra herramienta, verifica además que la versión de Node cumple sus requisitos.

## 5. Ejecutar el primer archivo

Crea una carpeta de trabajo y guarda con un editor de código un archivo **`hola.js`**:

```js
console.log("Hola desde Node");
```

Abre una terminal en esa carpeta, por ejemplo desde tu editor, y ejecuta:

```bash
node hola.js
```

Debe aparecer:

```text
Hola desde Node
```

Usa texto plano: no guardes el archivo como documento enriquecido de TextEdit ni con extensión `.js.txt`. No necesitas `sudo`, `npm init` ni instalar paquetes para este programa.

## Problemas frecuentes

| Síntoma | Qué revisar |
|---|---|
| `node: command not found` tras instalar | Abre una terminal nueva. Con Homebrew, completa su configuración del shell; con el instalador oficial, comprueba que finalizó correctamente. |
| `brew: command not found` tras instalar Homebrew | Revisa los pasos finales del instalador para tu shell y arquitectura, no reinstales Node con otro método como primer intento. |
| El instalador no admite tu macOS | Consulta los requisitos oficiales y las opciones del administrador. No lo soluciones desactivando las protecciones del sistema ni usando sin advertencia una versión de Node sin soporte. |
| Aparece otra versión de Node | Consulta `command -v node` y `command -v npm`; una instalación previa o un gestor de versiones puede tener prioridad. |
| No encuentra `hola.js` | Comprueba la carpeta de la terminal y el nombre/extensión del archivo. |
| Hay errores de permisos al instalar paquetes | Trabaja en una carpeta de tu usuario y revisa el método de instalación. No ejecutes todas las órdenes de npm con `sudo` como solución general. |

Si más adelante necesitas varias versiones de Node, [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) también funciona en macOS. Sigue su guía de instalación y configura conscientemente qué versión usa cada terminal; no es necesario para el primer ejercicio.

**Criterio de finalización:** una terminal nueva encuentra Node y npm, y `node hola.js` muestra el saludo. Continúa con [Hola mundo](../Teoría/01-hola-mundo.md).

## Referencias

- [Descargas oficiales de Node.js](https://nodejs.org/en/download).
- [Versiones y estado de soporte de Node.js](https://nodejs.org/en/about/previous-releases).
- [Instalación y requisitos de Homebrew](https://docs.brew.sh/Installation).
- [Fórmula Node de Homebrew](https://formulae.brew.sh/formula/node).
