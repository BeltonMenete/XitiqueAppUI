import {
	ArrowRight,
	CheckCircle,
	MessageCircle,
	Phone,
	Mail,
} from "lucide-react";

interface SupportSectionProps {
	performanceTitle?: string;
	performanceText?: string;
	performanceAction?: string;
	showPerformanceCard?: boolean;
}

export function SupportSection({
	performanceTitle = "Desempenho da Organização",
	performanceText = "Este mês, a organização atingiu 94% de eficiência nas coletas. Mantenha o bom trabalho!",
	performanceAction = "Ver Relatório Detalhado",
	showPerformanceCard = true,
}: SupportSectionProps) {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
			{showPerformanceCard && (
				<div className="bg-emerald-500 text-white p-6 rounded-2xl relative overflow-hidden group">
					<div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
						<CheckCircle size={120} />
					</div>
					<h3 className="text-xl font-bold mb-2">{performanceTitle}</h3>
					<p className="text-sm text-emerald-50 mb-4 opacity-90">
						{performanceText}
					</p>
					<button
						type="button"
						className="flex items-center gap-2 font-bold border-b border-emerald-300 pb-1 hover:text-white hover:border-white transition-all"
					>
						{performanceAction}
						<ArrowRight size={16} />
					</button>
				</div>
			)}

			<div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
						<Phone size={20} className="text-[#3391C2]" />
					</div>
					<div>
						<h4 className="font-bold text-slate-900">Precisa de suporte?</h4>
						<p className="text-sm text-slate-600">
							Canal exclusivo para organizadores e administradores.
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-3">
					<button
						type="button"
						className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
					>
						<MessageCircle size={18} className="text-[#3391C2]" />
						<span className="font-bold text-slate-700">WhatsApp</span>
					</button>
					<button
						type="button"
						className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
					>
						<Mail size={18} className="text-slate-900" />
						<span className="font-bold text-slate-700">Email</span>
					</button>
				</div>
			</div>
		</div>
	);
}
