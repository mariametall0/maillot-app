"use client";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Erreur de connexion.");
        setLoading(false);
      }
    } catch {
      setError("Erreur réseau ou serveur inaccessible.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#071A35] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#0D2850] border border-[#16A34A]/40 text-white flex items-center justify-center font-black text-lg">
            N°10
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            NUMÉRO <span className="text-[#16A34A]">10</span>
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-widest">
            Espace Administrateur
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleLogin}
          className="bg-[#0D2850] rounded-2xl border border-slate-700 p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">
              🔐 Mot de passe Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              className="w-full bg-[#071A35] border border-slate-700 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-[#16A34A] transition-colors placeholder:text-slate-600 font-mono"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold px-4 py-3 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all"
          >
            {loading ? "Vérification..." : "Se connecter →"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          Session sécurisée · Expiration automatique 8h
        </p>
      </div>
    </div>
  );
}
