import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '#/lib/design-system';

interface TimeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const timeRanges = [
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta Semana' },
  { value: 'month', label: 'Este Mês' },
  { value: 'quarter', label: 'Este Trimestre' },
  { value: 'year', label: 'Este Ano' },
  { value: 'custom', label: 'Personalizado' },
];

export function TimeRangeSelector({ value, onChange, className = '' }: TimeRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Calendar size={16} className="text-slate-400" aria-hidden="true" />
        <span className="text-slate-700">
          {timeRanges.find((range) => range.value === value)?.label || 'Selecionar período'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20">
            <div className="p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => {
                    onChange(range.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                    value === range.value
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
