import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationParams, Saver } from "#/features/savers/types";
import type {
	CreateSaverInput,
	PatchSaverInput,
	RolloverToNextMonthInput,
	TerminateContractInput,
	UpdateSaverInput,
} from "#/features/savers/validation";
import { saversApi } from "./api";
import type { SaverDeposit, SaverHistory, SaverLoan } from "./types";

// Mock data functions for when API is not available
function getMockSaver(id: string): Saver {
	return {
		id: id,
		cardNumber: Number(id) || 1,
		name: "Maria Silva",
		contact: 841234567,
		dailyAmount: 100,
		totalSaved: 1800,
		currentDebt: 500,
		daysInCycle: 18,
		status: "active",
		registrationDate: "2023-01-15",
		alphanumericId: "A01",
		organizationId: "1",
		isActive: true,
		organization: { id: "1", name: "Mercado Central, Maputo" },
		paymentDays: generatePaymentDays(18),
	};
}

function getMockDeposits(id: string): SaverDeposit[] {
	return Array.from({ length: 18 }, (_, i) => ({
		id: `dep-${i + 1}`,
		saverId: id,
		date: `2023-10-${String(i + 1).padStart(2, '0')}`,
		amount: 100,
		status: i < 15 ? "paid" : i < 17 ? "partial" : "unpaid",
		day: i + 1,
		createdAt: "2023-10-18T14:30:00Z",
		updatedAt: "2023-10-18T14:30:00Z",
	}));
}

function getMockLoans(id: string): SaverLoan[] {
	return [
		{
			id: "loan-001",
			saverId: id,
			amount: 500,
			interest: 50,
			daysInDebt: 5,
			totalDays: 30,
			status: "active",
			requestDate: "2023-10-15",
			dueDate: "2023-11-14",
		},
	];
}

function getMockHistory(id: string): SaverHistory[] {
	return [
		{
			id: "hist-001",
			saverId: id,
			action: "Depósito registado",
			timestamp: "2023-10-18 14:30",
			details: "100 MZN",
			performedBy: "Admin",
		},
		{
			id: "hist-002",
			saverId: id,
			action: "Empréstimo solicitado",
			timestamp: "2023-10-15 10:00",
			details: "500 MZN",
			performedBy: "Admin",
		},
	];
}

// Utility functions for alphanumeric IDs
export function generateAlphanumericId(index: number): string {
	const letter = String.fromCharCode(65 + Math.floor(index / 99)); // A, B, C, etc.
	const number = (index % 99) + 1;
	return `${letter}${number.toString().padStart(2, "0")}`;
}

export function generatePaymentDays(
	daysInCycle: number,
): Array<{ day: number; paid: boolean }> {
	const days = [];
	for (let i = 1; i <= 30; i++) {
		days.push({
			day: i,
			paid: i <= daysInCycle && Math.random() > 0.3, // Mock logic: some days paid, some not
		});
	}
	return days;
}

export function enrichSaversWithAlphanumericIds(savers: Saver[]): Saver[] {
	return savers.map((saver, index) => ({
		...saver,
		alphanumericId: saver.alphanumericId || generateAlphanumericId(index),
		paymentDays: saver.paymentDays || generatePaymentDays(saver.daysInCycle),
	}));
}

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
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useSaver(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.detail(id),
		queryFn: async () => {
			try {
				return await saversApi.getById(id);
			} catch (error) {
				// Return mock data if API fails
				return getMockSaver(id);
			}
		},
		enabled: !!id,
		staleTime: 2 * 60 * 1000, // 2 minutos
	});
}

export function useSaverDeposits(id: string, month?: number, year?: number) {
	const params = month && year ? { month, year } : {};
	return useQuery({
		queryKey: SAVER_KEYS.deposits(id),
		queryFn: async () => {
			try {
				return await saversApi.getDeposits(id, params);
			} catch (error) {
				// Return mock data if API fails
				return getMockDeposits(id);
			}
		},
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverLoans(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.loans(id),
		queryFn: async () => {
			try {
				return await saversApi.getLoans(id);
			} catch (error) {
				// Return mock data if API fails
				return getMockLoans(id);
			}
		},
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverHistory(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.history(id),
		queryFn: async () => {
			try {
				return await saversApi.getHistory(id);
			} catch (error) {
				// Return mock data if API fails
				return getMockHistory(id);
			}
		},
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutos
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
