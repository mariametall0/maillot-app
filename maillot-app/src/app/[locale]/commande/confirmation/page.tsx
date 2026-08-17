import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ConfirmationPage() {
  const t = useTranslations("Confirmation");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <p className="text-black/60 mb-1">{t("body1")}</p>
      <p className="text-black/60 mb-8 text-sm">{t("body2")}</p>
      <div className="flex justify-center gap-3">
        <Link href="/suivi" className="rounded-full bg-blue-700 text-white font-semibold px-6 py-3">
          {t("trackOrder")}
        </Link>
        <Link href="/catalogue" className="rounded-full border border-black/15 font-semibold px-6 py-3">
          {t("continueShopping")}
        </Link>
      </div>
    </div>
  );
}
