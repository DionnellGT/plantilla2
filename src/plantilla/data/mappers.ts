import {
  BRAND_NAME,
  LOGO_URL,
  CONTACT_INFO_FALLBACK,
  NAV_LINKS,
  FOOTER_LINK_GROUP,
  FOOTER_DESCRIPTION,
  FOOTER_COPYRIGHT,
} from "./brand.data";
import type {
  ApiLandingBundle,
  ContactData,
  ContactInfo,
  FooterData,
  HeroData,
  AboutData,
  NavigationData,
  Project,
  ProjectsSectionData,
  SocialLink,
  Testimonio,
  TestimoniosSectionData,
} from "./interfaces";

/** Saca las iniciales (hasta 2) de un nombre completo, para el avatar. */
const getInitials = (fullName: string): string =>
  fullName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Arma un link de WhatsApp (wa.me) a partir de un teléfono con cualquier formato. */
const buildWhatsappLink = (telefono: string): string => {
  const digits = telefono.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
};

/**
 * Nombre y apellido reales de misDatos, para mostrar la marca en 2 líneas
 * (ej: "Gonzalo" / "Galvez") cuando no hay imagen de logo. Si el asesor no
 * cargó apellido, la segunda línea queda vacía y solo se muestra el nombre.
 */
const getBrandNameLines = (bundle: ApiLandingBundle): { line1: string; line2: string } => {
  const { misDatos } = bundle;

  if (misDatos?.nombre) {
    return { line1: misDatos.nombre, line2: misDatos.apellido || "" };
  }

  const [first, ...rest] = (bundle.fullName || BRAND_NAME).split(" ");
  return { line1: first, line2: rest.join(" ") };
};

export const mapContactInfo = (bundle: ApiLandingBundle): ContactInfo => {
  const { misDatos } = bundle;

  if (!misDatos?.telefono) {
    return CONTACT_INFO_FALLBACK;
  }

  return {
    whatsappNumber: misDatos.telefono,
    whatsappLink: buildWhatsappLink(misDatos.telefono),
    phone: misDatos.telefono,
    email: misDatos.correo || CONTACT_INFO_FALLBACK.email,
  };
};

export const mapNavigation = (bundle: ApiLandingBundle): NavigationData => {
  const { line1, line2 } = getBrandNameLines(bundle);

  return {
    logo: bundle.misDatos?.logo || LOGO_URL,
    logoAlt: bundle.fullName || BRAND_NAME,
    brandNameLine1: line1,
    brandNameLine2: line2,
    links: NAV_LINKS,
    contact: mapContactInfo(bundle),
  };
};

export const mapHero = (bundle: ApiLandingBundle): HeroData => {
  const { banner, proyectos } = bundle;
  const primeraUbicacion = proyectos.find((p) => p.ubicacion)?.ubicacion;

  return {
    eyebrow: primeraUbicacion || "Patagonia Chilena",
    title: banner?.titulo || "Tu pedazo de paraíso en el Sur de Chile",
    subtitle: banner?.subtitulo || "",
    descripcion:
      banner?.descripcion ||
      "Asesoría experta y cercana para encontrar tu terreno ideal. Descubre parcelas exclusivas con bosques milenarios, ríos cristalinos y vistas inigualables.",
    ctaLabel: "Ver Parcelas",
    ctaHref: "#proyectos",
    secondaryCtaLabel: "Agendar Asesoría",
    secondaryCtaHref: "#contacto",
    backgroundImage: banner?.imagen || LOGO_URL,
    backgroundAlt: banner?.titulo || BRAND_NAME,
  };
};

export const mapAbout = (bundle: ApiLandingBundle): AboutData => {
  const { sobreMi, testimonios } = bundle;

  return {
    eyebrow: "Nuestra Historia",
    title: sobreMi?.titulo || "Expertos en Tierras del Sur",
    body: sobreMi?.paragraph || "",
    image: sobreMi?.imagen || LOGO_URL,
    imageAlt: sobreMi?.titulo || BRAND_NAME,
    featuredQuote: testimonios[0]?.descripcion || undefined,
  };
};

export const mapProjects = (bundle: ApiLandingBundle): ProjectsSectionData => {
  const projects: Project[] = bundle.proyectos.map((proyecto, index) => ({
    id: proyecto.id,
    title: proyecto.nombre,
    price: proyecto.precio || "Consultar precio",
    image: proyecto.imagenCaratula || LOGO_URL,
    imageAlt: proyecto.nombre,
    ubicacion: proyecto.ubicacion || undefined,
    badge: proyecto.badgeLabel || undefined,
    badgeColor: proyecto.badgeColor || undefined,
    transitionDelayMs: (index % 3) * 100,
    descripcion: proyecto.descripcion || undefined,
    caracteristicas: proyecto.caracteristicas ?? [],
    lotesDisponibles: proyecto.lotesDisponibles,
    linkGoogleMaps: proyecto.linkGoogleMaps || undefined,
    link360Maps: proyecto.link360Maps || undefined,
    imagenesPopup: proyecto.imagenesPopup ?? [],
  }));

  return {
    eyebrow: "Nuestro Catálogo",
    title: "Propiedades Destacadas",
    subtitle:
      "Cada propiedad es seleccionada por su ubicación, acceso y potencial de conexión con la naturaleza.",
    projects,
  };
};

export const mapTestimonios = (bundle: ApiLandingBundle): TestimoniosSectionData => {
  const testimonios: Testimonio[] = bundle.testimonios.map((testimonio, index) => ({
    id: testimonio.id,
    quote: testimonio.descripcion || "",
    authorName: testimonio.nombreTestimonio,
    authorInitials: getInitials(testimonio.nombreTestimonio),
    media: testimonio.media || undefined,
    tipoMedia: testimonio.tipoMedia || undefined,
    transitionDelayMs: (index % 3) * 100,
  }));

  return {
    eyebrow: "Testimonios",
    title: "Historias de Nuestra Comunidad",
    subtitle: "Familias que ya encontraron su lugar en el sur.",
    testimonios,
  };
};

export const mapContact = (bundle: ApiLandingBundle): ContactData => ({
  headline: "Conversemos sobre tu Próxima Propiedad",
  subtitle:
    "Cuéntanos qué estás buscando y te ayudamos a encontrar el terreno ideal para tu proyecto de vida.",
  namePlaceholder: "Tu nombre",
  phonePlaceholder: "+56 9 ...",
  emailPlaceholder: "ejemplo@correo.com",
  messagePlaceholder: "Cuéntanos qué tipo de propiedad estás buscando...",
  submitLabel: "Enviar Mensaje",
  contact: mapContactInfo(bundle),
});

export const mapFooter = (bundle: ApiLandingBundle): FooterData => {
  const { misDatos } = bundle;
  const { line1, line2 } = getBrandNameLines(bundle);

  const socialLinks: SocialLink[] = [
    misDatos?.instagram
      ? { id: "instagram", name: "Instagram", href: misDatos.instagram, icon: "instagram" as const }
      : null,
    misDatos?.facebook
      ? { id: "facebook", name: "Facebook", href: misDatos.facebook, icon: "facebook" as const }
      : null,
  ].filter((link): link is SocialLink => link !== null);

  return {
    logo: misDatos?.logo || LOGO_URL,
    logoAlt: bundle.fullName || BRAND_NAME,
    brandNameLine1: line1,
    brandNameLine2: line2,
    description: FOOTER_DESCRIPTION,
    copyright: FOOTER_COPYRIGHT,
    linkGroup: FOOTER_LINK_GROUP,
    socialLinks,
    contact: mapContactInfo(bundle),
  };
};
