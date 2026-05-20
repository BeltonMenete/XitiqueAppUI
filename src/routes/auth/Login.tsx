import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, User, Lock, UserPlus } from "lucide-react";

export const Route = createFileRoute("/auth/Login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        {/* Left image - moved 32px to the left */}
        <div className="hidden lg:block absolute inset-y-0 -left-8 w-3/5 rounded-3xl overflow-hidden">
          <img
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right card - overlaps left image */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-mint-leaf-500)] rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">×</span>
                </div>
                <span className="text-3xl font-semibold text-gray-900">
                  Xitique
                </span>
              </div>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-sky-blue-600)]"
              >
                <UserPlus size={18} />
                Criar conta
              </a>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                Entrar
              </h1>
              <p className="text-gray-600">Acesse a sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email ou Nome de Usuário
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)]"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Palavra-passe
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-[var(--color-sky-blue-600)] font-medium"
                >
                  Esqueceu a palavra-passe?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg bg-[var(--color-mint-leaf-500)] hover:bg-[var(--color-mint-leaf-600)] transition-all shadow-lg"
              >
                Entrar
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 pt-2">
              © 2025 Xitique. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
