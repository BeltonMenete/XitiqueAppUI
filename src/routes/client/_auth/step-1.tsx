// /routes/client/_auth/step-1.tsx
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  LogIn,
  Lock,
  ShieldCheck,
  Landmark,
  HelpCircle,
} from "lucide-react";
import { FormError } from "#/components/FormError";
import { APP_NAME } from "#/lib/constants";

export const Route = createFileRoute("/client/_auth/step-1")({
  component: StepOneRegistration,
});

function StepOneRegistration() {
  const navigate = useNavigate();

  // Estados do formulário (O estado de telefone armazena apenas os dígitos úteis pós-+258)
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Estados de feedback visual e validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  // Formatação em tempo real para o padrão nacional de Moçambique: 8X XXX XXXX
  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 9);

    if (digitsOnly.length <= 2) {
      setPhone(digitsOnly);
    } else if (digitsOnly.length <= 5) {
      setPhone(`${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2)}`);
    } else {
      setPhone(
        `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 9)}`,
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    const rawDigits = phone.replace(/\s/g, "");

    // Validação OBRIGATÓRIA dos Termos de Serviço
    if (!agreeTerms) {
      newErrors.terms = "Deve aceitar os Termos de Serviço para avançar.";
    }

    // Validação OBRIGATÓRIA do Número de Telefone
    if (!rawDigits) {
      newErrors.phone = "O número de telefone é obrigatório.";
    } else if (rawDigits.length !== 9) {
      newErrors.phone =
        "O número de telefone deve conter exatamente 9 dígitos.";
    } else {
      const validPrefixes = ["82", "83", "84", "85", "86", "87"];
      const hasValidPrefix = validPrefixes.some((prefix) =>
        rawDigits.startsWith(prefix),
      );

      if (!hasValidPrefix) {
        newErrors.phone =
          "Introduza um prefixo nacional válido (ex: 84, 85, 82).";
      }
    }

    // Validação opcional do PIN, caso iniciado (mínimo de 4 e máximo de 6 dígitos)
    if (pin.length > 0 && (pin.length < 4 || pin.length > 6)) {
      newErrors.pin = "O PIN deve conter de 4 a 6 dígitos numéricos.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    // Envia o valor final tratado contendo o DDI completo internacional
    const finalPhoneNumber = `+258${rawDigits}`;
    console.log("Valores válidos do Passo 1:", {
      phone: finalPhoneNumber,
      pin,
    });
    navigate({ to: "/client/step-2" });
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
      {/* Estilos Globais CSS Inline Isolados */}
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


      {/* Painel Direito - Estrutura ultra-compacta anti-scroll baseada no Step 2 */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 sm:p-8 bg-gray-50/50 h-full overflow-y-auto relative">
        {/* Cabeçalho Utilitário Superior */}
        <div className="flex justify-between items-center w-full max-w-md mx-auto pt-1">
          <div className="flex items-center gap-2 select-none">
            <img
              alt="Xitique Logo"
              className="w-8 h-8 object-contain"
              src="/xitique-logo.svg"
            />
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <Link
            to="/login"
            className="text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center gap-1 transition-all duration-300"
          >
            <LogIn size={14} />
            Entrar
          </Link>
        </div>

        {/* Bloco Centralizador do Formulário */}
        <div className="w-full max-w-md mx-auto my-auto py-2 transition-all ease-out animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Indicador de Etapas (Stepper) */}
          <div className="flex items-center justify-between mb-1 select-none">
            <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider">
              PASSO 1 DE 5
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              Registro de Ticante
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-1 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: "20%" }}
            />
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
            Criar conta de Ticante
          </h1>
          <div className="bg-emerald-50/50 rounded-xl p-3 border-l-4 border-emerald-600 mb-4">
            <p className="text-xs text-gray-600 font-body leading-relaxed">
              <strong className="text-emerald-700">
                Contacto Obrigatório:
              </strong>{" "}
              Insira o seu número de telefone celular ativo. Este número
              permitirá que o gestor da organização escolhida entre em contacto
              consigo para validar e ativar a sua adesão.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {/* Campo de Telefone Celular (Obrigatório) */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold text-gray-700"
                htmlFor="phone"
              >
                Número de Telefone{" "}
                <span className="text-red-500 font-normal">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-mono font-bold text-sm tracking-wider select-none">
                  +258
                </span>
                <input
                  id="phone"
                  type="tel"
                  maxLength={11} // Comporta "8X XXX XXXX" incluindo os espaços gerados pela máscara
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full pl-16 pr-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all font-mono text-sm tracking-wide text-gray-900 ${errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    }`}
                  placeholder="8X XXX XXXX"
                />
              </div>
              <div className="h-3 flex items-center pl-1">
                <div
                  className={`transition-opacity duration-150 ${errors.phone ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.phone ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.phone || ""} />
                </div>
              </div>
            </div>

            {/* Campo de PIN de Acesso com Tooltip do Design System */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 relative group">
                  <label
                    className="block text-xs font-semibold text-gray-700 select-none"
                    htmlFor="pin"
                  >
                    PIN de Acesso{" "}
                    <span className="text-gray-400 font-normal">
                      (Opcional)
                    </span>
                  </label>

                  {/* Ícone Disparador do Tooltip */}
                  <div className="text-gray-400 group-hover:text-emerald-600 transition-colors cursor-help pt-0.5">
                    <HelpCircle size={13} />
                  </div>

                  {/* Tooltip integrado ao Design System (Bento/Tonal Layering) */}
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-white border border-emerald-100 text-[11px] text-gray-600 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 leading-relaxed font-medium">
                    O PIN configurado permitirá que faça login na nossa{" "}
                    <strong className="text-emerald-700 font-semibold">
                      aplicação móvel
                    </strong>{" "}
                    para acompanhar o progresso das suas poupanças e extratos em
                    tempo real.
                    {/* Seta Indicativa Alinhada com as Cores */}
                    <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-white border-r border-b border-emerald-100 rotate-45" />
                  </div>
                </div>

                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider select-none">
                  4 a 6 dígitos
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-11 pr-12 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono text-sm tracking-[0.4em] placeholder:tracking-normal text-gray-900"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors text-xs font-semibold select-none"
                >
                  {showPin ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <div className="h-3 flex items-center pl-1">
                <div
                  className={`transition-opacity duration-150 ${errors.pin ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.pin ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.pin || ""} />
                </div>
              </div>
            </div>

            {/* Caixa de Seleção dos Termos e Condições */}
            <div className="space-y-1">
              <div className="flex items-start gap-3 p-3 bg-gray-100/70 rounded-xl border border-gray-200/50 select-none">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  className="text-xs text-gray-500 font-body leading-snug cursor-pointer"
                  htmlFor="terms"
                >
                  Aceito voluntariamente os{" "}
                  <a
                    className="text-emerald-600 font-bold hover:underline"
                    href="#"
                  >
                    Termos de Serviço
                  </a>{" "}
                  e a{" "}
                  <a
                    className="text-emerald-600 font-bold hover:underline"
                    href="#"
                  >
                    Política de Privacidade
                  </a>{" "}
                  do Xitique Digital.
                </label>
              </div>
              <div className="h-3 flex items-center pl-1">
                <div
                  className={`transition-opacity duration-150 ${errors.terms ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.terms ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.terms || ""} />
                </div>
              </div>
            </div>

            {/* Botão Avançar */}
            <button
              type="submit"
              className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-1 hover:shadow-lg hover:shadow-emerald-700/10"
            >
              <span>Continuar para Perfil</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Rodapé de Segurança Integrado */}
        <div className="pt-2 border-t border-gray-200/60 text-center w-full max-w-sm mx-auto">
          <div className="flex justify-center gap-x-6 gap-y-1 mb-2">
            <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Ambiente Seguro
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              <Landmark className="h-3.5 w-3.5 text-emerald-500" />
              Banco Registrado
            </div>
          </div>
          <p className="text-[8px] text-gray-400 tracking-widest uppercase">
            © {new Date().getFullYear()} XITIQUE DIGITAL. TODOS OS DIREITOS
            RESERVADOS.
          </p>
        </div>
      </div>
    </div>
  );
}
