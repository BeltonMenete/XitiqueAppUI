import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Shield, Landmark, Building2, User, BadgeCheck, Pencil, Info } from "lucide-react";

export const Route = createFileRoute("/organization/_auth/step-4")({
  component: StepFour,
});

function StepFour() {
  const navigate = useNavigate();

  const organization = {
    name: "Cooperativa Agrícola de Boane",
    nuit: "400123456",
    location: "Boane, Maputo"
  };

  const owner = {
    name: "Amélia Matsinhe",
    email: "amelia.matsinhe@exemplo.mz",
    phone: "+258 84 123 4567"
  };

  const plan = {
    name: "Xitique Pro",
    price: "1.500 MZN/mês",
    details: "Até 50 Ticantes, Relatórios Mensais, Gestão de Empréstimos."
  };

  const handleEdit = (section: string) => {
    const stepMap = {
      organization: "/organization/_auth/step-1",
      owner: "/organization/_auth/step-2",
      plan: "/organization/_auth/step-3"
    };
    /*   navigate({ to: stepMap[section] }); */
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Confirmando registo...");
    navigate({ to: "/organization/step-5" }); // Agora vai pro step-5
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
      {/* Painel Esquerdo - Branding (Idêntico ao step-3) */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full">
        <div className="space-y-4 my-auto">
          <h2 className="text-2xl font-bold text-amber-400">Xitique</h2>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
            Digitalize o seu Xitique com segurança e transparência.
          </h1>
          <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md">
            Modernize a gestão da sua comunidade financeira. Unimos tradição
            Moçambicana com a eficiência da tecnologia moderna.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5">
            <Shield className="text-amber-400 mb-1.5 h-5 w-5" />
            <p className="font-bold text-xs tracking-wider text-white">SEGURANÇA TOTAL</p>
            <p className="text-emerald-300 text-xs mt-0.5">Dados encriptados</p>
          </div>
          <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5">
            <Landmark className="text-amber-400 mb-1.5 h-5 w-5" />
            <p className="font-bold text-xs tracking-wider text-white">AUDITÁVEL</p>
            <p className="text-emerald-300 text-xs mt-0.5">Histórico completo</p>
          </div>
        </div>
      </div>

      {/* Painel Direito - Confirmação de Dados */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Stepper corrigido: PASSO 4 DE 5 */}
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-emerald-700 tracking-wider">
              PASSO 4 DE 5
            </span>
            <span className="text-xs text-gray-500 font-medium">Revisão e Finalização</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: "80%" }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Confirmação de Dados
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Por favor, reveja as informações abaixo antes de finalizar o registo da sua conta Xitique Digital.
          </p>

          <div className="space-y-3 mb-6">
            {/* Card Organização */}
            <div className="relative p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2.5 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">ORGANIZAÇÃO</p>
                  <p className="font-semibold text-gray-900">{organization.name}</p>
                  <p className="text-xs text-gray-500">NUIT: {organization.nuit} • {organization.location}</p>
                </div>
                <button
                  onClick={() => handleEdit('organization')}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card Proprietário */}
            <div className="relative p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2.5 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">PROPRIETÁRIO</p>
                  <p className="font-semibold text-gray-900">{owner.name}</p>
                  <p className="text-xs text-gray-500">{owner.email} • {owner.phone}</p>
                </div>
                <button
                  onClick={() => handleEdit('owner')}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card Plano Selecionado */}
            <div className="relative p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/30">
              <div className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Popular
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2.5 rounded-lg">
                  <BadgeCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">PLANO SELECCIONADO</p>
                  <p className="font-semibold text-gray-900">
                    {plan.name} <span className="font-normal text-sm">{plan.price}</span>
                  </p>
                  <p className="text-xs text-gray-500">{plan.details}</p>
                </div>
                <button
                  onClick={() => handleEdit('plan')}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Aviso Período Experimental */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6 flex gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase mb-0.5">PERÍODO EXPERIMENTAL</p>
              <p className="text-xs text-amber-700">
                A sua conta será criada com 14 dias de acesso total gratuito ao plano Pro para teste inicial.
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm hover:shadow active:scale-[0.99] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              Confirmar e Continuar <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate({ to: "/organization/step-3" })}
              className="w-full border border-gray-300 hover:bg-gray-100 text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition text-sm active:scale-[0.99] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para Planos
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Precisa de ajuda? <a href="#" className="font-semibold text-emerald-600 hover:underline">Contactar Suporte</a>
          </p>
        </div>
      </div>
    </div>
  );
}