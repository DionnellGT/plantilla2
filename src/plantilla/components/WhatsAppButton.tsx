import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  href: string;
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export const WhatsAppButton = ({
  href,
  className,
  showIcon = true,
  label = "WhatsApp",
}: WhatsAppButtonProps) => {
  return (
    <a
      className={cn(
        "inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors",
        className
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {showIcon && <MessageSquare className="size-[18px]" />}
      {label}
    </a>
  );
};
