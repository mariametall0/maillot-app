import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">Commande envoyée !</h1>
      <p className="text-black/60 mb-1">
        Merci pour ta commande. Tu peux suivre son statut à tout moment avec ton numéro de téléphone.
      </p>
      <p className="text-black/60 mb-8 text-sm">
        Pour le paiement à la livraison, on te rappelle pour confirmer avant préparation.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/suivi" className="rounded-full bg-blue-700 text-white font-semibold px-6 py-3">
          Suivre ma commande
        </Link>
        <Link href="/catalogue" className="rounded-full border border-black/15 font-semibold px-6 py-3">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
