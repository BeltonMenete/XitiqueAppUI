import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collectorsApi } from "./api";
import type {
	CreateCollectorInput,
	PaginationParams,
	UpdateCollectorInput,
} from "./types";

// Query keys
export const COLLECTOR_KEYS = {
	all: ["collectors"] as const,
	lists: () => [...COLLECTOR_KEYS.all, "list"] as const,
	list: (params?: PaginationParams) =>
		[...COLLECTOR_KEYS.lists(), params] as const,
	details: () => [...COLLECTOR_KEYS.all, "detail"] as const,
	detail: (id: string) => [...COLLECTOR_KEYS.details(), id] as const,
	clients: (id: string) => [...COLLECTOR_KEYS.detail(id), "clients"] as const,
	records: (id: string) => [...COLLECTOR_KEYS.detail(id), "records"] as const,
};

// Queries
export function useCollectors(params?: PaginationParams) {
	return useQuery({
		queryKey: COLLECTOR_KEYS.list(params),
		queryFn: () => collectorsApi.getAll(params),
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useCollector(id: string) {
	return useQuery({
		queryKey: COLLECTOR_KEYS.detail(id),
		queryFn: () => collectorsApi.getById(id),
		enabled: !!id,
		staleTime: 2 * 60 * 1000, // 2 minutos
	});
}

export function useCollectorClients(id: string) {
	return useQuery({
		queryKey: COLLECTOR_KEYS.clients(id),
		queryFn: () => collectorsApi.getClients(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useCollectionRecords(id: string) {
	return useQuery({
		queryKey: COLLECTOR_KEYS.records(id),
		queryFn: () => collectorsApi.getCollectionRecords(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

// Mutations
export function useCreateCollector() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCollectorInput) => collectorsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: COLLECTOR_KEYS.lists() });
		},
	});
}

export function useUpdateCollector(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateCollectorInput) => collectorsApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: COLLECTOR_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: COLLECTOR_KEYS.lists() });
		},
	});
}

export function useDeleteCollector() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => collectorsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: COLLECTOR_KEYS.lists() });
		},
	});
}
