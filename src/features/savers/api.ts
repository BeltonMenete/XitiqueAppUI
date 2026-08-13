import { api } from "#/lib/api-client";
import type {
	PaginationParams,
	Saver,
	SaverDeposit,
	SaverHistory,
	SaverLoan,
} from "./types";
import type {
	CreateSaverInput,
	PatchSaverInput,
	UpdateSaverInput,
} from "./validation";

// Saver API endpoints
export const saversApi = {
	// Get all savers with pagination
	getAll: (params: PaginationParams) =>
		api.getPaginated<Saver>(
			"/api/savers",
			params as PaginationParams & Record<string, unknown>,
		),

	// Get saver by ID
	getById: (id: string) => api.get<Saver>(`/api/savers/${id}`),

	// Create new saver
	create: (data: CreateSaverInput) => api.post<Saver>("/api/savers", data),

	// Update saver
	update: (id: string, data: UpdateSaverInput) =>
		api.put<Saver>(`/api/savers/${id}`, data),

	// Patch saver (partial update)
	patch: (id: string, data: PatchSaverInput) =>
		api.patch<Saver>(`/api/savers/${id}`, data),

	// Delete saver
	delete: (id: string) => api.delete(`/api/savers/${id}`),

	// Get saver deposits
	getDeposits: (id: string, params?: { month?: number; year?: number }) =>
		api.get<SaverDeposit[]>(`/api/savers/${id}/deposits`, params),

	// Get saver loans
	getLoans: (id: string) => api.get<SaverLoan[]>(`/api/savers/${id}/loans`),

	// Get saver history
	getHistory: (id: string) =>
		api.get<SaverHistory[]>(`/api/savers/${id}/history`),

	// Rollover to next month
	rollover: (id: string, data: { month: number; year: number }) =>
		api.post(`/api/savers/${id}/rollover`, data),

	// Terminate contract
	terminate: (
		id: string,
		data: { month: number; year: number; terminationReason?: string },
	) => api.post(`/api/savers/${id}/terminate`, data),

	// Search savers
	search: (query: string, params?: PaginationParams) =>
		api.getPaginated<Saver>("/api/savers/search", { ...params, search: query }),
};
