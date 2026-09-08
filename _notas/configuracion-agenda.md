# Configuración de la agenda en línea (Cal.com + Stripe)

Notas internas. **Esta carpeta no se publica** en el sitio: GitHub Pages (Jekyll)
ignora las carpetas que empiezan con guion bajo.

> ⚠️ **No agregar un archivo `.nojekyll` a la raíz del repositorio.** Desactiva
> Jekyll, y con él la regla que mantiene ocultas estas carpetas: `_notas/` y
> `_archivo/` quedarían publicadas.

La página vive en `agendar/index.html`.

---

## 1. Enlace de la página con Cal.com

Ya está configurado al final de `agendar/index.html`:

```js
const CAL = {
    usuario: "fortino-velderrain-aifqcp",
    individual: "primera-cita-individual",
    pareja: "primera-cita-pareja"
};
```

**Los dos tipos de evento tienen que existir en Cal.com con esos mismos slugs**,
o el calendario mostrará una página de error. Si en Cal.com se nombran distinto,
hay que corregir estos valores para que coincidan.

La página acepta `?tipo=pareja` en la dirección para abrir directamente en la
pestaña de pareja. Los botones de la página de parejas ya apuntan así.

---

## 2. Ajustes generales de Cal.com

- **Zona horaria: `America/Mazatlan`.** No Ciudad de México. Sinaloa va una hora
  atrás y no aplica horario de verano; si queda mal, todas las citas aparecen
  corridas.

---

## 3. Disponibilidad

Un horario llamado "Consultorio":

| Día | Horario |
|---|---|
| Lunes | 15:00 – 20:00 |
| Martes | 11:00 – 13:00 y 15:00 – 20:00 |
| Miércoles | Sin disponibilidad |
| Jueves | 11:00 – 13:00 y 15:00 – 20:00 |
| Viernes | 11:00 – 13:00 y 15:00 – 20:00 |
| Sábado | 10:00 – 13:00 |
| Domingo | Sin disponibilidad |

Con sesiones de 50 minutos y 10 de margen, los espacios caen en horas cerradas:
11:00 y 12:00 por la mañana; 15:00, 16:00, 17:00, 18:00 y 19:00 por la tarde;
10:00, 11:00 y 12:00 los sábados.

---

## 4. Tipos de evento

Crear dos, ambos de **50 minutos**:

| Nombre | Slug (debe coincidir) | Anticipo |
|---|---|---|
| Primera cita – Terapia individual | `primera-cita-individual` | $400 MXN |
| Primera cita – Terapia de pareja | `primera-cita-pareja` | $500 MXN |

En cada uno:

- **Ubicación**: presencial, con la dirección del consultorio
  (Blvd. Rosales #188, entre Morelos y Juárez, Los Mochis). Así queda en el
  evento del calendario y en el correo de confirmación.
- **Margen después del evento** (*buffer after*): 10 minutos.
- **Antelación mínima** (*minimum notice*): **19 horas**. Ver la sección 6.
- **Pago**: app de Stripe, con el monto del anticipo en MXN.

### Campos del formulario

Nombre, correo y teléfono, más el campo de notas que Cal.com trae por defecto.

**Decisión tomada:** se deja el campo de notas abierto, aunque quien reserve
escriba ahí su motivo de consulta. Queda anotado que eso implica que información
de salud —dato sensible bajo la ley mexicana de protección de datos— se guarda
en Cal.com y Google Calendar. Por eso el aviso de privacidad (sección 9) explica
que ese campo es opcional y qué implica llenarlo.

### Redireccionamiento al terminar: descartado

El redireccionamiento posterior a la reserva requiere un plan de pago de Cal.com,
y se decidió no contratarlo. Por eso la conversión de Google Ads se mide en el
clic del botón y no en la reserva completada; ver la sección 7.

La página de agradecimiento que se había construido para ese flujo quedó guardada
en `_archivo/gracias-reserva/`, lista para reactivarse si algún día se contrata
el plan.

---

## 5. Stripe

**No se necesita ninguna clave de API.** La conexión es por autorización: dentro
de Cal.com, **Apps → Stripe → Install**, que redirige a Stripe para aceptar. Las
claves `pk_` y `sk_` son para quien programa una integración propia; aquí no van
en ningún archivo, y una `sk_` nunca debe quedar escrita en el repositorio.

### Verificar que el cobro funciona

La cuenta ya está activada. Falta comprobar de punta a punta que el anticipo se
cobra. Conviene hacerlo con una prueba barata en vez de con los $400 reales:

1. Crear un tipo de evento temporal, marcado como **oculto**, de 15 minutos y con
   precio de **$10 MXN**.
2. Reservarlo uno mismo, con un correo distinto, y pagar con una tarjeta real.
3. Comprobar las tres cosas que tienen que ocurrir:
   - el cobro aparece en el panel de Stripe;
   - la cita aparece en Google Calendar;
   - llega el correo de confirmación.
4. Reembolsar ese cobro y borrar el evento temporal.

Si el calendario deja reservar **sin pedir el pago**, lo que falta casi siempre
es el precio en el propio tipo de evento: la app de Stripe se instala una vez,
pero el monto se define en cada evento por separado.

Tarifa en México: **3.6% + $3 MXN** por transacción.

- Anticipo de $400 → comisión $17.40
- Anticipo de $500 → comisión $21.00

**Los reembolsos no devuelven la comisión.** Si se reembolsa un anticipo de $400,
los $17.40 se pierden igual. Por eso la política de la página es reagendar en
vez de reembolsar.

---

## 6. Sobre la antelación mínima de 19 horas

Lo que se quería: nada de citas el mismo día, y que después de las 6 pm ya no se
pueda agendar la mañana siguiente.

Cal.com no tiene una regla de "hora de corte"; solo una ventana móvil de
antelación mínima. Con **19 horas** el comportamiento queda así:

- Reservar a las 6:00 pm → lo más temprano disponible es la 1:00 pm del día
  siguiente, así que **toda la mañana siguiente queda cerrada**. ✅
- Reservar a las 5:00 pm → el espacio de las 11:00 am ya no aparece; el de las
  12:00 pm todavía sí. El corte empieza a operar un poco antes de las 6 pm.
- Nunca hay citas el mismo día. ✅

---

## 7. Flujo de botones en el sitio

Los botones principales de todo el sitio llevan a la agenda en línea:

| Ubicación | Destino |
|---|---|
| Botón del encabezado (inicio y parejas) | `/agendar/` |
| Botón del hero | `/agendar/` |
| Botón del pie de página | `/agendar/` |
| Menú móvil | `/agendar/` |

Desde la página de parejas todos apuntan a `/agendar/?tipo=pareja`.

WhatsApp queda como salida secundaria, para quien todavía tiene dudas: un enlace
de texto bajo los botones del hero, otro en el pie de página, y el botón
flotante verde, que sigue presente en todas las páginas.

### Conversión de Google Ads

Los botones que llevan a `/agendar/` disparan `ads_conversion_Contact_1`, el
mismo evento que ya usaban los enlaces de WhatsApp. Con eso la medición vuelve a
tener la calidad que tenía antes de la agenda: cuenta **intención de contacto**,
no reservas pagadas.

No es lo ideal, y se llegó aquí por descarte: medir la reserva completada exige
el redireccionamiento de Cal.com, que es de plan de pago. La opción que quedaba
era dejar las campañas sin señal, o contar el clic como se contaba antes. Se
eligió lo segundo.

Consecuencia a tener presente: el número de conversiones será **mayor** que el de
citas reales, porque incluye a quien abre la página de agenda y no reserva. Si
algún día se contrata el plan de Cal.com, se recupera el flujo correcto
restaurando `_archivo/gracias-reserva/` y quitando el `onclick` de los botones.

---

## 8. Evento privado para el espacio físico

Existe un tipo de evento aparte para que la esposa o una colega de confianza
aparten el consultorio. **No está enlazado desde el sitio y no debe estarlo.**

Dos cosas que conviene revisar en Cal.com, porque los enlaces de reserva son
públicos para quien los tenga:

- Que el evento esté marcado como **oculto**, para que no aparezca listado en el
  perfil público `cal.com/fortino-velderrain-aifqcp`.
- Que no tenga precio, si la idea es que reserven sin pagar.

Aun oculto, cualquiera con la dirección puede reservar. Si eso llega a ser un
problema, Cal.com permite proteger el evento con contraseña.

---

## 9. Aviso de privacidad

Publicado en `privacidad/index.html`, enlazado desde el pie de página de inicio,
parejas y agendar.

Cubre qué datos se piden al reservar, el campo de notas y los datos sensibles que
puede contener, para qué se usan, los terceros que los procesan (Cal.com, Stripe,
Google) y la transferencia fuera de México, la confidencialidad de la terapia,
los derechos ARCO y el uso de Google Analytics.

Si cambia algo de eso —otro procesador de pagos, otro formulario, publicidad—
hay que actualizar el texto y su fecha.

---

## 10. Prefijo telefónico de México en el formulario

El calendario se carga con `?attendeePhoneNumber=%2B52`, que es el parámetro de
prellenado de Cal.com para el campo de teléfono. Con eso el campo llega con el
prefijo de México ya puesto y nadie tiene que buscar el país en la lista.

Se controla desde `agendar/index.html`, en el bloque `CAL`, con
`prefijoTelefono: "+52"`. Vaciar esa cadena quita el parámetro.

**Lo que no se puede resolver desde aquí:** buscar "Mexico" sin acento en la
lista de países de Cal.com no encuentra "México". Ese buscador vive dentro del
calendario de Cal.com, que se carga desde otro dominio; el navegador impide
modificar su contenido desde nuestra página. Es un defecto de Cal.com y solo
ellos pueden corregirlo. El prellenado del prefijo evita que la mayoría tenga
que abrir esa lista.
