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
    } catch (error) {
      console.error('Login error:', error);
      handleApiError(error);
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
      console.error('Error updating user:', error);
      handleApiError(error);
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

