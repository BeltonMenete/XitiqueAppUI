import { cn } from "#/lib/design-system";

interface Column {
	key: string;
	header: string;
	render?: (value: unknown, row: any) => React.ReactNode;
	className?: string;
}

interface PrototypeTableProps {
	data: any[];
	columns: Column[];
	showAvatars?: boolean;
	showStatusBadges?: boolean;
	onRowClick?: (row: any) => void;
	pagination?: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		onPageChange: (page: number) => void;
	};
}

export function PrototypeTable({
	data,
	columns,
	showAvatars = false,
	showStatusBadges = false,
	onRowClick,
	pagination,
}: PrototypeTableProps) {
	const _getStatusBadgeColor = (status: string) => {
		switch (status) {
			case "active":
			case "approved":
			case "completed":
				return "bg-emerald-100 text-emerald-700";
			case "suspended":
			case "pending":
				return "bg-amber-100 text-amber-700";
			case "inactive":
			case "rejected":
			case "failed":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	};

	const _getStatusBadgeText = (status: string) => {
		switch (status) {
			case "active":
				return "Ativo";
			case "suspended":
				return "Suspenso";
			case "inactive":
				return "Inativo";
			case "approved":
				return "Aprovado";
			case "pending":
				return "Pendente";
			case "rejected":
				return "Rejeitado";
			case "completed":
				return "Concluído";
			case "failed":
				return "Falhou";
			default:
				return status;
		}
	};

	return (
		<div className="bg-slate-50 rounded-xl shadow-sm overflow-hidden border border-slate-200">
			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-slate-100">
							{columns.map((column) => (
								<th
									key={column.key}
									className={cn(
										"px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-tighter",
										column.className,
									)}
								>
									{column.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200">
						{data.map((row, index) => (
							<tr
								key={row.id || index}
								className={cn(
									"hover:bg-slate-100 transition-colors",
									onRowClick && "cursor-pointer",
								)}
								onClick={() => onRowClick?.(row)}
							>
								{columns.map((column) => (
									<td
										key={column.key}
										className={cn("px-4 py-3", column.className)}
									>
										{column.render ? (
											column.render(row[column.key], row)
										) : (
											<span className="text-sm text-slate-900">
												{String(row[column.key])}
											</span>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{pagination && (
				<div className="p-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-xs text-slate-500">
						Mostrando{" "}
						<span className="font-bold text-slate-900">
							{Math.min(data.length, pagination.currentPage * 10)}
						</span>{" "}
						de{" "}
						<span className="font-bold text-slate-900">
							{pagination.totalItems}
						</span>{" "}
						registos
					</p>
					<div className="flex gap-2">
						<button
							type="button"
							className="p-2 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-50"
							disabled={pagination.currentPage === 1}
							onClick={() =>
								pagination.onPageChange(pagination.currentPage - 1)
							}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path d="M15 18l-6-6 6-6" />
							</svg>
						</button>
						{Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
							(page) => (
								<button
									key={page}
									type="button"
									className={cn(
										"px-3 py-2 rounded",
										pagination.currentPage === page
											? "bg-[#3391C2] text-white font-bold"
											: "hover:bg-slate-100",
									)}
									onClick={() => pagination.onPageChange(page)}
								>
									{page}
								</button>
							),
						)}
						<button
							type="button"
							className="p-2 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-50"
							disabled={pagination.currentPage === pagination.totalPages}
							onClick={() =>
								pagination.onPageChange(pagination.currentPage + 1)
							}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path d="M9 18l6-6-6-6" />
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
