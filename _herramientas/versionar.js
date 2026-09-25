// Pone a cada página la "huella" actual de css/estilos.css y de iconos.svg
// (?v=...), para que el navegador descargue la versión nueva en cuanto cambia
// y nunca combine una página nueva con estilos viejos guardados en caché.
// Se ejecuta solo con `npm run estilos`. Esta carpeta no se publica.
const fs = require('fs');
const crypto = require('crypto');

const huella = (archivo) =>
  crypto.createHash('md5').update(fs.readFileSync(archivo)).digest('hex').slice(0, 8);

const css = huella('css/estilos.css');
const iconos = huella('iconos.svg');

const paginas = [
  'index.html', '404.html', 'agendar/index.html', 'parejas/index.html',
  'privacidad/index.html', 'opinion/index.html',
];

for (const pagina of paginas) {
  const antes = fs.readFileSync(pagina, 'utf8');
  const despues = antes
    .replace(/\/css\/estilos\.css(\?v=[0-9a-f]*)?"/g, `/css/estilos.css?v=${css}"`)
    .replace(/\/iconos\.svg(\?v=[0-9a-f]*)?#/g, `/iconos.svg?v=${iconos}#`);
  if (despues !== antes) fs.writeFileSync(pagina, despues);
}
console.log(`estilos.css?v=${css}  iconos.svg?v=${iconos}`);
