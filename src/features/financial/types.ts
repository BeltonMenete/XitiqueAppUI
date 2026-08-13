export interface Transaction {
	id: string;
	date: string;
	description: string;
	amount: number;
	type: "income" | "expense" | "loan" | "deposit" | "withdrawal";
	category: string;
	status: "completed" | "pending" | "failed";
}

export interface FinancialSummary {
	totalIncome: number;
	totalExpense: number;
	balance: number;
	totalLoans: number;
	totalDeposits: number;
}

export interface CashFlow {
	month: string;
	income: number;
	expense: number;
	balance: number;
}

export interface FinancialFilters {
	startDate?: string;
	endDate?: string;
	type?: Transaction["type"] | "all";
	category?: string;
}

export interface CreateTransactionInput {
	date: string;
	description: string;
	amount: number;
	type: Transaction["type"];
	category: string;
}

export interface UpdateTransactionInput {
	description?: string;
	amount?: number;
	status?: Transaction["status"];
	category?: string;
}
