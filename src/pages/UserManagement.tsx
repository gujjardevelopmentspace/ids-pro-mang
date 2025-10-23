import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, Filter, MoreVertical, UserPlus, Shield, UserCheck, Crown, Star, Zap, Rocket, Sparkles, Bell, Mail, Phone, MapPin, Calendar, Clock, TrendingUp, BarChart3, Activity, Target, Award, Globe, Building, Users, Settings, Key, Lock, Unlock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { PermissionGate } from "../components/PermissionGate";
import { User, UserRole, Permission } from "../types/auth";

const UserManagement = () => {
  const { user: currentUser, hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        email: "admin@inventerdesign.com",
        name: "System Administrator",
        role: UserRole.ADMIN,
        permissions: [
          Permission.MANAGE_USERS,
          Permission.VIEW_USERS,
          Permission.CREATE_PROJECTS,
          Permission.EDIT_PROJECTS,
          Permission.DELETE_PROJECTS,
          Permission.VIEW_PROJECTS,
          Permission.VIEW_FINANCIALS,
          Permission.MANAGE_BUDGETS,
          Permission.APPROVE_PAYMENTS,
          Permission.MANAGE_INVENTORY,
          Permission.VIEW_INVENTORY,
          Permission.APPROVE_WORK_ORDERS,
          Permission.APPROVE_PURCHASES,
          Permission.APPROVE_BIDS,
          Permission.VIEW_REPORTS,
          Permission.EXPORT_DATA,
          Permission.MANAGE_SETTINGS,
          Permission.VIEW_SETTINGS
        ],
        organizationId: "org-1",
        department: "IT",
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      },
      {
        id: "2",
        email: "manager@inventerdesign.com",
        name: "Project Manager",
        role: UserRole.PROJECT_MANAGER,
        permissions: [
          Permission.VIEW_USERS,
          Permission.CREATE_PROJECTS,
          Permission.EDIT_PROJECTS,
          Permission.VIEW_PROJECTS,
          Permission.VIEW_FINANCIALS,
          Permission.MANAGE_BUDGETS,
          Permission.APPROVE_WORK_ORDERS,
          Permission.APPROVE_PURCHASES,
          Permission.VIEW_INVENTORY,
          Permission.VIEW_REPORTS,
          Permission.EXPORT_DATA
        ],
        organizationId: "org-1",
        department: "Project Management",
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      },
      {
        id: "3",
        email: "engineer@inventerdesign.com",
        name: "Senior Engineer",
        role: UserRole.ENGINEER,
        permissions: [
          Permission.VIEW_PROJECTS,
          Permission.VIEW_INVENTORY,
          Permission.VIEW_REPORTS
        ],
        organizationId: "org-1",
        department: "Engineering",
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date()
      },
      {
        id: "4",
        email: "client@inventerdesign.com",
        name: "Client Representative",
        role: UserRole.CLIENT,
        permissions: [
          Permission.VIEW_PROJECTS,
          Permission.VIEW_REPORTS
        ],
        organizationId: "org-1",
        department: "Client Relations",
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date()
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter users based on search term and role
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const handleToggleUserStatus = async (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-red-100 text-red-800 border-red-200";
      case UserRole.PROJECT_MANAGER:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case UserRole.ENGINEER:
        return "bg-green-100 text-green-800 border-green-200";
      case UserRole.CLIENT:
        return "bg-purple-100 text-purple-800 border-purple-200";
      case UserRole.VIEWER:
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage users, roles, and permissions</p>
        </div>
        <PermissionGate permissions={[Permission.MANAGE_USERS]}>
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </PermissionGate>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.PROJECT_MANAGER}>Project Manager</option>
            <option value={UserRole.ENGINEER}>Engineer</option>
            <option value={UserRole.CLIENT}>Client</option>
            <option value={UserRole.VIEWER}>Viewer</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Department</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Login</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.department || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.isActive)}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.lastLogin ? user.lastLogin.toLocaleDateString() : "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <PermissionGate permissions={[Permission.VIEW_USERS]}>
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                      </PermissionGate>
                      <PermissionGate permissions={[Permission.MANAGE_USERS]}>
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                      </PermissionGate>
                      <PermissionGate permissions={[Permission.MANAGE_USERS]}>
                        <button 
                          onClick={() => handleToggleUserStatus(user.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <UserCheck className="w-4 h-4 text-orange-500" />
                        </button>
                      </PermissionGate>
                      <PermissionGate permissions={[Permission.MANAGE_USERS]}>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">Total Users</span>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{users.length}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">Active Users</span>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">
            {users.filter(u => u.isActive).length}
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-muted-foreground">Admins</span>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">
            {users.filter(u => u.role === UserRole.ADMIN).length}
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">Managers</span>
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">
            {users.filter(u => u.role === UserRole.PROJECT_MANAGER).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
