import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { EmailInput } from "#/components/EmailInput";
import { FormError } from "#/components/FormError";
import { LOGIN_SUBMIT_DELAY, APP_NAME } from "#/lib/constants";
import { Ring2 } from "ldrs/react";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/_auth/forgot")({
  component: ForgotPassword,
});

type RecoveryMethod = "email" | "phone";

function ForgotPassword() {
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [email, setEmail] = useState("");
  // Inicializa já com o prefixo nacional obrigatório
  const [phone, setPhone] = useState("+258 ");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (method === "email" && (!email || !email.includes("@"))) {
      newErrors.email = "Por favor, introduza um e-mail válido.";
    }

    if (method === "phone") {
      // Remove espaços para validar o tamanho real dos números crus
      const rawNumbers = phone.replace(/\s/g, ""); // Ex: +258841234567

      // Valida se tem o tamanho completo (+258 + 9 dígitos = 13 caracteres)
      if (rawNumbers.length !== 13) {
        newErrors.phone =
          "O número de telefone deve conter exatamente 9 dígitos.";
      } else {
        // Extrai apenas os 9 dígitos para validar o prefixo das operadoras moçambicanas
        const digits = rawNumbers.substring(4);
        const validPrefixes = ["82", "83", "84", "85", "86", "87"];
        const hasValidPrefix = validPrefixes.some((prefix) =>
          digits.startsWith(prefix),
        );

        if (!hasValidPrefix) {
          newErrors.phone =
            "Introduza um número de celular válido de Moçambique.";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    console.log(`Validando OTP (${method}):`, otpCode);
    setIsLoading(false);
  };

  // Impede que o utilizador apague o prefixo e formata a digitação
  const handlePhoneChange = (value: string) => {
    // Se o utilizador tentar apagar o prefixo fixo, força-o de volta
    if (!value.startsWith("+258 ")) {
      setPhone("+258 ");
      return;
    }

    // Filtra apenas o que vem após o "+258 " mantendo apenas números
    const digitsOnly = value.substring(5).replace(/\D/g, "");

    // Limita a 9 dígitos após o prefixo
    if (digitsOnly.length <= 9) {
      setPhone(`+258 ${digitsOnly}`);
    }
  };

  // Placeholder inteligente que mostra os traços restantes apenas para os 9 dígitos
  const getPhonePlaceholder = () => {
    const digitsLength = phone.substring(5).length;
    return "_________".slice(digitsLength);
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden">
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

      <div className="relative w-full max-w-4xl">
        {/* Imagem Lateral (Desktop) */}
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0">
          <img
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card do Formulário */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 lg:p-10 min-h-125 flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-5">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <img
                  src="/xitique-logo.svg"
                  alt={APP_NAME}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-2xl font-semibold text-gray-900">
                  {APP_NAME}
                </span>
              </div>
              <Link
                to="/login"
                className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:-translate-x-0.5"
              >
                <ArrowLeft size={14} /> Voltar ao login
              </Link>
            </div>

            {/* Conteúdo Dinâmico */}
            <div className="relative flex-1 flex flex-col justify-center">
              {/* PASSO 1: Solicitação do Código (E-mail ou Telefone) */}
              <div
                className={`space-y-5 transition-all duration-500 ease-in-out absolute inset-x-0 ${isSubmitted ? "opacity-100 pointer-events-auto scale-100 z-10" : "opacity-0 pointer-events-none scale-95 z-0"}`}
                style={{
                  opacity: !isSubmitted ? 1 : 0,
                  pointerEvents: !isSubmitted ? "auto" : "none",
                }}
              >
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-0.5">
                    Recuperar senha
                  </h1>
                  <p className="text-gray-500 text-xs">
                    Escolha o método mais acessível para si de momento.
                  </p>
                </div>

                {/* Alternador de Método */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setMethod("email");
                      setErrors({});
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 active:scale-[0.99] cursor-pointer focus:outline-none ${
                      method === "email"
                        ? "bg-white text-gray-900 shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/40"
                    }`}
                  >
                    <Mail size={14} /> E-mail
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMethod("phone");
                      setErrors({});
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 active:scale-[0.99] cursor-pointer focus:outline-none ${
                      method === "phone"
                        ? "bg-white text-gray-900 shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/40"
                    }`}
                  >
                    <Phone size={14} /> Telefone / SMS
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col"
                >
                  <div className="w-full relative h-27.5">
                    {/* Input de E-mail */}
                    <div
                      className={`absolute inset-x-0 bottom-0 flex flex-col transition-all duration-200 ease-in-out ${method === "email" ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-2 pointer-events-none z-0"}`}
                    >
                      <EmailInput
                        value={email}
                        onChange={setEmail}
                        placeholder="exemplo@email.com"
                      />
                      <div className="h-5 flex items-center pl-1 mt-1.5">
                        <div
                          className={`text-xs transition-opacity duration-150 ${errors.email ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.email ? "animate-shake-error" : ""}`}
                        >
                          <FormError message={errors.email || ""} />
                        </div>
                      </div>
                    </div>

                    {/* Input de Contacto */}
                    <div
                      className={`absolute inset-x-0 bottom-0 flex flex-col space-y-1.5 transition-all duration-200 ease-in-out ${method === "phone" ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-2 pointer-events-none z-0"}`}
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Confirmar contacto celular
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          maxLength={14} // +258 mais 9 dígitos = 14 caracteres no total com o espaço
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder={getPhonePlaceholder()}
                          className="w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:border-(--color-mint-leaf-500) focus:ring-2 focus:ring-(--color-mint-leaf-500)/20 transition-all duration-200 placeholder-gray-400 font-mono tracking-widest font-semibold bg-white text-gray-900"
                        />
                      </div>
                      <div className="h-5 flex items-center pl-1">
                        <div
                          className={`text-xs transition-opacity duration-150 ${errors.phone ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.phone ? "animate-shake-error" : ""}`}
                        >
                          <FormError message={errors.phone || ""} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 mt-4 rounded-2xl text-white font-semibold text-base bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Ring2
                          size="16"
                          stroke="3"
                          strokeLength="0.20"
                          bgOpacity="0.1"
                          speed="0.4"
                          color="white"
                        />
                        <span>A enviar...</span>
                      </div>
                    ) : (
                      <span>Enviar código</span>
                    )}
                  </button>
                </form>
              </div>

              {/* PASSO 2: Validação Única do Código OTP */}
              <div
                className={`space-y-5 transition-all duration-500 ease-in-out absolute inset-x-0 ${isSubmitted ? "opacity-100 pointer-events-auto scale-100 z-10" : "opacity-0 pointer-events-none scale-95 z-0"}`}
                style={{
                  opacity: isSubmitted ? 1 : 0,
                  pointerEvents: isSubmitted ? "auto" : "none",
                }}
              >
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 mb-0.5">
                    {method === "email"
                      ? "Confirmar código do e-mail"
                      : "Confirmar código SMS"}
                  </h1>
                  <p className="text-gray-500 text-xs">
                    Introduza o código de 6 dígitos enviado para{" "}
                    <strong className="text-gray-900 font-mono tracking-wide">
                      {method === "email" ? email : phone}
                    </strong>
                    .
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="000000"
                    className="w-full text-center tracking-[1em] font-mono text-xl py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-(--color-mint-leaf-500) focus:ring-2 focus:ring-(--color-mint-leaf-500)/20 transition-all duration-200 placeholder-gray-300"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 6}
                    className="w-full py-3 rounded-xl text-white font-semibold text-base bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md disabled:opacity-40 disabled:shadow-none disabled:pointer-events-none cursor-pointer"
                  >
                    {isLoading ? "A validar..." : "Verificar Código"}
                  </button>
                </form>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setOtpCode("");
                    }}
                    className="text-gray-400 hover:text-gray-900 hover:underline cursor-pointer transition-colors"
                  >
                    {method === "email" ? "Alterar e-mail" : "Alterar número"}
                  </button>
                  <button
                    type="button"
                    className="font-medium text-(--color-sky-blue-600) hover:text-(--color-sky-blue-700) hover:underline cursor-pointer transition-colors"
                  >
                    {method === "email" ? "Reenviar e-mail" : "Reenviar SMS"}
                  </button>
                </div>
              </div>
            </div>

            {/* Rodapé */}
            <p className="text-center text-[10px] text-gray-400 pt-3 border-t border-gray-100">
              © {new Date().getFullYear()} Xitique. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
