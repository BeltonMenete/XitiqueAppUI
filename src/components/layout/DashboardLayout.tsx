import type { ReactNode } from "react";
import { cn } from "#/lib/design-system";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={cn("h-screen w-screen flex bg-slate-50/50 overflow-hidden font-sans selection:bg-emerald-900/10 antialiased text-slate-900", className)}>
      {children}
    </div>
  );
}
