/** Configuración de Tailwind, igual a la que antes vivía en cada página. */
module.exports = {
  content: [
    './index.html',
    './404.html',
    './parejas/index.html',
    './agendar/index.html',
    './privacidad/index.html',
    './opinion/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#0F172A',
          primary: '#1E3A8A',
          light:   '#EFF6FF',
          accent:  '#25D366',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
