# Archivo

Contenido guardado para posible reutilización futura. **Nada de esta carpeta se
publica en el sitio**: GitHub Pages (Jekyll) ignora las carpetas cuyo nombre
empieza con guion bajo (`_`), así que estos archivos viven solo en el repositorio.

## Contenido

### `peleabien/`

Taller **"Pelea Bien: El Secreto de las Mejores Parejas para Transformar
Conflicto en Conexión"**, impartido el 11 de julio de 2026 en Global Leaders,
Los Mochis, por Fortino Velderrain y Felipe Valle.

- `peleabien/index.html` — página del taller: video de presentación,
  facilitadores, temario completo (estilo Gottman), CTA y footer de contacto.
- `peleabien/registro/index.html` — formulario de registro, con cuenta regresiva
  al cierre (fecha fija: 10 de julio de 2026).

Estuvo publicado en `psicologofortino.com/parejas/peleabien/` hasta agosto de
2026. Sus enlaces internos hacia el resto del sitio usan rutas absolutas
(`/`, `/parejas/`), por lo que la carpeta funciona igual desde cualquier
ubicación.

## Cómo volver a publicarlo

Para reutilizar el taller (por ejemplo, en una nueva edición):

```bash
git mv _archivo/peleabien parejas/peleabien
```

Después hay que:

1. Actualizar fechas, horario, lugar y precio en `parejas/peleabien/index.html`.
2. Actualizar la fecha de cierre en el contador de
   `parejas/peleabien/registro/index.html` (constante `cierreRegistro`).
3. Devolver el enlace "Taller" a los menús de escritorio y móvil de
   `index.html` y `parejas/index.html`.
