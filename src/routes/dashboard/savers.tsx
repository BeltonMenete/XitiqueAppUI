import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Wallet,
  DollarSign,
  Phone,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { DashboardLayout } from '#/components/layout/DashboardLayout';
import { Sidebar } from '#/components/layout/Sidebar';
import { Header } from '#/components/layout/Header';
import { DataTable } from '#/components/ui/DataTable';
import { Button } from '#/components/ui/Button';
import { KPICard } from '#/components/ui/KPICard';
import { Card, CardContent } from '#/components/ui/Card';
import { DebtBadge, ActiveBadge, InactiveBadge } from '#/components/ui/StatusBadge';
import { ExpandableRowContent } from '#/components/ui/ExpandableRow';
import { cn } from '#/lib/design-system';
import { useSavers } from '#/features/savers';
import { RegisterSaverModal } from '#/components/business/RegisterSaverModal';
import { QuickDepositModal } from '#/components/business/QuickDepositModal';
import { QuickLoanModal } from '#/components/business/QuickLoanModal';
import type { Saver } from '#/features/savers/types';

export const Route = createFileRoute('/dashboard/savers')({
  component: SaversManagement,
});

const mockSavers: Saver[] = [
  {
    id: '1',
    cardNumber: 1001,
    name: 'Carlos Mondlane',
    dailyAmount: 500,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-01-15',
    totalSaved: 7500,
    currentDebt: 2300,
    daysInCycle: 15,
    status: 'in_debt',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
  {
    id: '2',
    cardNumber: 1002,
    name: 'Ana Vilanculos',
    dailyAmount: 250,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-02-01',
    totalSaved: 2500,
    currentDebt: 1500,
    daysInCycle: 5,
    status: 'in_debt',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
  {
    id: '3',
    cardNumber: 1003,
    name: 'Bento Sitoe',
    dailyAmount: 300,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-03-10',
    totalSaved: 6600,
    currentDebt: 0,
    daysInCycle: 22,
    status: 'active',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
  {
    id: '4',
    cardNumber: 1004,
    name: 'Eduarda Langa',
    dailyAmount: 1000,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-01-10',
    totalSaved: 12000,
    currentDebt: 2000,
    daysInCycle: 12,
    status: 'in_debt',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
  {
    id: '5',
    cardNumber: 1005,
    name: 'Geraldo Mucavele',
    dailyAmount: 150,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-01-05',
    totalSaved: 4500,
    currentDebt: 0,
    daysInCycle: 30,
    status: 'active',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
  {
    id: '6',
    cardNumber: 1006,
    name: 'Isabel Tembe',
    dailyAmount: 200,
    organizationId: 'org-1',
    isActive: true,
    registrationDate: '2024-02-15',
    totalSaved: 5000,
    currentDebt: 0,
    daysInCycle: 25,
    status: 'active',
    organization: { id: 'org-1', name: 'Xitique Central' },
  },
];

function SaversManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Maio 2024');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedSaver, setSelectedSaver] = useState<Saver | null>(null);

  const { data: saversData } = useSavers({ page: 1, pageSize: 20 });
  const savers = saversData?.data || mockSavers;

  // Use savers in the component
  console.log('Savers count:', savers.length);

  const sidebarItems = [
    { label: 'Painel', icon: Users, href: '/dashboard/overview' },
    { label: 'Gestão', icon: Users, href: '/dashboard/savers', isActive: true },
    { label: 'Financeiro', icon: Wallet, href: '/dashboard/financial' },
    { label: 'Relatórios', icon: TrendingUp, href: '/dashboard/reports' },
    { label: 'Configurações', icon: Search, href: '/dashboard/settings' },
  ];

  const kpiData = [
    {
      title: 'Total Ticantes',
      value: String(savers.length),
      subtext: 'Total registado',
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      isDebt: false,
    },
    {
      title: 'Total Sob Gestão',
      value: '450.000 MZN',
      subtext: '+12.5% vs mês anterior',
      icon: Wallet,
      color: 'text-slate-600 bg-slate-50 border-slate-100',
      isDebt: false,
      trend: { value: '12.5%', isPositive: true },
    },
    {
      title: 'Empréstimos Activos',
      value: '8.000 MZN',
      subtext: '3 empréstimos activos',
      icon: Wallet,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      isDebt: false,
    },
    {
      title: 'Em Incumprimento',
      value: String(savers.filter((s) => s.status === 'in_debt').length),
      subtext: 'Ticantes em dívida',
      icon: AlertCircle,
      color: 'text-red-600 bg-red-50 border-red-100',
      isDebt: true,
    },
  ];

  const columns = [
    {
      key: 'cardNumber',
      header: 'TICANTE',
      render: (value: unknown, row: Saver) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-mono text-[11px] text-slate-400">{String(value)}</span>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              row.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
            )} />
          </div>
          <span className="font-bold text-sm text-slate-900 truncate w-32">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'dailyAmount',
      header: 'VALOR DIÁRIO',
      render: (value: unknown) => (
        <span className="text-sm">{Number(value).toLocaleString()} MZN</span>
      ),
    },
    {
      key: 'totalSaved',
      header: 'TOTAL POUPADO',
      render: (value: unknown) => (
        <span className="text-sm">{Number(value).toLocaleString()} MZN</span>
      ),
    },
    {
      key: 'currentDebt',
      header: 'DÍVIDA ATUAL',
      render: (value: unknown) => (
        <span className={cn(
          "text-sm",
          Number(value) > 0 ? 'text-red-600' : 'text-slate-500'
        )}>
          {Number(value).toLocaleString()} MZN
        </span>
      ),
    },
    {
      key: 'daysInCycle',
      header: 'DIAS NO CICLO',
      render: (value: unknown) => (
        <span className="text-sm">{String(value)} Dias</span>
      ),
    },
    {
      key: 'status',
      header: 'ESTADO',
      render: (_: unknown, row: Saver) => {
        if (row.status === 'active') return <ActiveBadge />;
        if (row.status === 'in_debt') return <DebtBadge />;
        if (row.status === 'inactive') return <InactiveBadge />;
        return <span className="text-xs text-slate-400">-</span>;
      },
    },
  ];

  const renderExpandedRow = (row: Saver) => (
    <ExpandableRowContent
      title={`Detalhes de ${row.name}`}
      onViewFullDetails={() => console.log('Navigate to full details:', row.id)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <DollarSign size={14} />
            <span>Total Poupança</span>
          </div>
          <p className="text-lg font-bold text-slate-900">{row.totalSaved.toLocaleString()} MZN</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle size={14} />
            <span>Dívida Atual</span>
          </div>
          <p className={cn("text-lg font-bold", row.currentDebt > 0 ? "text-red-600" : "text-slate-900")}>
            {row.currentDebt.toLocaleString()} MZN
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} />
            <span>Dias no Ciclo</span>
          </div>
          <p className="text-lg font-bold text-slate-900">{row.daysInCycle} dias</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <h5 className="text-xs font-semibold text-slate-500 uppercase mb-3">Acções Rápidas</h5>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<DollarSign size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSaver(row);
              setIsDepositModalOpen(true);
            }}
          >
            Registar Depósito
          </Button>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Phone size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSaver(row);
              setIsLoanModalOpen(true);
            }}
          >
            Solicitar Empréstimo
          </Button>
          <Button size="sm" variant="outline" leftIcon={<MoreVertical size={14} />}>
            Mais Opções
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <h5 className="text-xs font-semibold text-slate-500 uppercase mb-3">Informação de Contacto</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Organização:</span>
            <span className="ml-2 font-medium text-slate-900">{row.organization?.name || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500">Data de Registo:</span>
            <span className="ml-2 font-medium text-slate-900">{row.registrationDate}</span>
          </div>
        </div>
      </div>
    </ExpandableRowContent>
  );

  return (
    <DashboardLayout>
      <Sidebar items={sidebarItems} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          title="Gestão de Ticantes"
          description="Visão expandida e financeira dos membros"
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar ticante..."
          rightContent={
            <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setIsRegisterModalOpen(true)}>
              Novo Ticante
            </Button>
          }
        />

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-950 tracking-tight">Gestão de Ticantes</h2>
              <p className="text-[11px] text-slate-400">Visão expandida e financeira dos membros</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {['Março 2024', 'Abril 2024', 'Maio 2024'].map((month) => (
                  <button
                    key={month}
                    type="button"
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                      selectedMonth === month
                        ? "bg-slate-200 text-slate-700"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" leftIcon={<Filter size={16} />}>
                  Filtros
                </Button>
                <Button size="sm" variant="secondary" leftIcon={<ChevronDown size={16} />}>
                  Vista Expandida
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Savers Table */}
            <div className="col-span-12">
              <Card>
                <CardContent className="p-0">
                  <DataTable
                    data={savers}
                    columns={columns}
                    searchable={true}
                    searchPlaceholder="Pesquisar por nome ou número de cartão..."
                    onRowClick={(row) => console.log('View saver:', row)}
                    emptyMessage="Nenhum ticante encontrado"
                    expandable={true}
                    renderExpandedRow={renderExpandedRow}
                    onRowExpand={(row) => console.log('Row expanded:', row.id)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Financial Summary */}
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Resumo Financeiro</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Colectado Este Mês</p>
                      <p className="text-xl font-bold text-emerald-600">75.000 MZN</p>
                      <p className="text-[10px] text-emerald-600 mt-1">+15% vs mês anterior</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Em Dívida</p>
                      <p className="text-xl font-bold text-red-600">2.300 MZN</p>
                      <p className="text-[10px] text-red-600 mt-1">4 ticantes afectados</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Taxa de Assiduidade</p>
                      <p className="text-xl font-bold text-slate-900">94.2%</p>
                      <p className="text-[10px] text-slate-400 mt-1">322 de 342 ticantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-8">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Actividade Recente</h3>
                  <div className="space-y-3">
                    {[
                      { id: '1', action: 'Novo depósito', user: 'Carlos Mondlane', amount: '500 MZN', time: 'Há 5 min' },
                      { id: '2', action: 'Empréstimo aprovado', user: 'Ana Vilanculos', amount: '1.000 MZN', time: 'Há 15 min' },
                      { id: '3', action: 'Pagamento recebido', user: 'Bento Sitoe', amount: '300 MZN', time: 'Há 30 min' },
                      { id: '4', action: 'Novo ticante registado', user: 'Eduarda Langa', amount: '-', time: 'Há 1 hora' },
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Users size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-900">{activity.action}</p>
                          <p className="text-[10px] text-slate-400">{activity.user}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-slate-900">{activity.amount}</p>
                          <p className="text-[10px] text-slate-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <RegisterSaverModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmit={(data) => console.log('Register saver:', data)}
      />

      <QuickDepositModal
        isOpen={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          setSelectedSaver(null);
        }}
        onSubmit={(data) => console.log('Deposit:', data)}
        saverName={selectedSaver?.name}
        lastAmount={selectedSaver?.dailyAmount}
      />

      <QuickLoanModal
        isOpen={isLoanModalOpen}
        onClose={() => {
          setIsLoanModalOpen(false);
          setSelectedSaver(null);
        }}
        onSubmit={(data) => console.log('Loan:', data)}
        saverName={selectedSaver?.name}
        maxLoanAmount={selectedSaver?.totalSaved ? selectedSaver.totalSaved * 2 : 50000}
      />
    </DashboardLayout>
  );
}
