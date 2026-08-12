import { useState } from "react";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
import { cn } from "#/lib/design-system";
import { ExpandableRow } from "./ExpandableRow";

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
  rowKey?: keyof T;
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;
  onRowExpand?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  searchable = false,
  searchPlaceholder = "Pesquisar...",
  onRowClick,
  emptyMessage = "Nenhum dado encontrado",
  className = "",
  rowKey = 'id' as keyof T,
  expandable = false,
  renderExpandedRow,
  onRowExpand,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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
      <div className={cn("bg-white border border-slate-200 rounded-lg", className)}>
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-slate-200 rounded-lg overflow-hidden", className)}>
      {searchable && (
        <div className="p-4 border-b border-slate-200">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider",
                    col.sortable && "cursor-pointer hover:bg-slate-100 transition-colors"
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortColumn === col.key && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right">
                {expandable ? <span className="sr-only">Expandir</span> : <MoreHorizontal className="w-4 h-4 text-slate-400" />}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row) => {
                const rowId = String(row[rowKey]);
                const expanded = isRowExpanded(row);

                if (expandable) {
                  return (
                    <ExpandableRow
                      key={rowId}
                      isExpanded={expanded}
                      onToggle={() => handleRowExpand(row)}
                      showExpandButton={true}
                      expandedContent={renderExpandedRow?.(row)}
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                          {col.render ? col.render(row[col.key as keyof T], row) : String(row[col.key as keyof T])}
                        </td>
                      ))}
                    </ExpandableRow>
                  );
                }

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "hover:bg-slate-50 transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                        {col.render ? col.render(row[col.key as keyof T], row) : String(row[col.key as keyof T])}
                      </td>
                    ))}
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
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-500">
            Mostrando {sortedData.length} de {data.length} registos
            {expandable && expandedRows.size > 0 && ` (${expandedRows.size} expandido${expandedRows.size > 1 ? 's' : ''})`}
          </p>
        </div>
      )}
    </div>
  );
}
