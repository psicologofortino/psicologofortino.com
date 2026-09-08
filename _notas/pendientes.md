# Pendientes y hallazgos

Notas internas, no se publican. Última revisión: septiembre de 2026.

---

## Requieren una decisión

### 1. Tailwind se compila en el navegador de cada visitante

Las páginas cargan Tailwind desde `cdn.tailwindcss.com`. Ese CDN no entrega CSS
ya hecho: entrega un programa de unos 400 KB que **genera los estilos dentro del
navegador**, en cada visita. Sus propios autores dicen que no es para sitios en
producción.

Por qué importa aquí más que en otros sitios: la velocidad de carga entra en el
*nivel de calidad* de Google Ads, y ese nivel influye en cuánto se paga por clic.
Una página de destino lenta encarece las campañas.

La solución es generar el CSS una sola vez y publicarlo como un archivo, en vez
de armarlo en cada visita. Implica agregar un paso de compilación al
repositorio, así que es una decisión, no un ajuste. El resultado sería la misma
apariencia con una fracción del peso.

### 2. Posible desbordamiento del encabezado en tabletas

Entre 768 px y unos 980 px de ancho, el menú de escritorio muestra cinco
elementos más el botón, todos sin permitir corte de línea, junto a un logotipo
ancho. La estimación da un total mayor al espacio disponible, lo que rompería el
encabezado en tabletas en vertical.

**No verificado**: desde el entorno de trabajo no se puede renderizar la página,
porque el CDN de Tailwind está bloqueado ahí. Conviene comprobarlo en una tableta
real o en el modo responsivo del navegador, a 768 px y a 900 px.

Si se confirma, la corrección es de una palabra por archivo: cambiar el punto de
quiebre del menú de `md:` a `lg:`, de modo que el menú de hamburguesa se use
hasta los 1024 px.

---

## Para hacer fuera del repositorio

- **Enviar el sitemap a Google Search Console**, en `psicologofortino.com/sitemap.xml`.
  Acelera que Google encuentre la página de agenda.
- **Revisión legal del aviso de privacidad.** El texto es correcto y honesto,
  pero no lo redactó ni revisó un abogado.

---

## Limitaciones conocidas, ya decididas

- **La conversión de Google Ads cuenta clics, no reservas pagadas.** Ver la
  sección 7 de `configuracion-agenda.md`. Consecuencia: las conversiones
  reportadas serán más que las citas reales.
- **El aviso de "el calendario está tardando" no detecta todos los fallos.** Si
  Cal.com responde con un error, el navegador lo considera cargado y el aviso no
  aparece. Cubre el caso de una conexión lenta o colgada, que es el más común.
  Detectar lo otro requeriría un servidor propio.
