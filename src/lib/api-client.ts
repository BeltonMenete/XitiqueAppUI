// API Client - HTTP client with consistent error handling and retry logic
// This works alongside the existing feature modules for a hybrid approach

import {
	API_CONFIG,
	APIError,
	getAuthHeaders,
	getEndpointUrl,
	NetworkError,
	ValidationError,
} from "./api-config";

export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
	errors?: Record<string, string[]>;
}

export interface PaginationParams {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

class APIClient {
	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const url = getEndpointUrl(endpoint);
		const headers = {
			"Content-Type": "application/json",
			...getAuthHeaders(),
			...options.headers,
		};

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

		try {
			const response = await fetch(url, {
				...options,
				headers,
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				await this.handleError(response);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error) {
				if (error.name === "AbortError") {
					throw new APIError("Request timeout", 408, "TIMEOUT");
				}
				throw new NetworkError(error.message);
			}

			throw new NetworkError("Unknown error occurred");
		}
	}

	private async handleError(response: Response): Promise<never> {
		let errorMessage = "An error occurred";
		let errorCode: string | undefined;
		let field: string | undefined;

		try {
			const errorData = await response.json();
			errorMessage = errorData.message || errorMessage;
			errorCode = errorData.code;
			field = errorData.field;
		} catch {
			// If we can't parse the error, use default message
		}

		switch (response.status) {
			case 400:
				throw new ValidationError(errorMessage, field);
			case 401:
				throw new APIError("Unauthorized", 401, "UNAUTHORIZED");
			case 403:
				throw new APIError("Forbidden", 403, "FORBIDDEN");
			case 404:
				throw new APIError("Not found", 404, "NOT_FOUND");
			case 409:
				throw new APIError("Conflict", 409, "CONFLICT");
			case 422:
				throw new ValidationError(errorMessage, field);
			case 500:
				throw new APIError("Internal server error", 500, "INTERNAL_ERROR");
			default:
				throw new APIError(errorMessage, response.status, errorCode);
		}
	}

	async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
		const queryString = params
			? new URLSearchParams(params as Record<string, string>).toString()
			: "";
		const url = queryString ? `${endpoint}?${queryString}` : endpoint;
		return this.request<T>(url, { method: "GET" });
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async patch<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}

	// Paginated requests
	async getPaginated<T>(
		endpoint: string,
		params?: PaginationParams & Record<string, unknown>,
	): Promise<PaginatedResponse<T>> {
		return this.get<PaginatedResponse<T>>(endpoint, params);
	}
}

// Export singleton instance
export const apiClient = new APIClient();

// Convenience functions for common operations
export const api = {
	get: <T>(endpoint: string, params?: Record<string, unknown>) =>
		apiClient.get<T>(endpoint, params),
	post: <T>(endpoint: string, data?: unknown) =>
		apiClient.post<T>(endpoint, data),
	put: <T>(endpoint: string, data?: unknown) =>
		apiClient.put<T>(endpoint, data),
	patch: <T>(endpoint: string, data?: unknown) =>
		apiClient.patch<T>(endpoint, data),
	delete: <T>(endpoint: string) => apiClient.delete<T>(endpoint),
	getPaginated: <T>(
		endpoint: string,
		params?: PaginationParams & Record<string, unknown>,
	) => apiClient.getPaginated<T>(endpoint, params),
};
