import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tenant, TenantContextType } from '../types/tenant';

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize tenant from localStorage
  useEffect(() => {
    const initializeTenant = async () => {
      try {
        const storedTenant = localStorage.getItem('currentTenant');
        if (storedTenant) {
          const tenantData = JSON.parse(storedTenant);
          setCurrentTenant(tenantData);
        } else {
          // If no tenant is stored, create a default one
          const defaultTenant = {
            id: 'org-1',
            name: 'INVENTOR Design Studio',
            domain: 'inventerdesign.com',
            settings: {
              theme: 'system' as const,
              timezone: 'UTC',
              currency: 'USD',
              language: 'en',
              notifications: {
                email: true,
                push: true,
                sms: false,
                inApp: true
              },
              features: {
                enableAdvancedAnalytics: true,
                enableRealTimeCollaboration: true,
                enableAdvancedReporting: true,
                enableApiAccess: true,
                enableCustomBranding: false
              }
            },
            subscription: {
              type: 'professional' as const,
              maxUsers: 50,
              maxProjects: 100,
              maxStorage: 1000,
              features: ['projects', 'inventory', 'reports', 'collaboration', 'api'],
              expiresAt: new Date('2025-12-31')
            },
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date()
          };
          setCurrentTenant(defaultTenant);
          localStorage.setItem('currentTenant', JSON.stringify(defaultTenant));
        }
      } catch (error) {
        console.error('Error initializing tenant:', error);
        localStorage.removeItem('currentTenant');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTenant();
  }, []);

  const switchTenant = async (tenantId: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call to get tenant data
      const tenant = await getTenantById(tenantId);
      setCurrentTenant(tenant);
      localStorage.setItem('currentTenant', JSON.stringify(tenant));
    } catch (error) {
      console.error('Error switching tenant:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createTenant = async (tenantData: Partial<Tenant>): Promise<Tenant> => {
    setIsLoading(true);
    
    try {
      // Simulate API call to create tenant
      const newTenant = await createTenantAPI(tenantData);
      setCurrentTenant(newTenant);
      localStorage.setItem('currentTenant', JSON.stringify(newTenant));
      return newTenant;
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTenant = async (updates: Partial<Tenant>): Promise<void> => {
    if (!currentTenant) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to update tenant
      const updatedTenant = { ...currentTenant, ...updates };
      setCurrentTenant(updatedTenant);
      localStorage.setItem('currentTenant', JSON.stringify(updatedTenant));
    } catch (error) {
      console.error('Error updating tenant:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: TenantContextType = {
    currentTenant,
    switchTenant,
    createTenant,
    updateTenant,
    isLoading
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

// Mock API functions - replace with actual API calls
const getTenantById = async (tenantId: string): Promise<Tenant> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock tenant data
  const mockTenants: Record<string, Tenant> = {
    'org-1': {
      id: 'org-1',
      name: 'INVENTOR Design Studio',
      domain: 'inventerdesign.com',
      settings: {
        theme: 'system',
        timezone: 'UTC',
        currency: 'USD',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
          inApp: true
        },
        features: {
          enableAdvancedAnalytics: true,
          enableRealTimeCollaboration: true,
          enableAdvancedReporting: true,
          enableApiAccess: true,
          enableCustomBranding: false
        }
      },
      subscription: {
        type: 'professional',
        maxUsers: 50,
        maxProjects: 100,
        maxStorage: 1000,
        features: ['projects', 'inventory', 'reports', 'collaboration', 'api'],
        expiresAt: new Date('2025-12-31')
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    }
  };

  const tenant = mockTenants[tenantId];
  if (!tenant) {
    throw new Error('Tenant not found');
  }

  return tenant;
};

const createTenantAPI = async (tenantData: Partial<Tenant>): Promise<Tenant> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newTenant: Tenant = {
    id: `tenant-${Date.now()}`,
    name: tenantData.name || 'New Organization',
    domain: tenantData.domain || 'example.com',
    settings: {
      theme: 'system',
      timezone: 'UTC',
      currency: 'USD',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false,
        inApp: true
      },
      features: {
        enableAdvancedAnalytics: false,
        enableRealTimeCollaboration: false,
        enableAdvancedReporting: false,
        enableApiAccess: false,
        enableCustomBranding: false
      }
    },
    subscription: {
      type: 'free',
      maxUsers: 5,
      maxProjects: 10,
      maxStorage: 1,
      features: ['projects', 'inventory']
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    ...tenantData
  };

  return newTenant;
};
