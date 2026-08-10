import type { ReactNode } from "react";
import { cn } from "#/lib/design-system";

interface CardProps {
  children: ReactNode;
  className?: string;
  isInteractive?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", isInteractive = false, onClick }: CardProps) {
  const baseClasses = "bg-white border border-slate-200 rounded-lg shadow-sm";
  const interactiveClasses = isInteractive
    ? "hover:shadow-md cursor-pointer transition-shadow duration-200"
    : "";

  if (isInteractive) {
    return (
      <button
        type="button"
        className={cn(baseClasses, interactiveClasses, className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={cn(baseClasses, className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={cn("p-5 border-b border-slate-100", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={cn("p-5", className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={cn("p-5 border-t border-slate-100 bg-slate-50/50", className)}>
      {children}
    </div>
  );
}
