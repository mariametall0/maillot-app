"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/compte");
      } else {
        setError(data.error || "Numéro ou mot de passe incorrect.");
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
            Connectez-vous à votre compte client
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-[#F3F4F6] rounded-3xl border border-slate-200 p-8 shadow-xs">
          <form onSubmit={handleLogin} className="space-y-4">
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
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Mot de passe *
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || phone.length !== 8 || !password}
              className="w-full rounded-2xl btn-green-action text-white font-black text-sm uppercase tracking-wider py-4 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter →"}
            </button>
          </form>

          {/* Inscription link */}
          <div className="text-center pt-6 mt-6 border-t border-slate-200 text-xs text-slate-600">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link href="/compte/register" className="font-black text-[#16A34A] hover:underline">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
