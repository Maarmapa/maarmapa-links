// Datos del perfil. La vista no conoce estos valores de antemano:
// cambiar nombre, foto o un enlace no obliga a tocar JSX.

export const profile = {
  name: 'Mario Maldonado',
  handle: 'maarmapa',
  location: 'Santiago, CL',
  avatar: '/avatar.png',
  bio: 'Artista de graffiti, codueño de Boykot y builder con IA. Sistemas reales en producción, no demos.',
  links: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Maarmapa',
      hint: 'código y repos',
      icon: 'github',
    },
    {
      id: 'boykot',
      label: 'Boykot',
      href: 'https://www.boykot.cl',
      hint: 'tienda de arte · Santiago',
      icon: 'shop',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      href: 'https://maarmapa-portfolio.vercel.app/',
      hint: 'proyectos en producción',
      icon: 'journal-code',
    },
    {
      id: 'alerta',
      label: 'Alerta Clima',
      href: 'https://alertaclima.vercel.app',
      hint: 'alertas ciudadanas con IA',
      icon: 'cloud-sun',
    },
    {
      id: 'substack',
      label: 'Substack',
      href: 'https://maarmapa.substack.com',
      hint: 'escritos',
      icon: 'pencil',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/maarmapa',
      hint: 'contacto',
      icon: 'send',
    },
  ],
};
