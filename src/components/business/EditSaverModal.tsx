import { useState } from 'react';
import { Modal, ModalFooter } from '#/components/ui/Modal';
import { Button } from '#/components/ui/Button';

interface EditSaverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditSaverData) => void;
  initialData?: EditSaverData;
}

interface EditSaverData {
  name: string;
  phone: string;
  dailyAmount: string;
  contact?: string;
  identityDocument?: string;
  pin?: string;
  occupation?: string;
  isActive: boolean;
}

export function EditSaverModal({ isOpen, onClose, onSubmit, initialData }: EditSaverModalProps) {
  const [formData, setFormData] = useState<EditSaverData>(
    initialData || {
      name: '',
      phone: '',
      dailyAmount: '',
      contact: '',
      identityDocument: '',
      pin: '',
      occupation: '',
      isActive: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Ticante" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
            Nome Completo *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
              Telefone *
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="dailyAmount" className="block text-xs font-semibold text-slate-700 mb-1">
              Valor Diário (MZN) *
            </label>
            <input
              id="dailyAmount"
              type="number"
              value={formData.dailyAmount}
              onChange={(e) => setFormData({ ...formData, dailyAmount: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact" className="block text-xs font-semibold text-slate-700 mb-1">
            Localização
          </label>
          <input
            id="contact"
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="identityDocument" className="block text-xs font-semibold text-slate-700 mb-1">
              Documento de Identidade
            </label>
            <input
              id="identityDocument"
              type="text"
              value={formData.identityDocument}
              onChange={(e) => setFormData({ ...formData, identityDocument: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="pin" className="block text-xs font-semibold text-slate-700 mb-1">
              PIN
            </label>
            <input
              id="pin"
              type="text"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              maxLength={6}
            />
          </div>
        </div>

        <div>
          <label htmlFor="occupation" className="block text-xs font-semibold text-slate-700 mb-1">
            Profissão
          </label>
          <input
            id="occupation"
            type="text"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
          />
          <label htmlFor="isActive" className="text-sm text-slate-700">
            Ticante Activo
          </label>
        </div>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Guardar Alterações
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
