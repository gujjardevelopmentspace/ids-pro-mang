import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Permission, UserRole } from "../types/auth";

interface PermissionGateProps {
  children: ReactNode;
  permissions?: Permission[];
  roles?: UserRole[];
  fallback?: ReactNode;
  requireAll?: boolean; // If true, user must have ALL permissions/roles. If false, user needs ANY.
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permissions = [],
  roles = [],
  fallback = null,
  requireAll = true
}) => {
  const { user, hasPermission, hasRole } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  // Check role requirements
  if (roles.length > 0) {
    const roleCheck = requireAll
      ? roles.every(role => hasRole(role))
      : roles.some(role => hasRole(role));
    
    if (!roleCheck) {
      return <>{fallback}</>;
    }
  }

  // Check permission requirements
  if (permissions.length > 0) {
    const permissionCheck = requireAll
      ? permissions.every(permission => hasPermission(permission))
      : permissions.some(permission => hasPermission(permission));
    
    if (!permissionCheck) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};
