"use client";

import { useLocale } from "next-intl";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber = "22243195103" }: WhatsAppButtonProps) {
  const locale = useLocale();

  const labels: Record<string, { tooltip: string; message: string }> = {
    fr: {
      tooltip: "Besoin d'aide ? Écrivez-nous sur WhatsApp",
      message: "Bonjour Halwarkits Sport, je souhaite avoir des informations sur vos maillots et équipements.",
    },
    ar: {
      tooltip: "هل تحتاج مساعدة؟ راسلنا عبر واتساب",
      message: "مرحباً هلواركيتس سبورت، أود الاستفسار عن القمصان والمعدات المتوفرة.",
    },
    en: {
      tooltip: "Need help? Chat with us on WhatsApp",
      message: "Hello Halwarkits Sport, I would like more information about your jerseys and sports gear.",
    },
  };

  const current = labels[locale] || labels.fr;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(current.message)}`;

  return (
    <aside
      aria-label="Contact WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 group animate-pop-in"
    >
      {/* Tooltip / Label visible on desktop hover or mobile tap */}
      <div className="hidden sm:flex items-center gap-2 bg-[#071A35] text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-xl border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>{current.tooltip}</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Halwarkits Sport"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Pulsing halo ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-8 h-8 fill-current relative z-10 drop-shadow-sm"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.889 9.886m8.813-18.7c-2.355-2.356-5.485-3.654-8.813-3.655-6.866 0-12.454 5.586-12.457 12.455 0 2.196.572 4.339 1.66 6.232l-1.764 6.444 6.592-1.729c1.83 1 3.896 1.528 6.002 1.529h.005c6.864 0 12.454-5.587 12.457-12.457a12.38 12.38 0 00-3.653-8.819" />
        </svg>

        {/* Small "Online" notification pill */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-300 border-2 border-white rounded-full"></span>
      </a>
    </aside>
  );
}
