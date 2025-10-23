// API Service for scalable backend communication
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

class ApiService {
  private config: ApiConfig;
  private authToken: string | null = null;

  constructor(config: ApiConfig) {
    this.config = config;
    this.authToken = localStorage.getItem('authToken');
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` })
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // User Management APIs
  async getUsers(page = 1, limit = 10, filters?: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.request(`/api/users?${queryParams}`);
  }

  async getUserById(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/users/${id}`);
  }

  async createUser(userData: any): Promise<ApiResponse<any>> {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE'
    });
  }

  // Project Management APIs
  async getProjects(page = 1, limit = 10, filters?: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.request(`/api/projects?${queryParams}`);
  }

  async getProjectById(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/projects/${id}`);
  }

  async createProject(projectData: any): Promise<ApiResponse<any>> {
    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }

  async updateProject(id: string, projectData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    });
  }

  // Inventory Management APIs
  async getInventory(page = 1, limit = 10, filters?: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.request(`/api/inventory?${queryParams}`);
  }

  async getInventoryItem(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/inventory/${id}`);
  }

  async updateInventoryItem(id: string, itemData: any): Promise<ApiResponse<any>> {
    return this.request(`/api/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    });
  }

  // Real-time APIs
  async getOnlineUsers(): Promise<ApiResponse<any[]>> {
    return this.request('/api/realtime/users');
  }

  async getRecentEvents(limit = 50): Promise<ApiResponse<any[]>> {
    return this.request(`/api/realtime/events?limit=${limit}`);
  }

  // Analytics APIs
  async getDashboardMetrics(): Promise<ApiResponse<any>> {
    return this.request('/api/analytics/dashboard');
  }

  async getProjectAnalytics(projectId?: string): Promise<ApiResponse<any>> {
    const endpoint = projectId 
      ? `/api/analytics/projects/${projectId}`
      : '/api/analytics/projects';
    return this.request(endpoint);
  }

  // File Upload APIs
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    });
  }

  // Export APIs
  async exportData(type: string, filters?: any): Promise<ApiResponse<Blob>> {
    const queryParams = new URLSearchParams({
      type,
      ...filters
    });
    
    return this.request(`/api/export?${queryParams}`);
  }
}

// Create singleton instance
export const apiService = new ApiService({
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retries: 3
});

// Export types for use in components
export type { ApiResponse, PaginatedResponse, ApiConfig };
