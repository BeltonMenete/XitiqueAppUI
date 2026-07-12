// /routes/dashboard/route.tsx
import { createFileRoute } from '@tanstack/react-router';
import {
    Building2,
    Users,
    TrendingUp,
    Wallet,
    Plus,
    Search,
    Bell,
    Check,
    X,
    MessageSquare,
    Filter,
    Download,
    AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import { APP_NAME } from '#/lib/constants';

export const Route = createFileRoute('/dashboard')({
    component: DashboardMainView,
});

const MOCK_SUMMARY_CARDS = [
    {
        id: 'total',
        title: 'Total Sob Gestão (MZN)',
        value: 'MT 245.500,00',
        subtext: '+12.3% em relação ao mês anterior',
        icon: Wallet,
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        isDebt: false,
    },
    {
        id: 'active-groups',
        title: 'Grupos de Xitique Activos',
        value: '18 Grupos',
        subtext: '3 novos ciclos iniciados esta semana',
        icon: Users,
        color: 'text-blue-600 bg-blue-50 border-blue-100',
        isDebt: false,
    },
    {
        id: 'total-members',
        title: 'Total de Membros Registados',
        value: '342 Membros',
        subtext: 'Taxa de assiduidade de 98.4%',
        icon: Building2,
        color: 'text-emerald-700 bg-emerald-50/50 border-emerald-100/70',
        isDebt: false,
    },
    {
        id: 'debt-rate',
        title: 'Membros em Incumprimento (Dívida)',
        value: 'MT 14.200,00',
        subtext: '4.1% de taxa de atraso global',
        icon: AlertCircle,
        color: 'text-red-600 bg-red-50 border-red-100',
        isDebt: true,
    },
];

const MOCK_TABLE_ROWS = [
    {
        id: 'COL-8492',
        member: 'Albertina Chirindza',
        phone: '84 293 8492',
        group: 'Xitique do Mercado Central',
        quota: 'Rodada #4',
        amount: 'MT 2.500,00',
        date: 'Hoje, 14:32:05',
        status: 'paid',
    },
    {
        id: 'COL-7731',
        member: 'Sérgio Langa',
        phone: '82 931 0022',
        group: 'Cooperativa Agrícola Chókwè',
        quota: 'Rodada #12',
        amount: 'MT 25.000,00',
        date: 'Hoje, 11:15:22',
        status: 'paid',
    },
    {
        id: 'COL-9011',
        member: 'Isabel dos Santos',
        phone: '84 002 9112',
        group: 'Manas de Monapo',
        quota: 'Rodada #2',
        amount: 'MT 1.000,00',
        date: 'Ontem, 17:40:18',
        status: 'pending',
    },
    {
        id: 'COL-4412',
        member: 'Mateus Macamo',
        phone: '85 492 1102',
        group: 'Xitique dos Transportadores',
        quota: 'Rodada #9',
        amount: 'MT 5.000,00',
        date: '03 Jul 2026, 09:12:43',
        status: 'debt',
    },
];

function DashboardMainView() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='h-screen max-h-screen w-screen flex bg-slate-50/50 overflow-hidden font-sans selection:bg-emerald-900/10 antialiased text-gray-900'>
            {/* Barra Lateral de Navegação */}
            <aside className='hidden md:flex flex-col w-64 bg-white border-r border-gray-200/80 justify-between p-6 select-none shrink-0'>
                <div className='space-y-7'>
                    {/* Identidade Visual */}
                    <div className='flex items-center gap-2.5 px-2'>
                        <div className='w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm'>
                            X
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm font-extrabold tracking-tight text-gray-950'>{APP_NAME}</span>
                            <span className='text-[10px] text-gray-400 font-medium tracking-wide'>Gestor de Poupança</span>
                        </div>
                    </div>

                    {/* Links de Rotas Centrais */}
                    <nav className='space-y-1'>
                        <a
                            href='/dashboard'
                            className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm shadow-emerald-600/10 transition-all'
                        >
                            <TrendingUp size={16} />
                            <span>Painel Geral</span>
                        </a>
                        <a
                            href='/dashboard/groups'
                            className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group'
                        >
                            <Users size={16} className='text-gray-400 group-hover:text-gray-600' />
                            <span>Grupos Activos</span>
                        </a>
                        <a
                            href='/dashboard/organizations'
                            className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group'
                        >
                            <Building2 size={16} className='text-gray-400 group-hover:text-gray-600' />
                            <span>Minha Organização</span>
                        </a>
                    </nav>
                </div>

                <div className='pt-4 border-t border-gray-100 flex items-center justify-between text-gray-400 text-[10px] font-bold uppercase tracking-wider'>
                    <span>Licença Oficial</span>
                    <span className='bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[9px]'>MZ-2026</span>
                </div>
            </aside>

            {/* Frame Principal do Workspace */}
            <div className='flex-1 flex flex-col h-full overflow-hidden'>
                {/* Top Global Utility Navbar */}
                <header className='h-16 border-b border-gray-200/80 bg-white px-6 flex items-center justify-between select-none shrink-0'>
                    <div>
                        <h1 className='text-sm font-bold text-gray-950 tracking-tight'>Consola Administrativa</h1>
                        <p className='text-[11px] text-gray-400 hidden sm:block'>
                            Monitoria de fluxos rotativos e validação de carteiras.
                        </p>
                    </div>

                    {/* Ferramentas do Cabeçalho */}
                    <div className='flex items-center gap-4'>
                        <div className='relative w-48 sm:w-64 group'>
                            <Search className='absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors' />
                            <input
                                type='text'
                                placeholder='Pesquisar membro ou grupo...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full pl-8 pr-3 py-2 bg-gray-50 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all duration-200'
                            />
                        </div>
                        <button
                            type='button'
                            className='p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-xl border border-gray-100 relative transition-all'
                        >
                            <Bell size={16} />
                            <span className='absolute top-1.5 right-1.5 h-2 w-2 bg-emerald-500 rounded-full ring-2 ring-white'></span>
                        </button>
                    </div>
                </header>

                {/* Conteúdo Dinâmico com Scroll */}
                <main className='flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500'>
                    {/* Banner Principal e Acções de Entrada de Dados */}
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)]'>
                        <div>
                            <h2 className='text-base font-bold text-gray-900 tracking-tight'>
                                Gestão Unificada de Rodadas de Xitique
                            </h2>
                            <p className='text-xs text-gray-500 mt-0.5'>
                                Valide pagamentos diários, gerencie os ciclos rotativos e faça retiradas direto na plataforma.
                            </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button
                                type='button'
                                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs'
                            >
                                <Download size={14} />
                                <span>Exportar Relatório</span>
                            </button>
                            <button
                                type='button'
                                className='group/btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-xs shadow-sm hover:shadow-lg hover:shadow-emerald-700/10'
                            >
                                <Plus size={14} className='group-hover/btn:rotate-90 transition-transform' />
                                <span>Lançar Novo Grupo</span>
                            </button>
                        </div>
                    </div>

                    {/* Grade de Cartões Financeiros Expandida */}
                    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {MOCK_SUMMARY_CARDS.map((card) => {
                            const IconComp = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className={`bg-white p-5 rounded-xl border border-gray-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all hover:border-gray-300 group ${card.isDebt ? 'border-l-4 border-l-red-500' : ''
                                        }`}
                                >
                                    <div className='space-y-1.5'>
                                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-wider block'>
                                            {card.title}
                                        </span>
                                        <span className='text-lg font-bold text-gray-900 tracking-tight block'>{card.value}</span>
                                        <span className='text-[11px] text-gray-500 block'>{card.subtext}</span>
                                    </div>
                                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-105 ${card.color}`}>
                                        <IconComp size={18} />
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* Métricas de Alocação Regional */}
                    <section className='bg-white p-5 rounded-xl border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4'>
                        <div>
                            <h3 className='text-xs font-bold text-gray-900 uppercase tracking-wider'>
                                Métricas de Alocação Operacional
                            </h3>
                            <p className='text-[11px] text-gray-400 mt-0.5'>
                                Performance e saúde de arrecadação por distrito ativo.
                            </p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='space-y-1.5'>
                                <div className='flex justify-between text-[11px] font-semibold text-gray-600'>
                                    <span>Chókwè & Zonas Rurais</span>
                                    <span className='text-gray-900 font-bold'>92%</span>
                                </div>
                                <div className='w-full bg-gray-100 rounded-full h-1.5 overflow-hidden'>
                                    <div className='bg-emerald-600 h-1.5 rounded-full' style={{ width: '92%' }}></div>
                                </div>
                            </div>

                            <div className='space-y-1.5'>
                                <div className='flex justify-between text-[11px] font-semibold text-gray-600'>
                                    <span>Maputo Central</span>
                                    <span className='text-gray-900 font-bold'>78%</span>
                                </div>
                                <div className='w-full bg-gray-100 rounded-full h-1.5 overflow-hidden'>
                                    <div className='bg-emerald-500 h-1.5 rounded-full' style={{ width: '78%' }}></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Filtros em Abas e Tabela de Cobrança de Alta Densidade */}
                    <section className='bg-white rounded-xl border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden'>
                        {/* Abas e Controlos Superiores */}
                        <div className='p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none'>
                            <div className='flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 self-start'>
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Todos Contribuintes
                                </button>
                                <button
                                    onClick={() => setActiveTab('paid')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'paid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-600'}`}
                                >
                                    Confirmados
                                </button>
                                <button
                                    onClick={() => setActiveTab('debt')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'debt' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500 hover:text-red-600'}`}
                                >
                                    Em Dívida
                                </button>
                            </div>

                            <button
                                type='button'
                                className='text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50/40 px-3 py-1.5 rounded-xl border border-emerald-100/40 transition-colors'
                            >
                                <Filter size={14} />
                                <span>Mais Filtros</span>
                            </button>
                        </div>

                        {/* Tabela de Dados Reais de Alta Densidade */}
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left border-collapse'>
                                <thead>
                                    <tr className='bg-slate-50 text-gray-400 font-bold text-[10px] uppercase tracking-wider border-b border-gray-100'>
                                        <th className='p-4 pl-6'>ID Registo</th>
                                        <th className='p-4'>Membro / Telefone</th>
                                        <th className='p-4'>Grupo de Xitique</th>
                                        <th className='p-4'>Quota / Ciclo</th>
                                        <th className='p-4 text-right'>Valor</th>
                                        <th className='p-4'>Data / Hora / Segundos</th>
                                        <th className='p-4'>Estado</th>
                                        <th className='p-4 text-center pr-6'>Acções Rápidas</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100 text-xs'>
                                    {MOCK_TABLE_ROWS.filter((row) => activeTab === 'all' || row.status === activeTab).map(
                                        (row) => (
                                            <tr key={row.id} className='hover:bg-gray-50/60 transition-colors group'>
                                                <td className='p-4 pl-6 font-mono font-medium text-gray-400'>{row.id}</td>
                                                <td className='p-4'>
                                                    <div className='font-bold text-gray-900'>{row.member}</div>
                                                    <div className='text-gray-400 font-mono tracking-wide text-[11px] mt-0.5'>
                                                        {row.phone}
                                                    </div>
                                                </td>
                                                <td className='p-4 font-medium text-gray-700'>{row.group}</td>
                                                <td className='p-4'>
                                                    <span className='bg-gray-100 px-2 py-0.5 rounded-md text-[11px] font-semibold text-gray-600'>
                                                        {row.quota}
                                                    </span>
                                                </td>
                                                <td className='p-4 text-right font-bold text-gray-900'>{row.amount}</td>
                                                <td className='p-4 text-gray-500 font-mono font-medium'>{row.date}</td>
                                                <td className='p-4'>
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide inline-block ${row.status === 'paid'
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : row.status === 'pending'
                                                                ? 'bg-blue-50 text-blue-700'
                                                                : 'bg-red-50 text-red-700'
                                                            }`}
                                                    >
                                                        {row.status === 'paid'
                                                            ? 'Confirmado'
                                                            : row.status === 'pending'
                                                                ? 'Pendente'
                                                                : 'Em Dívida'}
                                                    </span>
                                                </td>
                                                <td className='p-4 text-center pr-6'>
                                                    <div className='flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity'>
                                                        <button
                                                            type='button'
                                                            title='Aprovar Entrada'
                                                            className='p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow-sm'
                                                        >
                                                            <Check size={12} />
                                                        </button>
                                                        <button
                                                            type='button'
                                                            title='Recusar / Estornar'
                                                            className='p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm'
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>

            {/* Botão Flutuante de Suporte */}
            <button
                type='button'
                title='Suporte Técnico'
                className='fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group shadow-emerald-600/20'
            >
                <MessageSquare size={22} className='group-hover:rotate-6 transition-transform' />
                <span className='absolute right-full mr-3 bg-gray-950 text-white text-[10px] font-bold tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md uppercase pointer-events-none'>
                    Suporte Xitique
                </span>
            </button>
        </div>
    );
}
