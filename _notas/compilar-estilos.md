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
