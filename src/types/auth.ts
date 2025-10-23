export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  organizationId: string;
  department?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  settings: OrganizationSettings;
  subscription: SubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  currency: string;
  language: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
}

export interface SubscriptionPlan {
  type: 'free' | 'basic' | 'professional' | 'enterprise';
  maxUsers: number;
  features: string[];
  expiresAt?: Date;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  PROJECT_MANAGER = 'project_manager',
  ENGINEER = 'engineer',
  CLIENT = 'client',
  VIEWER = 'viewer'
}

export enum Permission {
  // User Management
  MANAGE_USERS = 'manage_users',
  VIEW_USERS = 'view_users',
  
  // Project Management
  CREATE_PROJECTS = 'create_projects',
  EDIT_PROJECTS = 'edit_projects',
  DELETE_PROJECTS = 'delete_projects',
  VIEW_PROJECTS = 'view_projects',
  
  // Financial
  VIEW_FINANCIALS = 'view_financials',
  MANAGE_BUDGETS = 'manage_budgets',
  APPROVE_PAYMENTS = 'approve_payments',
  
  // Materials & Inventory
  MANAGE_INVENTORY = 'manage_inventory',
  VIEW_INVENTORY = 'view_inventory',
  
  // Approvals
  APPROVE_WORK_ORDERS = 'approve_work_orders',
  APPROVE_PURCHASES = 'approve_purchases',
  APPROVE_BIDS = 'approve_bids',
  
  // Reports
  VIEW_REPORTS = 'view_reports',
  EXPORT_DATA = 'export_data',
  
  // Settings
  MANAGE_SETTINGS = 'manage_settings',
  VIEW_SETTINGS = 'view_settings'
}

export interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  organizationName?: string;
  organizationDomain?: string;
  role?: UserRole;
}
