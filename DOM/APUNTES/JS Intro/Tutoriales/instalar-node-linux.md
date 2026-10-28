# Instalar Node.js en Linux

[Introducción](../Teoría/00-introduccion.md) · [Instalación en macOS](instalar-node-macos.md)

**Objetivo:** ejecutar un archivo JavaScript con `node` y disponer de `npm` para los proyectos posteriores. Node es el entorno de ejecución; npm es el gestor de paquetes. Para los primeros ejercicios no necesitas instalar librerías.

**Alcance:** la instalación con `apt` es para Ubuntu, Debian y derivados compatibles, incluido Ubuntu dentro de WSL. No ejecutes esos comandos en macOS, PowerShell, Fedora o Arch. Para otras distribuciones o cuando necesites una LTS distinta, consulta la alternativa con nvm de esta guía.

## 1. Comprobar si ya está instalado

Abre una terminal y ejecuta cada comando por separado:

```bash
node --version
npm --version
command -v node
command -v npm
```

Si los dos primeros muestran versiones, puede que no necesites instalar nada. Los otros dos indican qué ejecutables está usando esa terminal. Si aparece `command not found`, falta el programa o su ubicación no está en el `PATH`.

Antes de añadir otra instalación, comprueba la que ya tienes. No mezcles `apt`, nvm y otros métodos sin decidir cuál debe estar activo. En un equipo compartido, sigue las indicaciones del administrador del aula.

## 2. Instalar con apt en Ubuntu o Debian

Necesitas conexión a Internet y permisos de administración. Ejecuta primero:

```bash
sudo apt update
```

Si termina sin errores de repositorios, instala los paquetes:

```bash
sudo apt install nodejs npm
```

Revisa la propuesta de instalación y confírmala si es la esperada. Al escribir la contraseña de `sudo` normalmente no verás caracteres: no significa que la terminal esté bloqueada.

- `apt update` actualiza el catálogo de paquetes; no actualiza automáticamente todos los programas del equipo.
- `nodejs` instala Node; se solicita `npm` por separado porque la distribución los empaqueta por separado.
- La versión disponible depende de la distribución y sus repositorios. **No tiene por qué ser la última LTS de Node ni cumplir los requisitos de la versión de Vite que quieras usar.**

Si el repositorio ofrece una versión sin soporte o incompatible con tu proyecto, no continúes instalando herramientas a ciegas: usa una versión soportada mediante la alternativa siguiente o pide al administrador que prepare el entorno.

## 3. Alternativa: una LTS con nvm

**No hagas también este paso si la instalación con apt ya cumple lo que necesitas.** nvm permite instalar Node para tu usuario y seleccionar versiones sin cambiar el Node que usan los servicios del sistema.

1. Consulta [Installing and Updating de nvm](https://github.com/nvm-sh/nvm#installing-and-updating), elige su método de instalación y revisa el script antes de ejecutarlo. El instalador puede modificar el archivo de inicio de tu shell, como `~/.bashrc` o `~/.zshrc`.
2. Abre una terminal nueva para cargar esa configuración. La guía oficial está orientada a shells compatibles como Bash y Zsh; Fish requiere una integración diferente.
3. Comprueba que nvm se ha cargado:

   ```bash
   command -v nvm
   ```

   Debe mostrar `nvm`. Es una función del shell: no uses `which nvm` como única comprobación.

4. Instala y activa la última versión LTS disponible, y úsala por defecto en nuevas terminales:

   ```bash
   nvm install --lts
   nvm use --lts
   nvm alias default 'lts/*'
   ```

No uses `sudo` con estos comandos de nvm. La distribución de Node que instala incluye npm. Las versiones LTS cambian con el tiempo: comprueba el [estado de soporte de Node](https://nodejs.org/en/about/previous-releases) y los requisitos del proyecto, en vez de fijar para siempre una versión copiada de un tutorial.

En otras distribuciones, comprueba también los requisitos de nvm y de los binarios de Node. No presupongas que instrucciones para Ubuntu sirven para Alpine u otros sistemas con bibliotecas distintas.

## 4. Verificar Node y npm

Después de completar **uno** de los métodos:

```bash
node --version
npm --version
node -e 'console.log("Node listo")'
```

Deben aparecer una versión de Node, una versión de npm y el texto `Node listo`. No se exige un número de versión concreto para esta comprobación, pero sí uno soportado y compatible con las herramientas que uses.

Si elegiste nvm, abre otra terminal y repite la comprobación: así confirmas que no funciona únicamente en la sesión donde instalaste.

## 5. Ejecutar el primer archivo

Crea con tu editor una carpeta de trabajo y guarda en ella un archivo **`hola.js`** con este contenido:

```js
console.log("Hola desde Node");
```

Abre una terminal en esa carpeta (por ejemplo, con la opción de terminal integrada de tu editor) y ejecuta:

```bash
node hola.js
```

Resultado esperado:

```text
Hola desde Node
```

No necesitas `npm init`, `npm install` ni `sudo` para ejecutar este programa.

## Problemas frecuentes

| Síntoma | Qué revisar |
|---|---|
| `sudo` no está permitido | Pide ayuda al administrador. Mientras tanto puedes hacer los ejercicios de lenguaje en la consola del navegador. |
| Falla `apt update` o no encuentra paquetes | Revisa la conexión y los repositorios de tu distribución. No copies repositorios de otra versión de Ubuntu/Debian para forzar la instalación. |
| `nvm: command not found` | Abre una terminal nueva y revisa las líneas de carga que añadió el instalador al archivo de configuración del shell que realmente usas. |
| Hay Node pero no npm tras usar apt | Comprueba que se instaló el paquete `npm`, además de `nodejs`. |
| La versión no coincide con la elegida | Consulta `command -v node` y `command -v npm`; puede estar tomando otra instalación del `PATH`. Con nvm, comprueba también `nvm current`. |
| `Cannot find module .../hola.js` | Abre la terminal en la carpeta correcta y comprueba que el archivo no se llama `hola.js.txt`. |
| Vite exige otra versión de Node | Revisa los requisitos de esa versión de Vite y selecciona un Node soportado que los cumpla. No ignores el aviso. |

**Criterio de finalización:** Node y npm responden en una terminal nueva y `node hola.js` imprime el saludo. Continúa con [Hola mundo](../Teoría/01-hola-mundo.md).

## Referencias

- [Descargas oficiales de Node.js](https://nodejs.org/en/download).
- [Node Version Manager: instalación y uso](https://github.com/nvm-sh/nvm#installing-and-updating).
- [Paquete nodejs en Debian](https://packages.debian.org/stable/nodejs).
- [Paquete nodejs en Ubuntu 24.04](https://packages.ubuntu.com/noble/nodejs).
