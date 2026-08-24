import { useEffect, useState } from "react";
import { Mountain, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";
import type { NavigationData } from "../data/interfaces";

interface HeaderProps {
  data: NavigationData;
  onOpenMobileMenu: () => void;
}

export const Header = ({ data, onOpenMobileMenu }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-surface/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between px-margin-mobile md:px-gutter py-4">
        <a className="flex items-center gap-2" href="#">
          <Mountain className="text-primary w-7 h-7" />
          <span className="font-headline-md text-headline-md font-semibold text-on-surface leading-tight flex flex-col">
            <span>{data.brandNameLine1}</span>
            {data.brandNameLine2 && <span>{data.brandNameLine2}</span>}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {data.links.map((link) => (
            <a
              key={link.id}
              className="font-label-md text-label-xl font-bold text-on-surface-variant hover:text-primary transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 text-amber-100">
          <WhatsAppButton href={data.contact.whatsappLink} />
        </div>

        <button
          className="md:hidden text-on-surface"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú"
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>
    </header>
  );
};
