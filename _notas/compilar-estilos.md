# Cómo se generan los estilos

> ⚠️ **Lee esto antes de editar clases en el HTML.**

Antes, cada página cargaba `cdn.tailwindcss.com`: un programa de unos 400 KB que
**armaba los estilos dentro del navegador de cada visitante**, en cada visita.
Ahora los estilos se generan una sola vez y se publican como un archivo de 21 KB
en `css/estilos.css`.

El cambio se hizo porque la velocidad de carga entra en el nivel de calidad de
Google Ads, y ese nivel influye en cuánto se paga por clic.

---

## Lo que hay que tener presente

`css/estilos.css` contiene **solo las clases que aparecen en el HTML** en el
momento de compilar. Si se agrega una clase nueva de Tailwind a una página y no
se recompila, esa clase **no tendrá efecto**: el estilo simplemente no existirá
en el archivo.

Editar **texto** es seguro y no requiere recompilar. Lo que requiere recompilar
es agregar o cambiar **clases**.

## Cómo recompilar

Desde la raíz del repositorio:

```bash
npm install          # solo la primera vez
npx tailwindcss -c tailwind.config.js -i css/fuente.css -o css/estilos.css --minify
```

Después hay que confirmar `css/estilos.css` junto con el cambio de HTML.

## Archivos que intervienen

| Archivo | Para qué sirve |
|---|---|
| `tailwind.config.js` | Colores de marca y lista de páginas a revisar |
| `css/fuente.css` | Entrada; solo las tres directivas de Tailwind |
| `css/estilos.css` | **Salida generada.** No editar a mano |
| `package.json` | Fija la versión de Tailwind |

`node_modules/` está excluido del repositorio.

## Si se agrega una página nueva

Hay que añadirla a la lista `content` de `tailwind.config.js`, o sus clases no
se incluirán.

## Íconos y tipografía

Desde septiembre de 2026 el sitio ya no carga nada de otros servidores para
verse bien:

- **Íconos:** están dibujados en `iconos.svg` (tomados de Font Awesome Free
  6.5.2, licencia CC BY 4.0). En las páginas se usan así:
  `<svg class="icono" viewBox="0 0 512 512" aria-hidden="true"><use href="/iconos.svg#whatsapp"></use></svg>`.
  El `viewBox` debe ser el mismo del `<symbol>` correspondiente. Para un
  ícono nuevo, se copia el `<path>` del SVG original de Font Awesome a un
  `<symbol>` nuevo dentro de `iconos.svg`.
- **Tipografía:** Inter, servida desde `fuentes/inter-latin.woff2` (licencia
  en `fuentes/OFL.txt`). Se declara en `css/fuente.css`.

## Versión de los estilos (importante)

Desde el 25 de septiembre de 2026 se compila con:

```bash
npm run estilos
```

Hace lo mismo que el comando de arriba y además pone en cada página la huella
del archivo (`/css/estilos.css?v=03f7b354`, `/iconos.svg?v=…#icono`). Cuando
el CSS cambia, la huella cambia y el navegador lo descarga de nuevo.

**Por qué:** GitHub Pages permite que el navegador guarde cada archivo 10
minutos. El día que se quitó Font Awesome, un navegador combinó el HTML nuevo
con el CSS viejo guardado: sin la tipografía ni el tamaño de los íconos, la
página se vio con Arial y con íconos gigantes. Con la huella eso ya no pasa.
Además, cada ícono lleva `width`, `height` y `fill` en el propio HTML, así que
aunque faltara el CSS no se deforman.
