// Centralized API Configuration
// This provides a single source of truth for API endpoints and configuration

export const API_CONFIG = {
  // Environment-based base URLs
  development: {
    baseUrl: 'https://localhost:7001/api/v1',
  },
  production: {
    baseUrl: 'http://localhost:7000/api/v1',
  },
  
  // Current environment (can be changed via environment variable)
  current: 'development' as 'development' | 'production',
  
  // Request timeout in milliseconds
  timeout: 30000,
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
  },
};

// Get current base URL
export function getBaseUrl(): string {
  return API_CONFIG[API_CONFIG.current].baseUrl;
}

// Get full URL for an endpoint
export function getEndpointUrl(endpoint: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${endpoint}`;
}

// API Endpoints (centralized for easy management)
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
  },
  
  // Organizations
  organizations: {
    list: '/organizations',
    byId: (id: string) => `/organizations/${id}`,
    byRegNum: (regNum: string) => `/organizations/by-reg-num/${regNum}`,
    create: '/organizations',
    update: (id: string) => `/organizations/${id}`,
    patch: (id: string) => `/organizations/${id}`,
    delete: (id: string) => `/organizations/${id}`,
    payoutReport: (id: string) => `/organizations/${id}/payout-report`,
  },
  
  // Savers
  savers: {
    list: (orgId: string) => `/organizations/${orgId}/savers`,
    byId: (id: string) => `/savers/${id}`,
    byCardNumber: (cardNumber: string) => `/savers/by-card-number/${cardNumber}`,
    create: '/savers',
    update: (id: string) => `/savers/${id}`,
    patch: (id: string) => `/savers/${id}`,
    delete: (id: string) => `/savers/${id}`,
    payout: (id: string) => `/savers/${id}/payout`,
    rollover: (id: string) => `/savers/${id}/rollover`,
    terminate: (id: string) => `/savers/${id}/terminate`,
    depositCount: (id: string) => `/savers/${id}/deposit-count`,
  },
  
  // Deposits
  deposits: {
    list: (saverId: string) => `/savers/${saverId}/deposits`,
    byMonth: (saverId: string, month: number, year: number) => 
      `/savers/${saverId}/deposits/${month}/${year}`,
    byId: (id: string) => `/deposits/${id}`,
    create: '/deposits',
    createByCardNumber: '/deposits/by-card-number',
    bulkCreate: '/deposits/bulk',
    update: (id: string) => `/deposits/${id}`,
    patch: (id: string) => `/deposits/${id}`,
    delete: (id: string) => `/deposits/${id}`,
    updateDeletionMotive: (id: string) => `/deposits/${id}/deletion-motive`,
    count: (saverId: string) => `/savers/${saverId}/deposits/count`,
  },
  
  // Collector Agents
  collectors: {
    list: (orgId: string) => `/organizations/${orgId}/collectors`,
    byId: (id: string) => `/collectors/${id}`,
    create: '/collectors',
    update: (id: string) => `/collectors/${id}`,
    patch: (id: string) => `/collectors/${id}`,
    delete: (id: string) => `/collectors/${id}`,
    updateRole: (id: string) => `/collectors/${id}/role`,
  },
  
  // Loans
  loans: {
    list: (orgId: string) => `/organizations/${orgId}/loans`,
    bySaver: (saverId: string) => `/savers/${saverId}/loans`,
    byId: (id: string) => `/loans/${id}`,
    create: '/loans',
    approve: (id: string) => `/loans/${id}/approve`,
    reject: (id: string) => `/loans/${id}/reject`,
    interestPayment: (id: string) => `/loans/${id}/interest-payment`,
    interestPayments: (id: string) => `/loans/${id}/interest-payments`,
  },
  
  // Subscriptions
  subscriptions: {
    plans: '/subscriptions/plans',
    planById: (id: string) => `/subscriptions/plans/${id}`,
    payments: (orgId: string) => `/organizations/${orgId}/subscriptions/payments`,
    assignPlan: '/subscriptions/assign',
    recordPayment: '/subscriptions/payments',
    startTrial: '/subscriptions/trial',
  },
  
  // Location
  location: {
    provinces: '/location/provinces',
    provinceById: (id: string) => `/location/provinces/${id}`,
    districtsByProvince: (provinceId: string) => `/location/provinces/${provinceId}/districts`,
    districtById: (id: string) => `/location/districts/${id}`,
  },
  
  // Admin (System Owner)
  admin: {
    organizations: '/admin/organizations',
    users: '/admin/users',
    auditLogs: '/admin/audit-logs',
    webhooks: '/admin/webhooks',
    statistics: '/admin/statistics',
  },
};

// Mock authentication headers for development
export const getAuthHeaders = () => {
  // In production, this would read from actual auth tokens
  return {
    'MockUserId': '550e8400-e29b-41d4-a716-446655440000',
    'MockAuthToken': 'mock-jwt-token-for-development',
  };
};

// Error types
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Network error type
export class NetworkError extends APIError {
  constructor(message: string = 'Network error occurred') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

// Validation error type
export class ValidationError extends APIError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}
