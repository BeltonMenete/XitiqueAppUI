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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl mx-auto overflow-hidden bg-white shadow-xl rounded- max-h-">
        {/* Left Side - Image */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <img
            src="/xitique-left-panel.avif"
            alt="Xitique Promo"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-transparent" />
        </div>

        {/* Right Side - Login Panel */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12 rounded-">
          <div className="w-full max-w-md space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-mint-leaf-500)] rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold leading-none">
                    ×
                  </span>
                </div>
                <span className="text-3xl font-semibold text-gray-900">
                  Xitique
                </span>
              </div>

              {/* Criar conta with Icon */}
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-sky-blue-600)] hover:text-[var(--color-sky-blue-700)] transition-colors"
              >
                <UserPlus size={18} />
                Criar conta
              </a>
            </div>

            <div>
              <h1 className="text-[2.1rem] font-semibold text-gray-900 mb-1">
                Entrar
              </h1>
              <p className="text-gray-600">Acesse a sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
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
                    className="w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] text-base"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
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
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] text-base"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-[var(--color-sky-blue-600)] hover:text-[var(--color-sky-blue-700)] font-medium"
                >
                  Esqueceu a palavra-passe?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg
                           bg-[var(--color-mint-leaf-500)]
                           hover:bg-[var(--color-mint-leaf-600)]
                           active:bg-[var(--color-mint-leaf-700)]
                           transition-all duration-200 shadow-lg"
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
