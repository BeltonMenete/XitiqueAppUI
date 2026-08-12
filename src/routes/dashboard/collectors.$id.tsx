import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Calendar,
  MoreVertical,
  RefreshCw,
  MapPin,
  PauseCircle,
  Delete,
  TrendingUp,
  AlertCircle,
  Star,
  Info,
  Headphones,
  ArrowLeftRight,
  Printer,
  Phone,
  Mail,
  Edit
} from 'lucide-react';
import { DashboardLayout } from '#/components/layout/DashboardLayout';
import { Sidebar } from '#/components/layout/Sidebar';
import { Header } from '#/components/layout/Header';
import { Card, CardContent, CardHeader } from '#/components/ui/Card';
import { Button } from '#/components/ui/Button';
import { KPICard } from '#/components/ui/KPICard';
import { cn } from '#/lib/design-system';

export const Route = createFileRoute('/dashboard/collectors/$id')({
  component: CollectorDetails,
});

interface Collector {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  location: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'basic' | 'pro' | 'enterprise';
  clientCount: number;
  lastLogin: string;
  avatar?: string;
}

const mockCollector: Collector = {
  id: '1',
  name: 'João Silva',
  phone: '+258 84 123 4567',
  email: 'joao@xitique.com',
  joinDate: '15/05/2024',
  location: 'Maputo, KaMpfumo',
  status: 'active',
  plan: 'pro',
  clientCount: 47,
  lastLogin: 'há 2h',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHhdGP7ISm5de7Q2y429HW-ZNfxVEgiCVNQWHhzNOy7qWROmFBCiOfNeH1Q99OB7XyYzuuw5wW6LWvbekwXf0_ADKP6eUWKZ8H8uxK4KdTNykHn_hn9kjEYGyPg3zU-voK4EBB61bbCoTnkbOXaEV5ZF_mq3uceGZn40T7zHzDH-_Ls934Zy8I-SKZvj0REE9rDxY-ZzrX_a9uO_ZtVN8GXdTY4-Cm7PT-cmC93i1wa7p2dXZ3OvZrxDnCAKfFRoxf6tJSb5rA50rB',
};

const mockActivities = [
  { id: '1', client: 'Ana Mabunda', initials: 'AM', action: 'Recebimento Xitique', amount: '2.500 MZN', time: '14:45', status: 'synchronized' },
  { id: '2', client: 'Sérgio Matsinhe', initials: 'SM', action: 'Nova Adesão', amount: '5.000 MZN', time: '14:20', status: 'synchronized' },
  { id: '3', client: 'Fátima Chissano', initials: 'FC', action: 'Atraso Notificado', amount: '--', time: '13:55', status: 'pending' },
  { id: '4', client: 'José Mondlane', initials: 'JM', action: 'Retroativo Pago', amount: '1.250 MZN', time: '13:10', status: 'synchronized' },
];

function CollectorDetails() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'closures', label: 'Fechamentos' },
    { id: 'open', label: 'Abertos' },
    { id: 'retroactive', label: 'Retroativos', badge: 3 },
    { id: 'performance', label: 'Desempenho' },
    { id: 'audit', label: 'Auditoria' },
    { id: 'settings', label: 'Configurações' },
  ];

  const sidebarItems = [
    { label: 'Painel', icon: TrendingUp, href: '/dashboard/overview' },
    { label: 'Gestão', icon: Star, href: '/dashboard/savers' },
    { label: 'Cobradores', icon: Info, href: '/dashboard/collectors', isActive: true },
    { label: 'Financeiro', icon: Star, href: '/dashboard/financial' },
    { label: 'Relatórios', icon: TrendingUp, href: '/dashboard/reports' },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <Sidebar items={sidebarItems} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Detalhes do Cobrador" />
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Painel</span>
              <span className="text-slate-400">/</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Cobradores</span>
              <span className="text-slate-400">/</span>
              <span className="text-emerald-600 font-bold">João Silva</span>
            </nav>

            {/* Header Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                  <div className="flex gap-6 items-start">
                    <div className="relative">
                      <img
                        src={mockCollector.avatar}
                        alt={mockCollector.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">{mockCollector.name}</h2>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                          Ativo
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>{mockCollector.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} />
                          <span>{mockCollector.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Membro desde {mockCollector.joinDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{mockCollector.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                          Plano Pro
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                          {mockCollector.clientCount} clientes
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Último login: {mockCollector.lastLogin}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" leftIcon={<Edit size={16} />}>
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<ArrowLeftRight size={16} />}>
                      Transferir Clientes
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<Printer size={16} />}>
                      Imprimir Relatório
                    </Button>
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<MoreVertical size={16} />}
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <span className="sr-only">Mais opções</span>
                      </Button>
                      {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-20">
                          <div className="p-2 space-y-1">
                            <button type="button" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded transition-colors text-sm w-full text-left">
                              <RefreshCw size={16} /> Reset PIN
                            </button>
                            <button type="button" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded transition-colors text-sm w-full text-left">
                              <MapPin size={16} /> Ver Localização
                            </button>
                            <button type="button" className="flex items-center gap-2 p-2 hover:bg-amber-50 text-amber-600 rounded transition-colors text-sm w-full text-left">
                              <PauseCircle size={16} /> Suspender
                            </button>
                            <button type="button" className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded transition-colors text-sm w-full text-left border-t border-slate-200 mt-1">
                              <Delete size={16} /> Deletar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <nav className="flex items-center border-b border-slate-200 gap-6 px-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-4 px-2 whitespace-nowrap text-sm transition-all border-b-2",
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-600 font-bold"
                      : "border-transparent text-slate-500 hover:text-emerald-600"
                  )}
                >
                  {tab.label}
                  {tab.badge && (
                    <span className="ml-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <KPICard
                title="Arrecadado Hoje"
                value="12.600 MZN"
                subtext="Registado no Sistema: 12.600 MZN"
                icon={Calendar}
                color="text-emerald-600 bg-emerald-50 border-emerald-100"
                trend={{ value: 'Conforme', isPositive: true }}
              />
              <KPICard
                title="Arrecadado Mês Atual"
                value="125.000 MZN"
                subtext="↑12% vs mês passado"
                icon={TrendingUp}
                color="text-emerald-600 bg-emerald-50 border-emerald-100"
                trend={{ value: '12%', isPositive: true }}
              />
              <KPICard
                title="Média por Dia"
                value="4.166 MZN"
                subtext="30 dias trabalhados"
                icon={Info}
                color="text-blue-600 bg-blue-50 border-blue-100"
              />
              <KPICard
                title="Diferença Total Mês"
                value="-350 MZN"
                subtext="0.28% do volume total"
                icon={AlertCircle}
                color="text-red-600 bg-red-50 border-red-100"
                isDebt={true}
              />
            </div>

            {/* Activity Table and Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex justify-between items-center pb-4">
                    <h4 className="font-semibold text-slate-900">Atividades Recentes</h4>
                    <button type="button" className="text-emerald-600 hover:underline text-sm font-bold">Ver Tudo</button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                          <th className="px-6 py-3">Cliente</th>
                          <th className="px-6 py-3">Acção</th>
                          <th className="px-6 py-3">Valor</th>
                          <th className="px-6 py-3">Hora</th>
                          <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {mockActivities.map((activity) => (
                          <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                                  {activity.initials}
                                </div>
                                <span className="text-sm font-medium text-slate-900">{activity.client}</span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-600">{activity.action}</td>
                            <td className="px-6 py-3 text-sm font-mono text-slate-900">{activity.amount}</td>
                            <td className="px-6 py-3 text-sm text-slate-500">{activity.time}</td>
                            <td className="px-6 py-3 text-right">
                              <span
                                className={cn(
                                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                  activity.status === 'synchronized'
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : "bg-orange-500/10 text-orange-600"
                                )}
                              >
                                {activity.status === 'synchronized' ? 'Sincronizado' : 'Pendente'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex justify-between items-center pb-4">
                  <h4 className="font-semibold text-slate-900">Saúde da Carteira</h4>
                  <Info size={16} className="text-slate-400 cursor-pointer" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Meta Mensal (150k)</span>
                      <span className="font-bold text-slate-900">83%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Sync Offline</span>
                      <span className="font-bold text-amber-600">92%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <p className="text-[11px] text-slate-400 italic leading-tight">
                      3 transações pendentes de sincronização local.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-full">
                        <Star size={16} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Rating Performance</p>
                        <div className="flex text-amber-500 items-center gap-1">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} />
                          <span className="text-sm font-bold text-slate-900 ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <button type="button" className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Headphones size={24} />
        <div className="absolute right-full mr-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Suporte WhatsApp
        </div>
      </button>
    </DashboardLayout>
  );
}
