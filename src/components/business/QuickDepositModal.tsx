import { useState } from 'react';
import { Modal, ModalFooter } from '#/components/ui/Modal';
import { Button } from '#/components/ui/Button';
import { DollarSign, CheckCircle2 } from 'lucide-react';

interface QuickDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepositData) => void;
  saverName?: string;
  lastAmount?: number;
}

interface DepositData {
  amount: string;
  date: string;
  notes?: string;
}

export function QuickDepositModal({ isOpen, onClose, onSubmit, saverName, lastAmount }: QuickDepositModalProps) {
  const [formData, setFormData] = useState<DepositData>({
    amount: lastAmount ? String(lastAmount) : '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    setFormData({
      amount: lastAmount ? String(lastAmount) : '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCancel} title="Registar Depósito" size="sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {saverName && (
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-600">Depositando para: <span className="font-semibold text-slate-900">{saverName}</span></p>
            </div>
          )}

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
              Valor do Depósito (MZN) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={16} className="text-slate-400" />
              </div>
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                min="0"
                step="0.01"
              />
            </div>
            {lastAmount && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, amount: String(lastAmount) })}
                className="text-xs text-emerald-600 hover:text-emerald-700 mt-1"
              >
                Usar último valor: {lastAmount} MZN
              </button>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Data *
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
              Notas (Opcional)
            </label>
            <textarea
              id="notes"
              placeholder="Observações sobre o depósito..."
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" leftIcon={<CheckCircle2 size={16} />}>
              Confirmar Depósito
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white border-l-4 border-emerald-500 shadow-lg rounded-lg p-4 transform transition-all duration-300 z-50 flex items-start gap-4 max-w-sm">
          <CheckCircle2 className="text-emerald-500 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-slate-900">Depósito Registado</h4>
            <p className="text-xs text-slate-500 mt-1">O depósito foi registado com sucesso.</p>
          </div>
        </div>
      )}
    </>
  );
}
