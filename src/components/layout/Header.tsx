import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import { cn } from "#/lib/design-system";

interface HeaderProps {
  title: string;
  description?: string;
  rightContent?: ReactNode;
  className?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export function Header({
  title,
  description,
  rightContent,
  className = "",
  showSearch = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Pesquisar...",
}: HeaderProps) {
  return (
    <header className={cn("h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between select-none shrink-0", className)}>
      <div>
        <h1 className="text-sm font-bold text-slate-950 tracking-tight">{title}</h1>
        {description && (
          <p className="text-[11px] text-slate-400 hidden sm:block">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative w-48 sm:w-64 group">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all duration-200"
            />
          </div>
        )}
        
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-lg border border-slate-100 relative transition-all"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        {rightContent}
      </div>
    </header>
  );
}
