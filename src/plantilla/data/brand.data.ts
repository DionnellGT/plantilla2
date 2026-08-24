// Constantes de marca reutilizadas entre secciones (header, footer, menú móvil)

export const BRAND_NAME = "Parcelas los lagos";

/**
 * Logo de respaldo: solo se usa si el asesor no subió su propio logo
 * (misDatos.logo). El diseño por defecto usa un ícono + el nombre, no una
 * imagen, así que este valor casi no se usa en la práctica.
 */
export const LOGO_URL = "";

/**
 * Contacto de respaldo: solo se usa si el backend no devuelve
 * `misDatos` para el asesor (por ejemplo, mientras no ha cargado sus
 * datos, o ante un error de red).
 */
export const CONTACT_INFO_FALLBACK = {
  whatsappNumber: "+56 9 1234 5678",
  whatsappLink: "https://wa.me/56912345678",
  phone: "+56 9 1234 5678",
  email: "hola@parcelasdelsur.cl",
};

export const NAV_LINKS = [
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "sobre-mi", label: "Nosotros", href: "#sobre-mi" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

export const FOOTER_LINK_GROUP = {
  title: "Enlaces",
  links: [
    { id: "proyectos", label: "Proyectos", href: "#proyectos" },
    { id: "sobre-mi", label: "Sobre Mí", href: "#sobre-mi" },
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ],
};

export const FOOTER_DESCRIPTION =
  "Asesoría experta en bienes raíces para la Patagonia Chilena. Encuentra el refugio perfecto rodeado de naturaleza.";

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} ${BRAND_NAME}. Asesoría en Tierras Australes.`;
