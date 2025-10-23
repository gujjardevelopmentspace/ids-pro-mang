import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Organization, AuthContextType, LoginCredentials, RegisterData, UserRole, Permission } from '../types/auth';
import { authApi, userApi, handleApiError } from '../services/realApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedOrg = localStorage.getItem('organization');
        const storedAuth = localStorage.getItem('isAuthenticated');

        if (storedUser && storedOrg && storedAuth === 'true') {
          const userData = JSON.parse(storedUser);
          const orgData = JSON.parse(storedOrg);
          
          setUser(userData);
          setOrganization(orgData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('organization');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Try real API first, but fallback to mock authentication
      try {
        const response = await authApi.login(email, password);
        
        // Store token
        localStorage.setItem('authToken', response.token);
        
        // Set user and organization data
        setUser(response.user);
        setOrganization(response.user.organization || null);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.user.organization) {
          localStorage.setItem('organization', JSON.stringify(response.user.organization));
        }
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirect to dashboard after successful login
        window.location.href = '/';
      } catch (apiError) {
        console.log('API not available, using mock authentication:', apiError);
        
        // Mock authentication for demo purposes
        const mockUser: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          role: UserRole.ADMIN,
          avatar: '/avatars/default.jpg',
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_USERS, Permission.VIEW_PROJECTS],
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const mockOrganization: Organization = {
          id: '1',
          name: 'INVENTOR Design Studio',
          domain: 'inventor.com',
          settings: {
            allowSelfRegistration: true,
            requireEmailVerification: false,
            defaultUserRole: UserRole.USER
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Set user and organization data
        setUser(mockUser);
        setOrganization(mockOrganization);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('organization', JSON.stringify(mockOrganization));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        
        // Redirect to dashboard after successful login
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error);
      // Don't call handleApiError for mock authentication
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API
      await authApi.logout();
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local state
      setUser(null);
      setOrganization(null);
      setIsAuthenticated(false);
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('organization');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      
      // Redirect to login
      window.location.href = '/login';
    }
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const updateUser = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedUser = await userApi.updateUser(user.id, updates);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.log('API not available, updating user locally:', error);
      // Update user locally when API is not available
      const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    organization,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

