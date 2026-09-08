# Archivo

Contenido guardado para posible reutilización futura. **Nada de esta carpeta se
publica en el sitio**: GitHub Pages (Jekyll) ignora las carpetas cuyo nombre
empieza con guion bajo (`_`), así que estos archivos viven solo en el repositorio.

> ⚠️ **No agregar un archivo `.nojekyll` a la raíz del repositorio.** Ese archivo
> desactiva Jekyll, y con él la regla que mantiene ocultas las carpetas con guion
> bajo: `_archivo/` y `_notas/` quedarían publicadas y accesibles para cualquiera.

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

### `gracias-reserva/`

Página de agradecimiento posterior a una reserva, con la confirmación, los
siguientes pasos, la dirección del consultorio y los números de emergencia.
Incluye el registro de la conversión de Google Ads al completarse la reserva.

Nunca llegó a publicarse: el redireccionamiento tras la reserva que la haría
alcanzable requiere un plan de pago de Cal.com. Si algún día se contrata, basta
con moverla a `agendar/gracias/`, apuntar ahí el redireccionamiento de los dos
tipos de evento, y quitar el `onclick` de seguimiento de los botones "Agendar
Cita" del sitio, para no contar la conversión dos veces.

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
