import { ChevronDown, ChevronUp, Edit2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { InlineEditor } from "#/components/interactive";
import { cn } from "#/lib/design-system";
import { ExpandableRow } from "./ExpandableRow";

interface Column<T> {
	key: string;
	header: string;
	sortable?: boolean;
	editable?: boolean;
	type?: "text" | "number" | "tel" | "email";
	render?: (value: unknown, row: T) => React.ReactNode;
	onSave?: (value: string, row: T) => void;
}

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	isLoading?: boolean;
	searchable?: boolean;
	searchPlaceholder?: string;
	onRowClick?: (row: T) => void;
	onRowDoubleClick?: (row: T) => void;
	emptyMessage?: string;
	className?: string;
	rowKey?: keyof T;
	expandable?: boolean;
	renderExpandedRow?: (row: T) => React.ReactNode;
	onRowExpand?: (row: T) => void;
	selectable?: boolean;
	bulkActions?: React.ReactNode;
	onSelectionChange?: (selectedIds: Set<string>) => void;
	striped?: boolean;
	hoverable?: boolean;
}

export function DataTable<T>({
	data,
	columns,
	isLoading = false,
	searchable = false,
	searchPlaceholder = "Pesquisar...",
	onRowClick,
	onRowDoubleClick,
	emptyMessage = "Nenhum dado encontrado",
	className = "",
	rowKey = "id" as keyof T,
	expandable = false,
	renderExpandedRow,
	onRowExpand,
	selectable = false,
	bulkActions,
	onSelectionChange,
	striped = false,
	hoverable = true,
}: DataTableProps<T>) {
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
	const [editingCell, setEditingCell] = useState<{
		rowId: string;
		columnKey: string;
	} | null>(null);

	const handleSort = (key: string) => {
		if (sortColumn === key) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(key);
			setSortDirection("asc");
		}
	};

	const handleRowExpand = (row: T) => {
		const rowId = String(row[rowKey]);
		const newExpandedRows = new Set(expandedRows);
		if (newExpandedRows.has(rowId)) {
			newExpandedRows.delete(rowId);
		} else {
			newExpandedRows.add(rowId);
		}
		setExpandedRows(newExpandedRows);
		onRowExpand?.(row);
	};

	const isRowExpanded = (row: T) => {
		return expandedRows.has(String(row[rowKey]));
	};

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			const allIds = new Set(data.map((row) => String(row[rowKey])));
			setSelectedRows(allIds);
			onSelectionChange?.(allIds);
		} else {
			setSelectedRows(new Set());
			onSelectionChange?.(new Set());
		}
	};

	const handleRowSelect = (rowId: string, checked: boolean) => {
		const newSelected = new Set(selectedRows);
		if (checked) {
			newSelected.add(rowId);
		} else {
			newSelected.delete(rowId);
		}
		setSelectedRows(newSelected);
		onSelectionChange?.(newSelected);
	};

	const handleCellEdit = (rowId: string, columnKey: string) => {
		setEditingCell({ rowId, columnKey });
	};

	const handleCellSave = (value: string, row: T, column: Column<T>) => {
		column.onSave?.(value, row);
		setEditingCell(null);
	};

	const _handleCellCancel = () => {
		setEditingCell(null);
	};

	const isRowSelected = (row: T) => {
		return selectedRows.has(String(row[rowKey]));
	};

	const isCellEditing = (rowId: string, columnKey: string) => {
		return editingCell?.rowId === rowId && editingCell?.columnKey === columnKey;
	};

	const allSelected = data.length > 0 && selectedRows.size === data.length;
	const someSelected = selectedRows.size > 0 && !allSelected;

	const filteredData = data.filter((row) => {
		if (!searchTerm) return true;
		const searchLower = searchTerm.toLowerCase();
		return columns.some((col) => {
			const value = row[col.key as keyof T];
			return String(value).toLowerCase().includes(searchLower);
		});
	});

	const sortedData = [...filteredData].sort((a, b) => {
		if (!sortColumn) return 0;
		const aValue = a[sortColumn as keyof T];
		const bValue = b[sortColumn as keyof T];

		if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
		if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	if (isLoading) {
		return (
			<div
				className={cn("bg-white border border-slate-200 rounded-lg", className)}
			>
				<div className="p-8 flex items-center justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"bg-white border border-slate-200 rounded-lg overflow-hidden",
				className,
			)}
		>
			{searchable && (
				<div className="p-4 border-b border-slate-200">
					<input
						type="text"
						placeholder={searchPlaceholder}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
					/>
				</div>
			)}

			{bulkActions && selectedRows.size > 0 && (
				<div className="p-3 bg-secondary/5 border-b border-slate-200 flex items-center gap-3">
					<span className="text-sm font-medium text-slate-900">
						{selectedRows.size} seleccionado(s)
					</span>
					{bulkActions}
				</div>
			)}

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-slate-100 border-b border-slate-200">
						<tr>
							{selectable && (
								<th className="px-4 py-3 text-left">
									<input
										type="checkbox"
										checked={allSelected}
										ref={(el) => el && (el.indeterminate = someSelected)}
										onChange={(e) => handleSelectAll(e.target.checked)}
										className="w-4 h-4 rounded border-slate-200 text-emerald-700 focus:ring-emerald-700/20"
									/>
								</th>
							)}
							{columns.map((col) => (
								<th
									key={col.key}
									className={cn(
										"px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider",
										col.sortable &&
										"cursor-pointer hover:bg-slate-400 transition-colors duration-300",
									)}
									onClick={() => col.sortable && handleSort(col.key)}
								>
									<div className="flex items-center gap-1">
										{col.header}
										{col.editable && (
											<Edit2 size={12} className="text-slate-400" />
										)}
										{col.sortable &&
											sortColumn === col.key &&
											(sortDirection === "asc" ? (
												<ChevronUp className="w-4 h-4" />
											) : (
												<ChevronDown className="w-4 h-4" />
											))}
									</div>
								</th>
							))}
							<th className="px-4 py-3 text-right">
								{expandable ? (
									<span className="sr-only">Expandir</span>
								) : (
									<MoreHorizontal className="w-4 h-4 text-slate-400" />
								)}
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200">
						{sortedData.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length + (selectable ? 1 : 0) + 1}
									className="px-4 py-8 text-center text-sm text-slate-400"
								>
									{emptyMessage}
								</td>
							</tr>
						) : (
							sortedData.map((row) => {
								const rowId = String(row[rowKey]);
								const expanded = isRowExpanded(row);
								const selected = isRowSelected(row);

								if (expandable) {
									return (
										<ExpandableRow
											key={rowId}
											isExpanded={expanded}
											onToggle={() => handleRowExpand(row)}
											onDoubleClick={() => onRowDoubleClick?.(row)}
											showExpandButton={true}
											expandedContent={renderExpandedRow?.(row)}
										>
											{selectable && (
												<td className="px-4 py-3">
													<input
														type="checkbox"
														checked={selected}
														onChange={(e) =>
															handleRowSelect(rowId, e.target.checked)
														}
														className="w-4 h-4 rounded border-slate-200 text-emerald-700 focus:ring-emerald-700/20"
													/>
												</td>
											)}
											{columns.map((col) => {
												const isEditing = isCellEditing(rowId, col.key);
												const value = String(row[col.key as keyof T]);

												return (
													<td key={col.key} className="px-4 py-3 text-sm">
														{col.editable && isEditing ? (
															<InlineEditor
																value={value}
																onSave={(v) => handleCellSave(v, row, col)}
																type={col.type || "text"}
																placeholder={col.header}
															/>
														) : col.editable ? (
															<div
																className="group relative cursor-pointer hover:bg-slate-100 -mx-2 px-2 py-1 rounded transition-colors duration-300"
																onClick={() => handleCellEdit(rowId, col.key)}
															>
																{col.render
																	? col.render(row[col.key as keyof T], row)
																	: value}
																<Edit2
																	size={12}
																	className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-slate-400"
																/>
															</div>
														) : col.render ? (
															col.render(row[col.key as keyof T], row)
														) : (
															value
														)}
													</td>
												);
											})}
										</ExpandableRow>
									);
								}

								return (
									<tr
										key={rowId}
										className={cn(
											hoverable &&
											"hover:bg-slate-100 hover:border-l-4 hover:border-l-emerald-600 transition-all duration-300 animate-scale-hover",
											striped &&
											(sortedData.indexOf(row) % 2 === 0
												? "bg-white"
												: "bg-slate-100"),
											(onRowClick || onRowDoubleClick) && "cursor-pointer",
											selected && "bg-secondary/5",
										)}
										onClick={() => onRowClick?.(row)}
										onDoubleClick={() => onRowDoubleClick?.(row)}
									>
										{selectable && (
											<td className="px-4 py-3">
												<input
													type="checkbox"
													checked={selected}
													onChange={(e) =>
														handleRowSelect(rowId, e.target.checked)
													}
													className="w-4 h-4 rounded border-slate-200 text-emerald-700 focus:ring-emerald-700/20"
												/>
											</td>
										)}
										{columns.map((col) => {
											const isEditing = isCellEditing(rowId, col.key);
											const value = String(row[col.key as keyof T]);

											return (
												<td key={col.key} className="px-4 py-3 text-sm">
													{col.editable && isEditing ? (
														<InlineEditor
															value={value}
															onSave={(v) => handleCellSave(v, row, col)}
															type={col.type || "text"}
															placeholder={col.header}
														/>
													) : col.editable ? (
														<div
															className="group relative cursor-pointer hover:bg-slate-100 -mx-2 px-2 py-1 rounded transition-colors duration-300"
															onClick={() => handleCellEdit(rowId, col.key)}
														>
															{col.render
																? col.render(row[col.key as keyof T], row)
																: value}
															<Edit2
																size={12}
																className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-slate-400"
															/>
														</div>
													) : col.render ? (
														col.render(row[col.key as keyof T], row)
													) : (
														value
													)}
												</td>
											);
										})}
										<td className="px-4 py-3 text-right">
											<button
												type="button"
												className="p-1 rounded hover:bg-slate-100 transition-colors"
												onClick={(e) => {
													e.stopPropagation();
													onRowClick?.(row);
												}}
											>
												<MoreHorizontal className="w-4 h-4 text-slate-400" />
											</button>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{sortedData.length > 0 && (
				<div className="px-4 py-3 border-t border-slate-200 bg-slate-100">
					<p className="text-xs text-slate-400">
						Mostrando {sortedData.length} de {data.length} registos
						{selectable &&
							selectedRows.size > 0 &&
							` • ${selectedRows.size} seleccionado(s)`}
						{expandable &&
							expandedRows.size > 0 &&
							` • ${expandedRows.size} expandido${expandedRows.size > 1 ? "s" : ""}`}
					</p>
				</div>
			)}
		</div>
	);
}
