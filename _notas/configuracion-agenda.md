# Configuración de la agenda en línea (Cal.com + Stripe)

Notas internas. **Esta carpeta no se publica** en el sitio: GitHub Pages (Jekyll)
ignora las carpetas que empiezan con guion bajo.

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
en Cal.com y Google Calendar. Pendiente asociado: el sitio no tiene aviso de
privacidad, y al recolectar datos personales por formulario conviene publicarlo.

### Redireccionamiento al terminar

En cada tipo de evento, configurar el redireccionamiento posterior a la reserva
hacia:

```
https://psicologofortino.com/agendar/gracias/
```

En Cal.com está en los ajustes avanzados del tipo de evento, como *redirect on
booking* / redireccionamiento tras la reserva. Es lo que hace que la conversión
de Google Ads se registre; ver la sección 7.

---

## 5. Stripe

**No se necesita ninguna clave de API.** La conexión es por autorización: dentro
de Cal.com, **Apps → Stripe → Install**, que redirige a Stripe para aceptar. Las
claves `pk_` y `sk_` son para quien programa una integración propia; aquí no van
en ningún archivo, y una `sk_` nunca debe quedar escrita en el repositorio.

**Modo de prueba vs. modo real.** Las claves que empiezan con `pk_test_` /
`sk_test_` indican que la cuenta todavía está en modo de prueba: los cobros son
simulados y no llega dinero. Para cobrar de verdad hay que completar la
verificación de Stripe (RFC, CLABE, identificación) y que la cuenta quede
activada.

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

La conversión se registra en `agendar/gracias/`, la página a la que Cal.com
redirige cuando la reserva se completa y se cobra el anticipo. Así se cuentan
reservas reales, no clics: nadie llega a esa página sin haber pagado.

Para que funcione hay que configurar el redireccionamiento en **los dos** tipos
de evento (ver sección 4). Si no se configura, la conversión nunca se dispara.

Detalles de la implementación:

- Se reutiliza el evento `ads_conversion_Contact_1`, el mismo de los enlaces de
  WhatsApp, para no tener que cambiar nada en Google Ads. La cuenta de
  conversiones queda mezclando mensajes de WhatsApp y reservas completadas.
- Si se prefiere separarlas, hay que crear una acción de conversión nueva en
  Google Ads para reservas y cambiar el nombre del evento en la línea marcada
  al final de `agendar/gracias/index.html`. Es un solo valor.
- La página lleva `noindex` para que no aparezca en buscadores, y evita contar
  dos veces si alguien la recarga.
