import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, ShieldAlert, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "#/lib/constants";
// Caminho atualizado para a pasta lib/terms.json
import termsData from "#/data/terms.json";
import { AuthImagePanel } from "#/components/AuthImagePanel";

export const Route = createFileRoute("/_auth/terms")({
  component: TermsAndConditions,
});

// Mapeamento dinâmico para renderizar os ícones correspondentes do Lucide
const iconMap = {
  ShieldAlert: ShieldAlert,
  FileText: FileText,
  CheckCircle2: CheckCircle2,
};

function TermsAndConditions() {
  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        {/* Imagem Lateral (Desktop) */}
        <AuthImagePanel />

        {/* Card de Conteúdo dos Termos */}
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
                to="/signup"
                className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:-translate-x-0.5"
              >
                <ArrowLeft size={14} /> Voltar ao registo
              </Link>
            </div>

            {/* Títulos */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-0.5">
                Termos e Condições
              </h1>
              <p className="text-gray-500 text-xs">
                Por favor, leia atentamente as nossas regras e políticas de
                segurança antes de continuar.
              </p>
            </div>

            {/* Renderização Dinâmica do JSON */}
            <div className="flex flex-col space-y-3.5 max-h-60 overflow-y-auto pr-1 py-1 scrollbar-thin">
              {termsData.map((term) => {
                const IconComponent =
                  iconMap[term.icon as keyof typeof iconMap] || FileText;

                return (
                  <div
                    key={term.id}
                    className="border border-gray-100 rounded-2xl p-3.5 bg-gray-50/30 transition-colors hover:border-gray-200"
                  >
                    <div className="flex gap-3">
                      <div className="p-2 bg-(--color-mint-leaf-500)/10 rounded-xl text-(--color-mint-leaf-500) h-fit">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {term.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          {term.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ação Principal */}
            <div className="pt-1">
              <Link
                to="/organization/step-1"
                className="w-full py-3 rounded-2xl text-white font-semibold text-center text-sm md:text-base bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
              >
                Li e aceito os Termos
              </Link>
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
