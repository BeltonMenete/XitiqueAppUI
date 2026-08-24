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
		date: "2024-05-15",
		description: "Colecta diária - Mercado Central",
		amount: 15000,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "2",
		date: "2024-05-15",
		description: "Empréstimo - João Machava",
		amount: -5000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
	{
		id: "3",
		date: "2024-05-14",
		description: "Colecta diária - Mercado dos Vegetais",
		amount: 12500,
		type: "income",
		category: "Colecta",
		status: "completed",
	},
	{
		id: "4",
		date: "2024-05-14",
		description: "Pagamento de taxa de serviço",
		amount: -500,
		type: "expense",
		category: "Taxa",
		status: "completed",
	},
	{
		id: "5",
		date: "2024-05-13",
		description: "Colecta diária - Bairro Central",
		amount: 10000,
		type: "income",
		category: "Colecta",
		status: "pending",
	},
	{
		id: "6",
		date: "2024-05-13",
		description: "Empréstimo - Maria Santos",
		amount: -3000,
		type: "loan",
		category: "Empréstimo",
		status: "completed",
	},
];

const mockCashFlow: CashFlow[] = [
	{ month: "Jan", income: 380000, expense: 45000, balance: 335000 },
	{ month: "Fev", income: 420000, expense: 52000, balance: 368000 },
	{ month: "Mar", income: 395000, expense: 48000, balance: 347000 },
	{ month: "Abr", income: 450000, expense: 55000, balance: 395000 },
	{ month: "Mai", income: 475000, expense: 60000, balance: 415000 },
	{ month: "Jun", income: 500000, expense: 65000, balance: 450000 },
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
