import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Building2, ArrowRight } from "lucide-react";
import { PROVINCIAS_MZ } from "../../../data/mozambique";
import { FormError } from "#/components/FormError";

export const Route = createFileRoute("/organization/_auth/step-1")({
  component: StepOne,
});

function StepOne() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    provincia: "",
    distrito: "",
    telefone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  const distritos =
    PROVINCIAS_MZ.find((p) => p.nome === form.provincia)?.distritos || [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

    if (!form.nome.trim() || form.nome.trim().length < 3) {
      newErrors.nome =
        "O nome da organização deve ter pelo menos 3 caracteres.";
    }

    if (!form.provincia) {
      newErrors.provincia = "Selecione uma província.";
    }
    if (!form.distrito) {
      newErrors.distrito = "Selecione um distrito.";
    }

    const telefoneLimpo = form.telefone.replace(/\D/g, "");
    const numRegex = /^(82|83|84|85|86|87)\d{7}$/;

    if (!telefoneLimpo) {
      newErrors.telefone = "O número de telefone é obrigatório.";
    } else if (!numRegex.test(telefoneLimpo)) {
      newErrors.telefone =
        "Número inválido. Deve começar com 82, 83, 84, 85, 86 ou 87 e ter 9 dígitos.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      // Remove o efeito após 400ms para permitir novas execuções no clique
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    console.log("Step 1 data valid:", form);
    navigate({ to: "/organization/step-2" });
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

      {/* Painel Direito - Container do Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
        <div className="w-full max-w-md my-auto transition-all ease-out animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-1.5 select-none">
            <span className="text-xs font-bold text-emerald-700 tracking-wider">
              PASSO 1 DE 5
            </span>
            <span className="text-xs text-gray-400 font-medium transition-colors duration-300 hover:text-gray-600">
              Dados Iniciais
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: "20%" }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
            Criar Conta da Organização
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Comece a organizar os seus grupos financeiros hoje mesmo.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col space-y-0.5"
          >
            {/* Campo: Nome da Organização */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Nome da Organização
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 group-focus-within:scale-105 transition-all duration-200" />
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Ex: Cooperativa de Poupança Mavalane"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.nome ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.nome ? "animate-shake-error" : ""}`}
                >
                  <FormError message={errors.nome || ""} />
                </div>
              </div>
            </div>

            {/* Campos Regionais em Grid */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                <div className="group flex flex-col">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                    Província
                  </label>
                  <select
                    value={form.provincia}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        provincia: e.target.value,
                        distrito: "",
                      })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200 cursor-pointer"
                    required
                  >
                    <option value="">Selecionar...</option>
                    {PROVINCIAS_MZ.map((p) => (
                      <option key={p.nome} value={p.nome}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group flex flex-col">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                    Cidade / Distrito
                  </label>
                  <select
                    value={form.distrito}
                    onChange={(e) =>
                      setForm({ ...form, distrito: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 disabled:hover:border-gray-200 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                    disabled={!form.provincia}
                    required
                  >
                    <option value="">Selecionar...</option>
                    {distritos.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div
                  className={`text-[11px] transition-opacity duration-150 ${errors.provincia || errors.distrito ? "opacity-100" : "opacity-0 invisible"} ${isShaking && (errors.provincia || errors.distrito) ? "animate-shake-error" : ""}`}
                >
                  <FormError
                    message={errors.provincia || errors.distrito || ""}
                  />
                </div>
              </div>
            </div>

            {/* Campo: Telefone */}
            <div className="group flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
                Telefone
              </label>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 group-hover:border-gray-400 group-focus-within:border-emerald-500 group-focus-within:ring-2 group-focus-within:ring-emerald-500/20 transition-all duration-200">
                <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-200 text-sm select-none transition-colors group-focus-within:bg-emerald-50 group-focus-within:text-emerald-700 font-medium">
                  +258
                </span>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      telefone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="84 000 0000"
                  maxLength={9}
                  className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-white font-mono tracking-wide"
                  required
                />
              </div>
              <div className="h-4 flex items-center pl-1 mt-0.5">
                <div className="text-[11px] w-full">
                  {errors.telefone ? (
                    <div
                      className={`animate-in fade-in duration-150 ${isShaking ? "animate-shake-error" : ""}`}
                    >
                      <FormError message={errors.telefone} />
                    </div>
                  ) : (
                    <p className="text-gray-400 transition-colors group-focus-within:text-gray-500 truncate">
                      Enviaremos um código SMS para validação no passo seguinte.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Botão de Submissão */}
            <button
              type="submit"
              className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/10 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm mt-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span>Próximo</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
