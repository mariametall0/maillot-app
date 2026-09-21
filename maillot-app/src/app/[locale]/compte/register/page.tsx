"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneValid = /^[0-9]{8}$/.test(phone.trim());
  const passwordsMatch = password.length >= 6 && password === confirmPassword;
  const canSubmit = name.trim().length >= 2 && phoneValid && address.trim().length >= 2 && passwordsMatch;

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/compte");
      } else {
        setError(data.error || "Erreur lors de la création du compte.");
        setLoading(false);
      }
    } catch {
      setError("Erreur de connexion réseau.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#071A35] text-white flex items-center justify-center font-black text-lg">
            N°10
          </div>
          <h1 className="text-2xl font-black text-[#071A35] uppercase tracking-tight">
            NUMÉRO <span className="text-[#16A34A]">10</span>
          </h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Créez votre compte client en 30 secondes
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-[#F3F4F6] rounded-3xl border border-slate-200 p-8 shadow-xs">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Nom & Prénom *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Mohamed Ould Ahmed"
                className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Numéro de téléphone (8 chiffres) *
              </label>
              <input
                type="tel"
                required
                maxLength={8}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 22345678"
                className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
              />
              {phone.length > 0 && !phoneValid && (
                <p className="text-xs text-red-600 mt-1 font-bold">⚠️ Le numéro doit comporter exactement 8 chiffres.</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Ville & Quartier de livraison (Mauritanie) *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Nouakchott (Tevragh Zeina), Nouadhibou..."
                className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Mot de passe (min 6 caractères) *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-red-600 mt-1 font-bold">⚠️ Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={`w-full rounded-2xl text-white font-black text-sm uppercase tracking-wider py-4 shadow-md transition-all ${
                canSubmit
                  ? "btn-green-action cursor-pointer"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
              }`}
            >
              {loading ? "Création du compte..." : canSubmit ? "Créer mon compte →" : "🔒 Remplir tous les champs"}
            </button>
          </form>

          {/* Login link */}
          <div className="text-center pt-6 mt-6 border-t border-slate-200 text-xs text-slate-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/compte/login" className="font-black text-[#16A34A] hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
