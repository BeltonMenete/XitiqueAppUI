import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	FinancialFilters,
	CreateTransactionInput,
	UpdateTransactionInput,
} from "./types";
import { financialApi } from "./api";

// Query keys
export const FINANCIAL_KEYS = {
	all: ["financial"] as const,
	lists: () => [...FINANCIAL_KEYS.all, "list"] as const,
	list: (params?: FinancialFilters) =>
		[...FINANCIAL_KEYS.lists(), params] as const,
	details: () => [...FINANCIAL_KEYS.all, "detail"] as const,
	detail: (id: string) => [...FINANCIAL_KEYS.details(), id] as const,
	summary: () => [...FINANCIAL_KEYS.all, "summary"] as const,
	cashFlow: () => [...FINANCIAL_KEYS.all, "cashflow"] as const,
};

// Queries
export function useTransactions(params?: FinancialFilters) {
	return useQuery({
		queryKey: FINANCIAL_KEYS.list(params),
		queryFn: () => financialApi.getAll(params),
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useTransaction(id: string) {
	return useQuery({
		queryKey: FINANCIAL_KEYS.detail(id),
		queryFn: () => financialApi.getById(id),
		enabled: !!id,
		staleTime: 2 * 60 * 1000, // 2 minutos
	});
}

export function useFinancialSummary() {
	return useQuery({
		queryKey: FINANCIAL_KEYS.summary(),
		queryFn: () => financialApi.getSummary(),
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useCashFlow() {
	return useQuery({
		queryKey: FINANCIAL_KEYS.cashFlow(),
		queryFn: () => financialApi.getCashFlow(),
		staleTime: 10 * 60 * 1000, // 10 minutos
	});
}

// Mutations
export function useCreateTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTransactionInput) => financialApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.lists() });
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.summary() });
		},
	});
}

export function useUpdateTransaction(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateTransactionInput) =>
			financialApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.lists() });
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.summary() });
		},
	});
}

export function useDeleteTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => financialApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.lists() });
			queryClient.invalidateQueries({ queryKey: FINANCIAL_KEYS.summary() });
		},
	});
}
