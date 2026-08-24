import { useState, type FormEvent } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import type { ContactData, Project } from "../data/interfaces";

interface ContactSectionProps {
  data: ContactData;
  projects: Project[];
}

const inputClasses =
  "bg-surface-container border border-outline-variant rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors";

export const ContactSection = ({ data, projects }: ContactSectionProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectTitle = projects.find((project) => project.id === projectId)?.title;

    const lines = [
      "Hola, me gustaría recibir más información.",
      name && `Nombre: ${name}`,
      phone && `Teléfono: ${phone}`,
      email && `Correo: ${email}`,
      projectTitle && `Proyecto de interés: ${projectTitle}`,
      message && `Mensaje: ${message}`,
    ].filter(Boolean);

    const whatsappUrl = `${data.contact.whatsappLink}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="py-stack-lg px-margin-mobile md:px-gutter max-w-[1280px] mx-auto scroll-mt-2"
      id="contacto"
    >
      <div className="bg-surface-container-low rounded-[32px] overflow-hidden soft-shadow grid grid-cols-1 lg:grid-cols-2 fade-and-slide-up visible">
        <div className="bg-primary text-on-primary p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-container rounded-full opacity-30" />

          <h2 className="font-headline-lg text-headline-lg font-semibold mb-stack-sm relative z-10">
            {data.headline}
          </h2>
          <p className="font-body-md text-body-md text-primary-fixed mb-stack-md relative z-10">
            {data.subtitle}
          </p>

          <div className="flex flex-col gap-4 relative z-10">
            {data.contact.email && (
              <a
                className="flex items-center gap-3 hover:text-primary-fixed transition-colors"
                href={`mailto:${data.contact.email}`}
              >
                <Mail className="w-5 h-5" />
                {data.contact.email}
              </a>
            )}
            {data.contact.phone && (
              <a
                className="flex items-center gap-3 hover:text-primary-fixed transition-colors"
                href={`tel:${data.contact.phone}`}
              >
                <Phone className="w-5 h-5" />
                {data.contact.phone}
              </a>
            )}
          </div>
        </div>

        <div className="p-10 md:p-16">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className={inputClasses}
              placeholder={data.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <input
              type="tel"
              className={inputClasses}
              placeholder={data.phonePlaceholder}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <input
              type="email"
              className={inputClasses}
              placeholder={data.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <select
              id="contact-project"
              className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
            >
              <option value="" disabled>
                Selecciona un proyecto de interés
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <textarea
              className={inputClasses}
              placeholder={data.messagePlaceholder}
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors soft-shadow"
            >
              {data.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
