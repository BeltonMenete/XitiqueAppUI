import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
	return (
		<SonnerToaster
			position="bottom-right"
			toastOptions={{
				classNames: {
					toast:
						"bg-slate-900/95 backdrop-blur-md border border-emerald-500/20 shadow-2xl text-white rounded-xl animate-pop-in",
					title: "text-sm font-semibold text-white",
					description: "text-xs text-slate-300",
					actionButton:
						"bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 animate-button-press",
					cancelButton:
						"bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-4 py-2 rounded-lg transition-all duration-200 animate-button-press",
					error: "bg-red-500/10 border-red-500/30 animate-status-flash",
					success: "bg-emerald-500/10 border-emerald-500/30 animate-status-flash",
					warning: "bg-amber-500/10 border-amber-500/30 animate-status-flash",
					info: "bg-blue-500/10 border-blue-500/30 animate-status-flash",
					loading: "bg-slate-800/90 border-slate-700",
				},
			}}
		/>
	);
}
