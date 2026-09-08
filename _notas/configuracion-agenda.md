# Configuración de la agenda en línea (Cal.com + Stripe)

Notas internas. **Esta carpeta no se publica** en el sitio: GitHub Pages (Jekyll)
ignora las carpetas que empiezan con guion bajo.

La página vive en `agendar/index.html`.

---

## 1. Activar el calendario en la página

Al final de `agendar/index.html` hay un bloque de configuración:

```js
const CAL = {
    usuario: "",
    individual: "primera-cita-individual",
    pareja: "primera-cita-pareja"
};
```

Escribir el usuario de Cal.com entre las comillas de `usuario` — es la parte que
aparece en el enlace `cal.com/TU-USUARIO`. Con eso el calendario aparece solo y
el aviso de "pendiente de conectar" desaparece.

Los otros dos valores son los *slugs* de cada tipo de sesión. Si en Cal.com se
nombran distinto, hay que cambiarlos aquí para que coincidan.

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

| Nombre | Slug | Anticipo |
|---|---|---|
| Primera cita – Terapia individual | `primera-cita-individual` | $400 MXN |
| Primera cita – Terapia de pareja | `primera-cita-pareja` | $500 MXN |

En cada uno:

- **Ubicación**: presencial, con la dirección del consultorio
  (Blvd. Rosales #188, entre Morelos y Juárez, Los Mochis). Así queda en el
  evento del calendario y en el correo de confirmación.
- **Margen después del evento** (*buffer after*): 10 minutos.
- **Antelación mínima** (*minimum notice*): **18 horas**. Ver la sección 6.
- **Pago**: app de Stripe, con el monto del anticipo en MXN.

### Campos del formulario

Dejar solo **nombre, correo y teléfono**.

**Quitar el campo de notas adicionales.** No debe pedirse motivo de consulta ni
ninguna información clínica: son datos sensibles bajo la ley de protección de
datos, y lo que no se recolecta no hay que custodiarlo.

---

## 5. Stripe

- Conectar desde **Apps → Stripe** dentro de Cal.com.
- Tarifa en México: **3.6% + $3 MXN** por transacción.
  - Anticipo de $400 → comisión $17.40
  - Anticipo de $500 → comisión $21.00
- **Los reembolsos no devuelven la comisión.** Si se reembolsa un anticipo de
  $400, los $17.40 se pierden igual. Por eso la política de la página es
  reagendar en vez de reembolsar.

---

## 6. Sobre la antelación mínima de 18 horas

Lo que se quería: nada de citas el mismo día, y que después de las 6 pm ya no se
pueda agendar la mañana siguiente.

Cal.com no tiene una regla de "hora de corte"; solo una ventana móvil de
antelación mínima. Con **18 horas** el comportamiento queda así:

- Reservar a las 6:00 pm → lo más temprano disponible es el mediodía siguiente,
  así que el espacio de las 11:00 am queda bloqueado. ✅
- Reservar a las 7:00 pm o después → toda la mañana siguiente queda bloqueada. ✅
- Nunca hay citas el mismo día en horario normal. ✅

Dos diferencias respecto a la regla ideal, ambas menores:

1. Entre las 6 y las 7 pm, el espacio de las 12:00 pm del día siguiente sigue
   disponible (el de las 11:00 am ya no). Para cerrar también ese, subir a
   **19 horas**; el costo es que el corte efectivo se adelanta a las 5 pm.
2. Reservando entre medianoche y la 1:00 am se alcanzaría el espacio de las
   7:00 pm de ese mismo día. En la práctica no ocurre.

---

## 7. Pendiente de decidir

El botón principal del encabezado (`Agendar Cita`, en azul) sigue apuntando a
WhatsApp en todo el sitio, y es el que dispara la conversión de Google Ads
(`ads_conversion_Contact_1`). La agenda en línea se agregó como un enlace de
menú aparte, "Agendar en línea", para no tocar esa medición.

Si más adelante se quiere que el botón principal lleve a `/agendar/`, hay que
decidir antes qué pasa con el evento de conversión, para no perder el
seguimiento de las campañas.
