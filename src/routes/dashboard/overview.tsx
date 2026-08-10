import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  TrendingUp,
  Users,
  Wallet,
  AlertCircle,
  Settings,
  Handshake,
  Info,
  Star,
  Plus
} from 'lucide-react';
import { DashboardLayout } from '#/components/layout/DashboardLayout';
import { Sidebar } from '#/components/layout/Sidebar';
import { Header } from '#/components/layout/Header';
import { KPICard } from '#/components/ui/KPICard';
import { Card, CardContent } from '#/components/ui/Card';
import { Button } from '#/components/ui/Button';
import { cn } from '#/lib/design-system';

export const Route = createFileRoute('/dashboard/overview')({
  component: OrganizationDashboard,
});

function OrganizationDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarItems = [
    { label: 'Painel', icon: TrendingUp, href: '/dashboard/overview', isActive: true },
    { label: 'Gestão', icon: Users, href: '/dashboard/savers' },
    { label: 'Financeiro', icon: Wallet, href: '/dashboard/financial' },
    { label: 'Relatórios', icon: Info, href: '/dashboard/reports' },
    { label: 'Configurações', icon: Settings, href: '/dashboard/settings' },
  ];

  const kpiData = [
    {
      title: 'Arrecadado Mês',
      value: '450.000 MZN',
      subtext: '+12.5% vs mês anterior',
      icon: Wallet,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      isDebt: false,
      trend: { value: '12.5%', isPositive: true },
    },
    {
      title: 'Comissão Mês',
      value: '45.000 MZN',
      subtext: 'No caminho da meta',
      icon: Star,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      isDebt: false,
    },
    {
      title: 'Emprestado',
      value: '60.000 MZN',
      subtext: '8 Empréstimos Activos',
      icon: Handshake,
      color: 'text-slate-600 bg-slate-50 border-slate-100',
      isDebt: false,
    },
    {
      title: 'Diferença Caixa',
      value: '-2.300 MZN',
      subtext: 'Requer Reconciliação',
      icon: AlertCircle,
      color: 'text-red-600 bg-red-50 border-red-100',
      isDebt: true,
    },
  ];

  return (
    <DashboardLayout>
      <Sidebar items={sidebarItems} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          title="Olá, Ana - Xitique Central"
          description="Monitoria de fluxos rotativos e validação de carteiras"
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar Ticantes..."
        />

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-950 tracking-tight">Painel de Organização</h2>
              <p className="text-[11px] text-slate-400">Visão geral das actividades da sua organização</p>
            </div>
            <Button size="sm" leftIcon={<Plus size={16} />}>
              Nova Colecta
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Collection Evolution Chart */}
            <div className="col-span-12 lg:col-span-8">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">Evolução de Colectas</h3>
                    <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white">
                      <option>Últimos 6 meses</option>
                      <option>Último ano</option>
                    </select>
                  </div>
                  {/* Chart placeholder */}
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                    <p className="text-sm text-slate-400">Gráfico de evolução de colectas</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Actividade Recente</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Nova colecta', user: 'Maria Silva', time: 'Há 5 min' },
                      { action: 'Empréstimo aprovado', user: 'João Machava', time: 'Há 15 min' },
                      { id: '1', action: 'Pagamento recebido', user: 'Alberto Chongo', time: 'Há 30 min' },
                      { id: '2', action: 'Membro registado', user: 'Sofia Macamo', time: 'Há 1 hora' },
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Users size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-900">{activity.action}</p>
                          <p className="text-[10px] text-slate-400">{activity.user}</p>
                        </div>
                        <span className="text-[10px] text-slate-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Member Statistics */}
            <div className="col-span-12 lg:col-span-6">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Estatísticas de Membros</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-slate-900">342</p>
                      <p className="text-xs text-slate-400">Total de Membros</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">318</p>
                      <p className="text-xs text-slate-400">Membros Activos</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-2xl font-bold text-amber-600">18</p>
                      <p className="text-xs text-slate-400">Novos este mês</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">6</p>
                      <p className="text-xs text-slate-400">Em Incumprimento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Loan Overview */}
            <div className="col-span-12 lg:col-span-6">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Visão Geral de Empréstimos</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'João Machava', amount: '15.000 MZN', status: 'approved' },
                      { name: 'Maria Santos', amount: '10.000 MZN', status: 'pending' },
                      { id: '1', name: 'Alberto Chongo', amount: '20.000 MZN', status: 'approved' },
                      { id: '2', name: 'Sofia Macamo', amount: '8.000 MZN', status: 'rejected' },
                    ].map((loan) => (
                      <div key={loan.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="text-xs font-medium text-slate-900">{loan.name}</p>
                          <p className="text-[10px] text-slate-400">{loan.amount}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] px-2 py-1 rounded-full font-medium",
                          loan.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                            loan.status === 'pending' ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                        )}>
                          {loan.status === 'approved' ? 'Aprovado' :
                            loan.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
