// Real API Service with actual backend integration
import { User, UserRole, Permission } from '../types/auth';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000;

// Request interceptor for authentication
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Mock API responses for development and production (when no backend is available)
const isDevelopment = import.meta.env.DEV;
const hasApiUrl = import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== '';
const useMockAPI = isDevelopment || !hasApiUrl; // Use mock if no API URL is set or in development

const getMockData = (endpoint: string, options: RequestInit = {}) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/auth/login':
          resolve({
            user: {
              id: '1',
              email: 'demo@inventor.com',
              name: 'Demo User',
              role: 'ADMIN',
              avatar: '/avatars/default.jpg',
              permissions: ['VIEW_DASHBOARD', 'MANAGE_USERS', 'VIEW_PROJECTS'],
              isActive: true,
              lastLogin: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            token: 'mock-token-' + Date.now()
          });
          break;
        case '/auth/logout':
          resolve({ message: 'Logged out successfully' });
          break;
        case '/analytics/dashboard':
          resolve({
            totalRevenue: 2500000,
            monthlyRevenue: 1800000,
            totalProjects: 8,
            activeProjects: 5,
            completedProjects: 3,
            totalUsers: 25,
            activeUsers: 20,
            newUsersThisMonth: 5
          });
          break;
        case '/projects':
          resolve({
            projects: [
              {
                id: '1',
                name: 'Downtown Office Complex',
                status: 'active',
                progress: 65,
                startDate: '2024-01-15',
                endDate: '2024-12-31',
                budget: 2500000,
                teamSize: 25
              },
              {
                id: '2',
                name: 'Highway Expansion',
                status: 'active',
                progress: 45,
                startDate: '2024-02-20',
                endDate: '2025-06-30',
                budget: 5200000,
                teamSize: 18
              }
            ],
            total: 8
          });
          break;
        case '/users':
          resolve({
            users: [
              {
                id: '1',
                name: 'John Doe',
                email: 'john@inventor.com',
                role: 'ADMIN',
                status: 'active'
              },
              {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@inventor.com',
                role: 'USER',
                status: 'active'
              }
            ],
            total: 25
          });
          break;
        default:
          resolve({ message: 'Mock response for ' + endpoint });
      }
    }, 300); // Reduced delay for better UX
  });
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  // Use mock data in development mode or when no API URL is configured
  if (useMockAPI) {
    console.log('Using mock API for:', endpoint);
    return getMockData(endpoint, options) as Promise<T>;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    organizationId?: string;
  }) => {
    return apiRequest<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  refreshToken: async () => {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },

  forgotPassword: async (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  verifyEmail: async (token: string) => {
    return apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// User Management API
export const userApi = {
  getUsers: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    return apiRequest<{
      users: User[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/users?${params}`);
  },

  getUser: async (id: string) => {
    return apiRequest<User>(`/users/${id}`);
  },

  createUser: async (userData: Partial<User>) => {
    return apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    return apiRequest<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (id: string) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  updateUserRole: async (id: string, role: UserRole) => {
    return apiRequest<User>(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  updateUserPermissions: async (id: string, permissions: Permission[]) => {
    return apiRequest<User>(`/users/${id}/permissions`, {
      method: 'PATCH',
      body: JSON.stringify({ permissions }),
    });
  },
};

// Organization Management API
export const organizationApi = {
  getOrganizations: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    return apiRequest<{
      organizations: any[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/organizations?${params}`);
  },

  getOrganization: async (id: string) => {
    return apiRequest(`/organizations/${id}`);
  },

  createOrganization: async (orgData: any) => {
    return apiRequest('/organizations', {
      method: 'POST',
      body: JSON.stringify(orgData),
    });
  },

  updateOrganization: async (id: string, orgData: any) => {
    return apiRequest(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orgData),
    });
  },

  deleteOrganization: async (id: string) => {
    return apiRequest(`/organizations/${id}`, {
      method: 'DELETE',
    });
  },

  getOrganizationUsers: async (id: string) => {
    return apiRequest<User[]>(`/organizations/${id}/users`);
  },

  addUserToOrganization: async (orgId: string, userId: string, role: string) => {
    return apiRequest(`/organizations/${orgId}/users`, {
      method: 'POST',
      body: JSON.stringify({ userId, role }),
    });
  },

  removeUserFromOrganization: async (orgId: string, userId: string) => {
    return apiRequest(`/organizations/${orgId}/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Project Management API
export const projectApi = {
  getProjects: async (page = 1, limit = 10, search = '', status = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
    });
    return apiRequest<{
      projects: any[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/projects?${params}`);
  },

  getProject: async (id: string) => {
    return apiRequest(`/projects/${id}`);
  },

  createProject: async (projectData: any) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  updateProject: async (id: string, projectData: any) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (id: string) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  getProjectMembers: async (id: string) => {
    return apiRequest<User[]>(`/projects/${id}/members`);
  },

  addProjectMember: async (projectId: string, userId: string, role: string) => {
    return apiRequest(`/projects/${projectId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role }),
    });
  },

  removeProjectMember: async (projectId: string, userId: string) => {
    return apiRequest(`/projects/${projectId}/members/${userId}`, {
      method: 'DELETE',
    });
  },

  updateProjectStatus: async (id: string, status: string) => {
    return apiRequest(`/projects/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  getProjectProgress: async (id: string) => {
    return apiRequest(`/projects/${id}/progress`);
  },
};

// File Management API
export const fileApi = {
  uploadFile: async (file: File, projectId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) {
      formData.append('projectId', projectId);
    }

    return apiRequest<{ fileId: string; url: string; name: string; size: number }>('/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeaders().Authorization,
      },
      body: formData,
    });
  },

  getFiles: async (projectId?: string) => {
    const params = projectId ? `?projectId=${projectId}` : '';
    return apiRequest<any[]>(`/files${params}`);
  },

  deleteFile: async (fileId: string) => {
    return apiRequest(`/files/${fileId}`, {
      method: 'DELETE',
    });
  },

  downloadFile: async (fileId: string) => {
    const response = await fetch(`${API_BASE_URL}/files/${fileId}/download`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to download file');
    }
    
    return response.blob();
  },
};

// Notification API
export const notificationApi = {
  getNotifications: async (page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return apiRequest<{
      notifications: any[];
      total: number;
      unreadCount: number;
    }>(`/notifications?${params}`);
  },

  markAsRead: async (id: string) => {
    return apiRequest(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiRequest('/notifications/read-all', {
      method: 'PATCH',
    });
  },

  deleteNotification: async (id: string) => {
    return apiRequest(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },

  createNotification: async (notificationData: any) => {
    return apiRequest('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  },
};

// Real-time Collaboration API
export const collaborationApi = {
  joinSession: async (sessionId: string) => {
    return apiRequest(`/collaboration/sessions/${sessionId}/join`, {
      method: 'POST',
    });
  },

  leaveSession: async (sessionId: string) => {
    return apiRequest(`/collaboration/sessions/${sessionId}/leave`, {
      method: 'POST',
    });
  },

  getActiveSessions: async () => {
    return apiRequest<any[]>('/collaboration/sessions/active');
  },

  createSession: async (sessionData: any) => {
    return apiRequest('/collaboration/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },

  sendMessage: async (sessionId: string, message: string) => {
    return apiRequest(`/collaboration/sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  getMessages: async (sessionId: string, page = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    return apiRequest<any[]>(`/collaboration/sessions/${sessionId}/messages?${params}`);
  },
};

// Dashboard Analytics API
export const analyticsApi = {
  getDashboardStats: async () => {
    return apiRequest<{
      totalUsers: number;
      activeUsers: number;
      totalProjects: number;
      completedProjects: number;
      totalRevenue: number;
      monthlyRevenue: number;
    }>('/analytics/dashboard');
  },

  getProjectAnalytics: async (projectId: string) => {
    return apiRequest(`/analytics/projects/${projectId}`);
  },

  getUserAnalytics: async (userId: string) => {
    return apiRequest(`/analytics/users/${userId}`);
  },

  getOrganizationAnalytics: async (orgId: string) => {
    return apiRequest(`/analytics/organizations/${orgId}`);
  },

  getPerformanceMetrics: async (timeRange = '30d') => {
    return apiRequest(`/analytics/performance?range=${timeRange}`);
  },
};

// Audit Logging API
export const auditApi = {
  getAuditLogs: async (page = 1, limit = 50, filters: any = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return apiRequest<{
      logs: any[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/audit/logs?${params}`);
  },

  createAuditLog: async (logData: any) => {
    return apiRequest('/audit/logs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  },
};

// WebSocket connection for real-time updates
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private listeners: Map<string, Function[]> = new Map();
  private isDevelopment = import.meta.env.DEV;
  private hasWsUrl = import.meta.env.VITE_WS_URL && import.meta.env.VITE_WS_URL !== '';
  private useMockWebSocket = isDevelopment || !hasWsUrl; // Use mock if no WS URL is set or in development
  private mockInterval: NodeJS.Timeout | null = null;

  connect() {
    // Use mock WebSocket in development mode or when no WebSocket URL is configured
    if (this.useMockWebSocket) {
      console.log('Using mock WebSocket');
      this.startMockConnection();
      return;
    }

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    const token = localStorage.getItem('authToken');
    
    this.ws = new WebSocket(`${wsUrl}?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private startMockConnection() {
    // Simulate connection
    setTimeout(() => {
      console.log('Mock WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected', {});
    }, 100);

    // Simulate periodic real-time updates
    this.mockInterval = setInterval(() => {
      // Simulate user activity
      this.emit('user_activity', {
        userId: 'mock-user',
        action: 'viewing',
        resource: 'collaboration',
        resourceId: 'session-1',
        timestamp: new Date().toISOString()
      });

      // Simulate system status
      this.emit('system_status', {
        status: 'online',
        services: {
          database: 'online',
          api: 'online',
          websocket: 'online',
          storage: 'online'
        },
        uptime: Date.now(),
        lastUpdate: new Date().toISOString()
      });
    }, 30000); // Every 30 seconds
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    // Clear mock interval in development
    if (this.isDevelopment && this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }

  private reconnect() {
    // Skip reconnection in development mode
    if (this.isDevelopment) {
      return;
    }
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectInterval);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  send(type: string, payload: any) {
    if (this.useMockWebSocket) {
      console.log('Mock WebSocket send:', { type, payload });
      return;
    }
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }
}

// Export WebSocket service instance
export const wsService = new WebSocketService();

// Error handling utility
export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  } else if (error.message.includes('403')) {
    // Forbidden - show permission error
    throw new Error('You do not have permission to perform this action');
  } else if (error.message.includes('404')) {
    // Not found
    throw new Error('Resource not found');
  } else if (error.message.includes('500')) {
    // Server error
    throw new Error('Server error - please try again later');
  } else {
    // Generic error
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export default {
  authApi,
  userApi,
  organizationApi,
  projectApi,
  fileApi,
  notificationApi,
  collaborationApi,
  analyticsApi,
  auditApi,
  wsService,
  handleApiError,
};
