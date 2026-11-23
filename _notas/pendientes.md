# Pendientes

Notas internas, no se publican. Última revisión: septiembre de 2026.

---

## Hecho

- **Search Console configurado.** Propiedad de dominio (`sc-domain:`), verificada.
  El sitemap se envió el 9 de septiembre de 2026 y quedó en estado *Success*, con
  las cuatro páginas descubiertas.
- **Dos avisos de Search Console que NO hay que "arreglar"**, porque ambos son
  intencionales:
  - *Page with redirect* (3): las variantes con `www` y sin `https` del dominio,
    que redirigen a la definitiva. Es el comportamiento correcto.
  - *Not found 404* (1): `/parejas/peleabien/`, el taller que se archivó a
    propósito. La página de error propia se encarga de reconducir a quien llegue.

  No usar el botón *Validate fix* en ninguno: fallaría y dejaría una notificación
  de error sin motivo.

---

## Decisiones tomadas, no volver sobre ellas

- **La estructura de la portada se queda como está.** Se planteó agregarle una
  sección de método y de para quién es, como la que tiene la página de parejas.
  Se descartó: el hero ya separa a los dos públicos con sus dos botones —quien
  viene decidido tiene «Agendar Cita», quien viene a informarse tiene «¿Cómo
  funciona?»— y el FAQ, ya con siete preguntas, cubre lo que esa sección diría.

- **La terapia en línea ya está cubierta.** Los tipos de cita de Cal.com ofrecen
  «En persona» y «Google Meet» como opciones de ubicación, así que lo que dice la
  portada sobre atención presencial y online está respaldado por la reserva.

- **El contraste de los botones de WhatsApp se deja como está.** El blanco sobre
  `#25D366` da 1.98, por debajo del mínimo de 4.5, pero es la combinación oficial
  de la marca según sus propias guías (Pantone 7479 C). Se prioriza la
  identidad reconocible.
- **El aviso de privacidad no pasará por revisión legal.**
- **La conversión de Google Ads cuenta clics, no reservas pagadas**, porque el
  redireccionamiento de Cal.com es de plan de pago. No se va a corregir.
- **El teléfono se queda en la ficha de Google Maps**, aunque se haya retirado
  del sitio.
- **Botón flotante de WhatsApp:** se esconde mientras se ve el inicio (que ya
  tiene su enlace a WhatsApp) y, en la agenda, mientras se ve el calendario,
  para no tapar botones ni horarios. Cada página marca esa zona con
  `data-oculta-whatsapp`.
- **Testimonios en móvil:** carrusel que se desliza de lado; en escritorio
  siguen en cuadrícula.

## Dominio, DNS y Cloudflare (noviembre de 2026)

- **El 23 de noviembre de 2026 el DNS pasó de Squarespace a Cloudflare** (plan
  gratuito). Motivo: con datos móviles de Telcel no cargaba ningún sitio de
  GitHub Pages (tampoco pages.github.com); con WiFi, sí. Cloudflare recibe las
  visitas con sus propios servidores y le pide la página a GitHub.
- **El dominio sigue registrado en Squarespace** (vence el 6 de noviembre de
  2027); ahí solo cambiaron los nameservers a `dell.ns.cloudflare.com` y
  `jerry.ns.cloudflare.com`. **Los registros DNS ahora se editan en
  Cloudflare**, no en Squarespace.
- Registros: 4 A y 4 AAAA de GitHub Pages y el CNAME `www` →
  `psicologofortino.github.io`, con proxy (nube naranja). MX `smtp.google.com`
  y los 3 TXT de Google (SPF, DKIM, verificación) sin proxy.
- **SSL/TLS en "Full", no "Full (strict)" ni "Flexible".** Flexible provoca un
  ciclo de redirecciones; strict tumbaría el sitio si GitHub no logra renovar
  su certificado detrás del proxy.
- Tras el cambio, Telcel siguió un rato con la dirección vieja guardada en su
  DNS (puede tardar hasta 48 h en olvidarla). Para acelerarlo, los registros
  guardados en Squarespace se cambiaron a las direcciones de Cloudflare
  (A 104.21.78.224 y 172.67.137.222; AAAA 2606:4700:3030::6815:4ee0 y
  2606:4700:3034::ac43:89de; `www` → `psicologofortino.com`).
- **Para volver atrás:** en Squarespace, nameservers de nuevo a los de Google
  (`ns-cloud-b1` a `b4.googledomains.com`) **y** devolver esos registros a
  GitHub Pages: 4 A (185.199.108.153 a .111.153), 4 AAAA
  (2606:50c0:8000::153 a 8003::153) y `www` → `psicologofortino.github.io`.
