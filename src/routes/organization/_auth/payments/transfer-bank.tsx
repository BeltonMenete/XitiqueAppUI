import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowLeft,
	Check,
	CheckCircle2,
	Copy,
	Info,
	Lock,
	Send,
	Shield,
	ShoppingBasket,
	UploadCloud,
	X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute(
	"/organization/_auth/payments/transfer-bank",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [showModal, setShowModal] = useState(false);

	const bankDetails = {
		accountNumber: "12345678",
		nib: "0001 0000 1234 5678 9012 3",
	};

	const handleCopy = (text: string, field: string) => {
		navigator.clipboard.writeText(text.replace(/\s/g, ""));
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedFile) {
			setShowModal(true);
		} else {
			alert("Por favor, anexe o comprovativo antes de finalizar.");
		}
	};

	return (
		<div className="h-screen w-screen flex bg-[#f8faf6] font-['Inter'] selection:bg-emerald-900/10 overflow-hidden">
			{/* 🛡️ PAINEL ESQUERDO: Branding de Alta Confiança Dedicado (Sincronizado) */}
			<section className="hidden md:flex md:w-5/12 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden shrink-0 select-none">
				<div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

				<div className="flex items-center gap-3 relative z-10">
					<img
						src="/Xitique-logo-transparent-compressed.svg"
						alt="Xitique Logo"
						className="w-9 h-9 object-contain"
					/>
					<span className="text-xl font-bold tracking-wide text-white">
						Xitique
					</span>
				</div>

				<div className="space-y-4 my-auto relative z-10">
					<div className="h-1 w-12 bg-[#10B981] rounded-full" />
					<h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
						Transferência Bancária
					</h1>
					<p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-sm opacity-90">
						Complete o seu ciclo efetuando a transferência para a conta oficial
						do Xitique Digital. Após o envio, anexe o comprovativo para ativação
						imediata.
					</p>

					<div className="border border-emerald-700/50 bg-emerald-950/20 rounded-xl p-4 max-w-sm">
						<div className="flex items-start gap-3">
							<Info className="text-emerald-400 h-4 w-4 flex-shrink-0 mt-0.5" />
							<div>
								<p className="font-bold text-[10px] uppercase tracking-wider text-emerald-300 mb-0.5">
									Importante
								</p>
								<p className="text-emerald-100/80 text-xs leading-relaxed">
									Utilize o seu número de telefone ou email como referência da
									transferência para agilizar a verificação da nossa equipa.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-3 mt-auto relative z-10 w-full">
					<div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-4 flex gap-3.5 items-center cursor-default">
						<Lock className="text-emerald-400 h-5 w-5 shrink-0" />
						<div>
							<p className="font-bold text-xs tracking-wider text-white uppercase">
								Ambiente Protegido
							</p>
							<p className="text-emerald-300 text-xs mt-0.5 leading-relaxed">
								Os seus dados de faturação e documentos anexados são guardados
								de forma totalmente encriptada e segura.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ================= PAINEL DIREITO: INTERAÇÃO / FORMULÁRIO ================= */}
			<section className="w-full md:w-7/12 bg-[#f8faf6] flex flex-col justify-between items-center px-6 sm:px-10 md:px-12 py-8 h-full overflow-hidden">
				<div className="w-full max-w-xl h-4 shrink-0" />

				<div className="w-full max-w-xl flex-1 flex flex-col justify-center gap-5">
					<header className="text-center md:text-left">
						<h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
							Dados para Transferência
						</h2>
						<p className="text-xs sm:text-sm text-black/60 font-medium leading-relaxed max-w-md mt-0.5">
							Copie os dados bancários institucionais abaixo para realizar o
							pagamento através do seu banco corporativo ou pessoal.
						</p>
					</header>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Card de Detalhes Bancários Estático */}
						<div className="bg-white border border-[#e7e9e5] rounded-xl p-5 shadow-sm select-none">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div className="space-y-0.5">
									<label className="block text-[10px] font-bold uppercase tracking-wider text-black/40">
										Banco
									</label>
									<p className="text-xl font-black text-[#10B981]">BIM</p>
								</div>

								<div className="space-y-0.5">
									<label className="block text-[10px] font-bold uppercase tracking-wider text-black/40">
										Beneficiário
									</label>
									<p className="text-xs sm:text-sm font-bold text-black mt-1">
										Xitique Digital, SA
									</p>
								</div>

								<div className="space-y-1 sm:col-span-1">
									<label className="block text-[10px] font-bold uppercase tracking-wider text-black/40">
										Número de Conta
									</label>
									<div className="flex items-center justify-between bg-[#eceeeb]/40 border border-[#e7e9e5]/60 rounded-xl px-3 py-2.5">
										<code className="font-['JetBrains_Mono'] text-xs font-medium text-black">
											{bankDetails.accountNumber}
										</code>
										<button
											type="button"
											onClick={() =>
												handleCopy(bankDetails.accountNumber, "acc")
											}
											className="text-[#404944] p-1 rounded-md hover:bg-[#eceeeb] transition-colors focus:outline-none"
										>
											{copiedField === "acc" ? (
												<Check className="h-3.5 w-3.5 text-[#10B981]" />
											) : (
												<Copy className="h-3.5 w-3.5" />
											)}
										</button>
									</div>
								</div>

								<div className="space-y-1 sm:col-span-1">
									<label className="block text-[10px] font-bold uppercase tracking-wider text-black/40">
										NIB
									</label>
									<div className="flex items-center justify-between bg-[#eceeeb]/40 border border-[#e7e9e5]/60 rounded-xl px-3 py-2.5">
										<code className="font-['JetBrains_Mono'] text-xs font-medium text-black">
											{bankDetails.nib}
										</code>
										<button
											type="button"
											onClick={() => handleCopy(bankDetails.nib, "nib")}
											className="text-[#404944] p-1 rounded-md hover:bg-[#eceeeb] transition-colors focus:outline-none"
										>
											{copiedField === "nib" ? (
												<Check className="h-3.5 w-3.5 text-[#10B981]" />
											) : (
												<Copy className="h-3.5 w-3.5" />
											)}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Área de Upload de Ficheiro Compacta */}
						<div className="space-y-1.5">
							<label className="block text-xs font-semibold text-[#404944]">
								Anexar Comprovativo Bancário
							</label>
							<div
								className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center bg-white transition-all duration-200 group cursor-pointer ${selectedFile
										? "border-[#10B981] bg-[#10B981]/5"
										: "border-[#bfc9c3] hover:border-[#404944] hover:bg-[#eceeeb]/30"
									}`}
							>
								<input
									accept="image/*,application/pdf"
									className="hidden"
									id="file-upload"
									type="file"
									onChange={handleFileChange}
								/>
								<label
									htmlFor="file-upload"
									className="flex flex-col items-center cursor-pointer w-full text-center select-none"
								>
									<UploadCloud
										className={`h-7 w-7 mb-1.5 transition-transform duration-200 group-hover:scale-105 ${selectedFile ? "text-[#10B981]" : "text-gray-400"
											}`}
									/>
									{selectedFile ? (
										<div className="space-y-0.5">
											<p className="text-black font-bold text-xs">
												✓ {selectedFile.name}
											</p>
											<p className="text-[10px] text-[#707974]">
												Clique para substituir o documento
											</p>
										</div>
									) : (
										<div className="space-y-0.5">
											<p className="text-[#404944] font-semibold text-xs">
												Clique para carregar ou arraste o ficheiro
											</p>
											<p className="text-[10px] text-[#707974]">
												PDF, PNG ou JPG (Máx. 5MB)
											</p>
										</div>
									)}
								</label>
							</div>
						</div>

						{/* Bento Box Resumo do Pedido - Sem hover */}
						<div className="bg-[#eceeeb]/70 border border-[#e7e9e5] rounded-xl p-4 flex flex-row items-center justify-between gap-2 shadow-sm select-none">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-[#003527] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
									<ShoppingBasket className="h-4 w-4 text-[#10B981]" />
								</div>
								<div>
									<span className="text-[10px] font-semibold text-[#707974] block mb-0.5 uppercase tracking-wider">
										Plano Selecionado
									</span>
									<span className="font-bold text-sm text-black">
										Xitique Pro
									</span>
								</div>
							</div>
							<div className="text-right">
								<span className="text-[10px] font-semibold text-[#707974] block mb-0.5 uppercase tracking-wider">
									Total a Transferir
								</span>
								<p className="font-['Montserrat'] text-base font-bold text-[#003527]">
									1.500 MZN
								</p>
							</div>
						</div>

						{/* Ações / Footer Interativo */}
						<div className="flex flex-col-reverse sm:flex-row gap-3 items-center justify-between pt-1">
							<button
								type="button"
								className="w-full sm:w-auto py-2.5 bg-transparent hover:bg-[#eceeeb] text-xs text-[#707974] hover:text-[#191c1b] font-medium rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none"
							>
								<ArrowLeft className="h-3.5 w-3.5" />
								Voltar para Planos
							</button>

							<button
								type="submit"
								className="w-full sm:w-auto bg-[#10B981] hover:bg-[#10B981]/90 text-white font-['Montserrat'] font-bold text-xs py-3.5 px-5 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 active:scale-[0.98] focus:outline-none"
							>
								Submeter Comprovativo
								<Send className="h-3.5 w-3.5" />
							</button>
						</div>
					</form>

					{/* Link de Suporte Extra */}
					<div className="text-center mt-4 pt-4 border-t border-[#e7e9e5]/60 select-none">
						<p className="text-xs text-[#707974]">
							Precisa de ajuda com a transferência?{" "}
							<a href="#" className="font-bold text-[#003527] hover:underline">
								Contactar Suporte
							</a>
						</p>
					</div>
				</div>

				{/* Rodapé de Segurança */}
				<div className="w-full max-w-md flex items-center justify-center gap-6 border-t border-[#e7e9e5] pt-4 shrink-0 select-none text-[11px] font-semibold text-[#404944]">
					<div className="flex items-center gap-1.5 opacity-60">
						<Lock className="h-3.5 w-3.5" />
						<span>PCI DSS Compliant</span>
					</div>
					<div className="flex items-center gap-1.5 opacity-60">
						<Shield className="h-3.5 w-3.5" />
						<span>SSL Secured</span>
					</div>
				</div>
			</section>

			{/* ================= MODAL DE SUCESSO ================= */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
					<div
						className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md"
						onClick={() => setShowModal(false)}
					/>
					<div className="bg-white border border-[#e7e9e5] rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl text-center transform scale-100 transition-all">
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors focus:outline-none"
						>
							<X className="h-5 w-5" />
						</button>
						<div className="w-14 h-14 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
							<CheckCircle2 className="h-8 w-8" />
						</div>
						<h3 className="text-xl font-black text-black tracking-tight">
							Envio Efetuado!
						</h3>
						<p className="text-xs sm:text-sm text-black/70 font-medium leading-relaxed mt-1.5 mb-5">
							O seu comprovativo foi recebido. A nossa equipa irá validar o
							depósito e ativar o ciclo dentro de 24 horas úteis.
						</p>
						<button
							onClick={() => setShowModal(false)}
							className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white font-['Montserrat'] font-bold text-xs py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
						>
							Ir para o Dashboard
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
