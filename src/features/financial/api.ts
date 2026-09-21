import type { PaginationParams } from "#/features/savers/types";
import type {
	CashFlow,
	CreateTransactionInput,
	FinancialFilters,
	FinancialSummary,
	Transaction,
	UpdateTransactionInput,
} from "./types";

// Mock data
const mockTransactions: Transaction[] = [
	{
		id: "1",
		date: "2025-01-18",
		description: "Colecta diária - Mercado Central, Maputo",
		amount: 45000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "2",
		date: "2025-01-18",
		description: "Empréstimo - João Machava, Matola",
		amount: -25000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "3",
		date: "2025-01-17",
		description: "Colecta diária - Mercado dos Vegetais, Maputo",
		amount: 38500,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "4",
		date: "2025-01-17",
		description: "Pagamento de taxa de serviço - Luz",
		amount: -3200,
		type: "expense",
		category: "Taxa",
		status: "completed",
	},
	{
		id: "5",
		date: "2025-01-16",
		description: "Colecta diária - Bairro Central, Boane",
		amount: 32000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "6",
		date: "2025-01-16",
		description: "Empréstimo - Maria Santos, Machamba",
		amount: -18000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "7",
		date: "2025-01-15",
		description: "Depósito - Ana Mabote",
		amount: 4500,
		type: "deposit",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "8",
		date: "2025-01-15",
		description: "Colecta diária - Mercado de Xai-Xai",
		amount: 28500,
		type: "income",
		category: "Colecta",
		status: "pending",
	},
	{
		id: "9",
		date: "2025-01-14",
		description: "Empréstimo - Alberto Chongo, Beira",
		amount: -30000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "10",
		date: "2025-01-14",
		description: "Pagamento de taxa - Transporte",
		amount: -1500,
		type: "expense",
		category: "Taxa",
		status: "completed",
	},
	{
		id: "11",
		date: "2025-01-13",
		description: "Colecta diária - Bairro Munhuana, Maputo",
		amount: 41000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "12",
		date: "2025-01-12",
		description: "Empréstimo - Sofia Macamo, Nampula",
		amount: -22000,
		type: "loan",
		category: "Empréstimo",
		status: "pending",
	},
	{
		id: "13",
		date: "2025-01-11",
		description: "Depósito - Carlos Sitoe",
		amount: 2800,
		type: "deposit",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "14",
		date: "2025-01-10",
		description: "Colecta diária - Mercado Mavalane",
		amount: 36500,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "15",
		date: "2025-01-09",
		description: "Pagamento de taxa - Manutenção",
		amount: -4200,
		type: "expense",
		category: "Taxa",
		status: "completed",
	},
	{
		id: "16",
		date: "2025-01-08",
		description: "Empréstimo - Pedro Mondlane, Quelimane",
		amount: -15000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "17",
		date: "2025-01-07",
		description: "Colecta diária - Bairro Hulene",
		amount: 39000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "18",
		date: "2025-01-06",
		description: "Depósito - Isabel Nhambiu",
		amount: 3200,
		type: "deposit",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "19",
		date: "2025-01-05",
		description: "Colecta diária - Mercado de Tete",
		amount: 34000,
		type: "income",
		category: "Colecta",
		status: "pending",
	},
	{
		id: "20",
		date: "2025-01-04",
		description: "Empréstimo - Luisa Munguambe, Chimoio",
		amount: -28000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "21",
		date: "2025-01-03",
		description: "Pagamento de taxa - Comunicação",
		amount: -1800,
		type: "expense",
		category: "Taxa",
		status: "completed",
	},
	{
		id: "22",
		date: "2025-01-02",
		description: "Colecta diária - Bairro Malhangalene",
		amount: 47500,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "23",
		date: "2024-12-30",
		description: "Empréstimo - Armando Tembe, Inhambane",
		amount: -20000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "24",
		date: "2024-12-29",
		description: "Depósito - Fatima Macamo",
		amount: 1500,
		type: "deposit",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "25",
		date: "2024-12-28",
		description: "Colecta diária - Mercado da Baixa",
		amount: 42000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
];

const mockCashFlow: CashFlow[] = [
	{ month: "Set", income: 485000, expense: 55000, balance: 430000 },
	{ month: "Out", income: 520000, expense: 62000, balance: 458000 },
	{ month: "Nov", income: 495000, expense: 58000, balance: 437000 },
	{ month: "Dez", income: 580000, expense: 75000, balance: 505000 },
	{ month: "Jan", income: 545000, expense: 68000, balance: 477000 },
];

// Financial API endpoints (mock)
export const financialApi = {
	// Get all transactions with pagination
	getAll: (params?: PaginationParams & FinancialFilters) => {
		let filtered = [...mockTransactions];

		if (params?.type && params.type !== "all") {
			filtered = filtered.filter((t) => t.type === params.type);
		}
		if (params?.category) {
			filtered = filtered.filter((t) => t.category === params.category);
		}

		const page = params?.page || 1;
		const pageSize = params?.pageSize || 10;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		return Promise.resolve({
			data: filtered.slice(start, end),
			total: filtered.length,
			page,
			pageSize,
			totalPages: Math.ceil(filtered.length / pageSize),
		});
	},

	// Get transaction by ID
	getById: (id: string) => {
		const transaction = mockTransactions.find((t) => t.id === id);
		return Promise.resolve(transaction);
	},

	// Create new transaction
	create: (data: CreateTransactionInput) => {
		const newTransaction: Transaction = {
			id: String(mockTransactions.length + 1),
			...data,
			status: "pending",
		};
		mockTransactions.push(newTransaction);
		return Promise.resolve(newTransaction);
	},

	// Update transaction
	update: (id: string, data: UpdateTransactionInput) => {
		const index = mockTransactions.findIndex((t) => t.id === id);
		if (index !== -1) {
			mockTransactions[index] = { ...mockTransactions[index], ...data };
			return Promise.resolve(mockTransactions[index]);
		}
		return Promise.reject(new Error("Transaction not found"));
	},

	// Delete transaction
	delete: (id: string) => {
		const index = mockTransactions.findIndex((t) => t.id === id);
		if (index !== -1) {
			mockTransactions.splice(index, 1);
			return Promise.resolve(true);
		}
		return Promise.reject(new Error("Transaction not found"));
	},

	// Get financial summary
	getSummary: () => {
		const summary: FinancialSummary = {
			totalIncome: mockTransactions
				.filter((t) => t.type === "income")
				.reduce((sum, t) => sum + t.amount, 0),
			totalExpense: mockTransactions
				.filter((t) => t.type === "expense")
				.reduce((sum, t) => sum + Math.abs(t.amount), 0),
			totalLoans: mockTransactions
				.filter((t) => t.type === "loan")
				.reduce((sum, t) => sum + Math.abs(t.amount), 0),
			totalDeposits: mockTransactions
				.filter((t) => t.type === "deposit")
				.reduce((sum, t) => sum + t.amount, 0),
			balance: 0, // Calculated from income - expense
		};
		summary.balance = summary.totalIncome - summary.totalExpense;
		return Promise.resolve(summary);
	},

	// Get cash flow data
	getCashFlow: () => {
		return Promise.resolve(mockCashFlow);
	},

	// Search transactions
	search: (query: string, params?: PaginationParams) => {
		const filtered = mockTransactions.filter(
			(t) =>
				t.description.toLowerCase().includes(query.toLowerCase()) ||
				t.category.toLowerCase().includes(query.toLowerCase()),
		);
		const page = params?.page || 1;
		const pageSize = params?.pageSize || 10;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		return Promise.resolve({
			data: filtered.slice(start, end),
			total: filtered.length,
			page,
			pageSize,
			totalPages: Math.ceil(filtered.length / pageSize),
		});
	},
};
