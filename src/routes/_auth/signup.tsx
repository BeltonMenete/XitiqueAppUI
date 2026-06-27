import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { APP_NAME } from "#/lib/constants";
import {
  UserPlus,
  Building2,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});

type AccountType = "organization" | "individual" | null;

function Signup() {
  const [accountType, setAccountType] = useState<AccountType>("organization");
  const navigate = useNavigate();

  const handleSelectAccount = (type: AccountType) => {
    setAccountType(type);
    console.log("Tipo de conta selecionado:", type);
    // Fluxo sequencial de cadastro pode ser disparado aqui
    navigate({ to: "/terms" });
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        {/* Imagem Lateral (Desktop) - Idêntica ao Login */}
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0">
          <img
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card do Formulário Adaptado para Seleção de Conta */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 lg:p-10 min-h-125 flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-5">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
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
                className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:translate-x-0.5"
              >
                <UserPlus size={14} /> Iniciar sessão
              </Link>
            </div>

            {/* Títulos */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-0.5">
                Criar conta
              </h1>
              <p className="text-gray-500 text-xs">
                Escolha como deseja começar a poupar e gerir o seu dinheiro.
              </p>
            </div>

            {/* Cards de Seleção Interativos e Estáticos no Hover */}
            <div className="flex flex-col space-y-4 py-1">
              {/* Opção A: Organização */}
              <div
                onClick={() => handleSelectAccount("organization")}
                className={`border-2 rounded-2xl p-4 cursor-pointer group transition-all duration-300 ${
                  accountType === "organization"
                    ? "border-(--color-mint-leaf-500) bg-gray-50/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-300 hover:bg-gray-50/30"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      accountType === "organization"
                        ? "bg-(--color-mint-leaf-500) text-white"
                        : "bg-gray-100 text-gray-700 group-hover:bg-(--color-mint-leaf-500) group-hover:text-white"
                    }`}
                  >
                    <Building2 size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Criar uma Organização
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      Para quem deseja gerir grupos de xitique, coordenadores e
                      depósitos de terceiros.
                    </p>
                    <button className="mt-2 text-(--color-mint-leaf-500) text-xs font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Começar como Organizador
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Opção B: Individual (Ticante) */}
              <div
                onClick={() => handleSelectAccount("individual")}
                className={`border-2 rounded-2xl p-4 cursor-pointer group transition-all duration-300 ${
                  accountType === "individual"
                    ? "border-(--color-mint-leaf-500) bg-gray-50/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-300 hover:bg-gray-50/30"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      accountType === "individual"
                        ? "bg-(--color-mint-leaf-500) text-white"
                        : "bg-gray-100 text-gray-700 group-hover:bg-(--color-mint-leaf-500) group-hover:text-white"
                    }`}
                  >
                    <CircleDollarSign size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      Ser um Ticante
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      Para quem deseja poupar dinheiro diariamente e acompanhar
                      o seu progresso digital.
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-(--color-mint-leaf-500) text-xs font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                    >
                      Começar como Ticante
                      <ChevronRight size={14} />
                    </button>
                  </div>
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
