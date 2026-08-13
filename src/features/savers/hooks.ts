import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationParams } from "#/features/savers/types";
import type {
	CreateSaverInput,
	PatchSaverInput,
	RolloverToNextMonthInput,
	TerminateContractInput,
	UpdateSaverInput,
} from "#/features/savers/validation";
import { saversApi } from "./api";

// Query keys
export const SAVER_KEYS = {
	all: ["savers"] as const,
	lists: () => [...SAVER_KEYS.all, "list"] as const,
	list: (params: PaginationParams) => [...SAVER_KEYS.lists(), params] as const,
	details: () => [...SAVER_KEYS.all, "detail"] as const,
	detail: (id: string) => [...SAVER_KEYS.details(), id] as const,
	deposits: (id: string) => [...SAVER_KEYS.detail(id), "deposits"] as const,
	loans: (id: string) => [...SAVER_KEYS.detail(id), "loans"] as const,
	history: (id: string) => [...SAVER_KEYS.detail(id), "history"] as const,
};

// Queries
export function useSavers(
	params: PaginationParams = { page: 1, pageSize: 20 },
) {
	return useQuery({
		queryKey: SAVER_KEYS.list(params),
		queryFn: () => saversApi.getAll(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useSaver(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.detail(id),
		queryFn: () => saversApi.getById(id),
		enabled: !!id,
		staleTime: 2 * 60 * 1000, // 2 minutes
	});
}

export function useSaverDeposits(id: string, month?: number, year?: number) {
	const params = month && year ? { month, year } : {};
	return useQuery({
		queryKey: SAVER_KEYS.deposits(id),
		queryFn: () => saversApi.getDeposits(id, params),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverLoans(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.loans(id),
		queryFn: () => saversApi.getLoans(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverHistory(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.history(id),
		queryFn: () => saversApi.getHistory(id),
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Mutations
export function useCreateSaver() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateSaverInput) => saversApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useUpdateSaver(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateSaverInput) => saversApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function usePatchSaver(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: PatchSaverInput) => saversApi.patch(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useDeleteSaver() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => saversApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useRolloverToNextMonth(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: RolloverToNextMonthInput) =>
			saversApi.rollover(id, {
				month: data.Month,
				year: data.Year,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.deposits(id) });
		},
	});
}

export function useTerminateContract(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TerminateContractInput) =>
			saversApi.terminate(id, {
				month: data.Month,
				year: data.Year,
				terminationReason: data.TerminationReason,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}
