import { X, Mountain } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import type { NavigationData } from "../data/interfaces";

interface MobileMenuProps {
  data: NavigationData;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ data, isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full h-full flex flex-col px-margin-mobile py-stack-sm">
        <div className="flex justify-between items-center mb-stack-lg">
          <div className="flex items-center gap-2">
            {data.logo ? (
              <img src={data.logo} alt={data.logoAlt} className="h-9 w-auto object-contain" />
            ) : (
              <>
                <Mountain className="text-primary w-7 h-7" />
                <span className="font-headline-md text-headline-md font-semibold text-on-surface leading-tight flex flex-col">
                  <span>{data.brandNameLine1}</span>
                  {data.brandNameLine2 && <span>{data.brandNameLine2}</span>}
                </span>
              </>
            )}
          </div>
          <button className="text-on-surface" onClick={onClose} aria-label="Cerrar menú">
            <X className="w-7 h-7" />
          </button>
        </div>

        <nav className="flex flex-col gap-stack-sm font-headline-md text-headline-md font-semibold text-on-surface">
          {data.links.map((link) => (
            <a key={link.id} href={link.href} onClick={onClose}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto text-amber-100">
          <WhatsAppButton href={data.contact.whatsappLink} className="w-full justify-center" />
        </div>
      </div>
    </div>
  );
};
