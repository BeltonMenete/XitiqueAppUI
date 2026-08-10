import { CheckCircle2, AlertCircle, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '#/components/ui/Card';
import { cn } from '#/lib/design-system';

interface DepositHistoryProps {
  saverId: string;
  month?: number;
  year?: number;
}

interface Deposit {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'partial' | 'unpaid' | 'deleted';
  day: number;
  collectorAgent?: string;
  deletionMotive?: string;
}

export function DepositHistory({ saverId, month = new Date().getMonth() + 1, year = new Date().getFullYear() }: DepositHistoryProps) {
  // Currently using mock data, saverId will be used when integrated with API
  void saverId; // Mark as intentionally unused for now
  const mockDeposits: Deposit[] = [
    { id: '1', date: '01/05/2024', amount: '500 MZN', status: 'paid', day: 1, collectorAgent: 'João Silva' },
    { id: '2', date: '02/05/2024', amount: '500 MZN', status: 'paid', day: 2, collectorAgent: 'João Silva' },
    { id: '3', date: '03/05/2024', amount: '250 MZN', status: 'partial', day: 3, collectorAgent: 'João Silva' },
    { id: '4', date: '04/05/2024', amount: '500 MZN', status: 'paid', day: 4, collectorAgent: 'João Silva' },
    { id: '5', date: '05/05/2024', amount: '500 MZN', status: 'unpaid', day: 5 },
    { id: '6', date: '06/05/2024', amount: '500 MZN', status: 'paid', day: 6, collectorAgent: 'Maria Santos' },
    { id: '7', date: '07/05/2024', amount: '500 MZN', status: 'paid', day: 7, collectorAgent: 'Maria Santos' },
    { id: '8', date: '08/05/2024', amount: '500 MZN', status: 'deleted', day: 8, deletionMotive: 'Erro de registo' },
    { id: '9', date: '09/05/2024', amount: '500 MZN', status: 'paid', day: 9, collectorAgent: 'Maria Santos' },
    { id: '10', date: '10/05/2024', amount: '500 MZN', status: 'paid', day: 10, collectorAgent: 'João Silva' },
  ];

  const totalDeposited = mockDeposits
    .filter(d => d.status === 'paid' || d.status === 'partial')
    .reduce((sum, d) => {
      const amount = parseInt(d.amount.replace(/[^0-9]/g, ''), 10);
      return sum + amount;
    }, 0);

  const paidDays = mockDeposits.filter(d => d.status === 'paid').length;
  const partialDays = mockDeposits.filter(d => d.status === 'partial').length;
  const unpaidDays = mockDeposits.filter(d => d.status === 'unpaid').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Histórico de Depósitos</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={16} />
            <span>{month}/{year}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">Total</p>
            <p className="font-mono text-lg font-bold text-emerald-600">{totalDeposited} MZN</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">Pagos</p>
            <p className="font-mono text-lg font-bold text-emerald-600">{paidDays} dias</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-[10px] uppercase font-bold text-amber-600 tracking-wider mb-1">Parciais</p>
            <p className="font-mono text-lg font-bold text-amber-600">{partialDays} dias</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Pendentes</p>
            <p className="font-mono text-lg font-bold text-slate-600">{unpaidDays} dias</p>
          </div>
        </div>

        {/* Deposits List */}
        <div className="space-y-2">
          {mockDeposits.map((deposit) => (
            <div
              key={deposit.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-all",
                deposit.status === 'deleted' && "bg-red-50 border-red-200 opacity-60",
                deposit.status === 'unpaid' && "bg-slate-50 border-slate-200",
                deposit.status === 'partial' && "bg-amber-50 border-amber-200",
                deposit.status === 'paid' && "bg-emerald-50 border-emerald-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  deposit.status === 'paid' ? 'bg-emerald-500 text-white' :
                    deposit.status === 'partial' ? 'bg-amber-500 text-white' :
                      deposit.status === 'deleted' ? 'bg-red-500 text-white' :
                        'bg-slate-300 text-slate-500'
                )}>
                  {deposit.status === 'paid' ? (
                    <CheckCircle2 size={16} />
                  ) : deposit.status === 'partial' ? (
                    <Clock size={16} />
                  ) : deposit.status === 'deleted' ? (
                    <AlertCircle size={16} />
                  ) : (
                    <span className="text-sm">!</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-slate-900">{deposit.date}</p>
                    <span className="text-[10px] text-slate-400">Dia {deposit.day}</span>
                  </div>
                  {deposit.collectorAgent && (
                    <p className="text-[10px] text-slate-400">Cobrador: {deposit.collectorAgent}</p>
                  )}
                  {deposit.deletionMotive && (
                    <p className="text-[10px] text-red-600">{deposit.deletionMotive}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold text-slate-900">{deposit.amount}</p>
                {deposit.status === 'partial' && (
                  <p className="text-[10px] text-amber-600">Parcial</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
