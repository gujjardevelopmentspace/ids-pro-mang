export interface Tenant {
  id: string;
  name: string;
  domain: string;
  settings: TenantSettings;
  subscription: SubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  currency: string;
  language: string;
  notifications: NotificationSettings;
  features: FeatureFlags;
}

export interface FeatureFlags {
  enableAdvancedAnalytics: boolean;
  enableRealTimeCollaboration: boolean;
  enableAdvancedReporting: boolean;
  enableApiAccess: boolean;
  enableCustomBranding: boolean;
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
  maxProjects: number;
  maxStorage: number; // in GB
  features: string[];
  expiresAt?: Date;
}

export interface TenantContextType {
  currentTenant: Tenant | null;
  switchTenant: (tenantId: string) => Promise<void>;
  createTenant: (tenantData: Partial<Tenant>) => Promise<Tenant>;
  updateTenant: (updates: Partial<Tenant>) => Promise<void>;
  isLoading: boolean;
}
