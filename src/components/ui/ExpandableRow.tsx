import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { cn } from '#/lib/design-system';

interface ExpandableRowProps {
  children: React.ReactNode;
  expandedContent: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  showExpandButton?: boolean;
  className?: string;
  expandedClassName?: string;
}

export function ExpandableRow({
  children,
  expandedContent,
  isExpanded: controlledExpanded,
  onToggle,
  showExpandButton = true,
  className = '',
  expandedClassName = '',
}: ExpandableRowProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <>
      <tr
        className={cn(
          'hover:bg-slate-50 transition-colors cursor-pointer',
          className
        )}
        onClick={handleToggle}
      >
        {children}
        {showExpandButton && (
          <td className="px-4 py-3 text-right">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              className="p-1 rounded hover:bg-slate-200 transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <ChevronUp size={16} className="text-slate-400" />
              ) : (
                <ChevronDown size={16} className="text-slate-400" />
              )}
            </button>
          </td>
        )}
      </tr>
      {isExpanded && (
        <tr className={cn('bg-slate-50/50', expandedClassName)}>
          <td colSpan={showExpandButton ? 100 : 99} className="px-4 py-4">
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              {expandedContent}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

interface ExpandableRowContentProps {
  title?: string;
  onViewFullDetails?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableRowContent({
  title,
  onViewFullDetails,
  children,
  className = '',
}: ExpandableRowContentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {onViewFullDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewFullDetails();
              }}
              className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Ver Detalhes Completos
              <ExternalLink size={12} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
