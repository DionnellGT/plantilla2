import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Mail, Phone } from "lucide-react";
import type { ContactData, Project } from "../data/interfaces";

interface ContactSectionProps {
  data: ContactData;
  projects: Project[];
}

interface ContactForm {
  nombre: string;
  telefono: string;
  email: string;
  proyecto: string;
  mensaje: string;
}


const inputClasses =
  "bg-surface-container border border-outline-variant rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors";

export const ContactSection = ({ data, projects }: ContactSectionProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await fetch(
      "https://script.google.com/macros/s/AKfycbwGPBJS5EcPyn16uChhE1KTWhTsmAtpGnmt5iontG9uxIM2QDRt01s7_Mm8hhswUgkh/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
      );
      if (res.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setIsSuccess(false);
      }
    } catch {
      setIsSuccess(false);
    }
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
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact.email}&su=Consulta&body=Hola,%20me%20interesa...`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
                {data.contact.email}
              </a>
            )}
            {data.contact.phone && (
              <a
                className="flex items-center gap-3 hover:text-primary-fixed transition-colors"
                href={`https://wa.me/${data.contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                {data.contact.phone}
              </a>
            )}
          </div>
        </div>

        <div className="p-10 md:p-16">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              type="text"
              {...register("nombre", { required: true })}
              className={inputClasses}
              placeholder={data.namePlaceholder}
              />
              {errors.nombre && (
                <span className="text-red-400 text-[11px]">Este campo es obligatorio</span>
              )}
            <input
              type="tel"
              className={inputClasses}
              placeholder={data.phonePlaceholder}
              {...register("telefono", { required: true })}
            />
            {errors.telefono && (
              <span className="text-red-400 text-[11px]">Este campo es obligatorio</span>
            )}
            <input
              type="email"
              className={inputClasses}
              placeholder={data.emailPlaceholder}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400 text-[11px]">Este campo es obligatorio</span>
            )}
            <Controller
              name="proyecto"
              control={control}
              rules={{
                      validate: (v) => (v && v !== "") || "Debes seleccionar un proyecto",
                    }}
              render={({ field }) => (
              <select
                id="contact-project"
                className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
                {...field}
              >
                <option value="" >
                  Selecciona un proyecto de interés
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.title}>
                    {project.title}
                  </option>
                ))}
              </select>
              )}
            />
            {errors.proyecto && (
              <span className="text-red-400 text-[11px]">{errors.proyecto.message}</span>
            )}
            <textarea
              className={inputClasses}
              placeholder={data.messagePlaceholder}
              rows={4}
              {...register("mensaje", { required: true })}
            />
            {errors.mensaje && (
              <span className="text-red-400 text-[11px]">Este campo es obligatorio</span>
            )}
            {/* Feedback */}
            {isSuccess && (
              <p className="text-green-600 font-manrope text-[13px] text-center">
                ✓ Mensaje enviado. ¡Pronto nos pondremos en contacto!
              </p>
            )}
            <button
              type="submit"
              className="bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors soft-shadow"
            >
              {isSubmitting ? "Enviando..." : data.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
