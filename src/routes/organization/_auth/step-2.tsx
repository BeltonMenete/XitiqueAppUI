import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { FormError } from "#/components/FormError";
// Importação do novo componente reutilizável
import { AuthSidebar } from "#/components/AuthSidebar";

export const Route = createFileRoute("/organization/_auth/step-2")({
  component: StepTwo,
});

function StepTwo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomeResponsavel: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

    if (
      !form.nomeResponsavel.trim() ||
      form.nomeResponsavel.trim().length < 3
    ) {
      newErrors.nomeResponsavel = "Introduza o nome completo do responsável.";
    }

    if (!form.email || !form.email.includes("@")) {
      newErrors.email = "Por favor, introduza um e-mail corporativo válido.";
    }

    if (form.password.length < 8) {
      newErrors.password = "A palavra-passe deve ter pelo menos 8 caracteres.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "As palavras-passe introduzidas não coincidem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      // Remove o efeito após a animação de 400ms para reiniciar nos próximos cliques inválidos
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    console.log("Step 2 data valid:", form);
    navigate({ to: "/organization/step-3" });
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
      {/* Estilo CSS Isolado para o Shake apenas das mensagens de erro */}
      <style>{`
        @keyframes shakeErrorText {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-4px); }
          30%, 60%, 90% { transform: translateX(4px); }
        }
        .animate-shake-error {
          animation: shakeErrorText 0.4s ease-in-out;
          display: inline-block;
        }
      `}</style>

      {/* Painel Esquerdo Centralizado e Reutilizável */}
      <AuthSidebar />

      {/* Painel Direito - Container do Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-md my-auto transition-all ease-out animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-1.5 select-none">
            <span className="text-xs font-bold text-emerald-700 tracking-wider">
              PASSO 2 DE 5
            </span>
            <span className="text-xs text-gray-400 font-medium transition-colors duration-300 hover:text-gray-600">
              Conta do Responsável
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: "40%" }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
            Configurar Acesso
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Insira os dados da pessoa responsável pela gestão da conta.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col space-y-0.5"
          >
            {/* Campo: Nome Completo do Responsável */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Nome Completo do Responsável
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 group-focus-within:scale-105 transition-all duration-200" />
                <input
                  type="text"
                  value={form.nomeResponsavel}
                  onChange={(e) =>
                    setForm({ ...form, nomeResponsavel: e.target.value })
                  }
                  placeholder="Ex: Amílcar Alface"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.nomeResponsavel ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.nomeResponsavel ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.nomeResponsavel || ""} />
                </div>
              </div>
            </div>

            {/* Campo: Email */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 group-focus-within:scale-105 transition-all duration-200" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="exemplo@xitique.co.mz"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.email ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.email ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.email || ""} />
                </div>
              </div>
            </div>

            {/* Campo: Palavra-passe */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 group-focus-within:scale-105 transition-all duration-200" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-150"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.password ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.password ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.password || ""} />
                </div>
              </div>
            </div>

            {/* Campo: Confirmar Palavra-passe */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Confirmar Palavra-passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 group-focus-within:scale-105 transition-all duration-200" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-150"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.confirmPassword ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.confirmPassword ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.confirmPassword || ""} />
                </div>
              </div>
            </div>

            {/* Ações de Navegação */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/organization/step-1" })}
                className="group/back col-span-1 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 text-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
                <span>Voltar</span>
              </button>

              <button
                type="submit"
                className="group/btn col-span-2 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/10 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
