import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, User, Mail, Phone, MapPin, Calendar, Shield, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, RefreshCw, Download, Upload, MoreHorizontal } from "lucide-react";

const UserOverview = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "AHSAN UL HAQ",
      email: "yahyaahsan210@gmail.com",
      designation: "Project Manager",
      company: "ABC Construction",
      createdAt: "2024-01-15",
      pendingApprovals: 5,
      status: "Active",
      role: "Manager",
      phone: "+1-555-0123",
      location: "New York, NY",
      lastActive: "2 hours ago",
      totalProjects: 12,
      completedProjects: 8,
      performance: 85
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@company.com",
      designation: "Site Engineer",
      company: "XYZ Builders",
      createdAt: "2024-01-10",
      pendingApprovals: 3,
      status: "Active",
      role: "Engineer",
      phone: "+1-555-0124",
      location: "Los Angeles, CA",
      lastActive: "1 hour ago",
      totalProjects: 8,
      completedProjects: 6,
      performance: 92
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      designation: "Quality Inspector",
      company: "Metro Construction",
      createdAt: "2024-01-08",
      pendingApprovals: 7,
      status: "Active",
      role: "Inspector",
      phone: "+1-555-0125",
      location: "Chicago, IL",
      lastActive: "30 minutes ago",
      totalProjects: 15,
      completedProjects: 12,
      performance: 88
    },
    {
      id: 4,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      designation: "Safety Officer",
      company: "Elite Contractors",
      createdAt: "2024-01-05",
      pendingApprovals: 2,
      status: "Inactive",
      role: "Safety",
      phone: "+1-555-0126",
      location: "Miami, FL",
      lastActive: "2 days ago",
      totalProjects: 6,
      completedProjects: 4,
      performance: 75
    },
    {
      id: 5,
      name: "Lisa Wilson",
      email: "lisa.wilson@company.com",
      designation: "Architect",
      company: "Design Studio",
      createdAt: "2024-01-12",
      pendingApprovals: 4,
      status: "Active",
      role: "Architect",
      phone: "+1-555-0127",
      location: "Seattle, WA",
      lastActive: "45 minutes ago",
      totalProjects: 10,
      completedProjects: 7,
      performance: 90
    }
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    designation: "",
    company: "",
    phone: "",
    location: "",
    role: ""
  });

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalPendingApprovals: 0,
    averagePerformance: 0,
    newUsersThisMonth: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'user', message: 'New user John Smith registered', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'approval', message: 'Sarah Johnson approved 3 pending requests', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'performance', message: 'Mike Davis performance updated to 75%', time: '6 hours ago', status: 'warning' },
    { id: 4, type: 'role', message: 'Lisa Wilson role changed to Architect', time: '8 hours ago', status: 'success' },
    { id: 5, type: 'inactive', message: 'User marked as inactive due to inactivity', time: '1 day ago', status: 'warning' }
  ]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      designation: newUser.designation,
      company: newUser.company,
      createdAt: new Date().toISOString().split('T')[0],
      pendingApprovals: 0,
      status: "Active",
      role: newUser.role,
      phone: newUser.phone,
      location: newUser.location,
      lastActive: "Just now",
      totalProjects: 0,
      completedProjects: 0,
      performance: 0
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", designation: "", company: "", phone: "", location: "", role: "" });
    setShowAddUser(false);
    updateAnalytics();
  };

  const handleUserAction = (id: number, action: 'activate' | 'deactivate' | 'delete') => {
    if (action === 'delete') {
      setUsers(users.filter(user => user.id !== id));
    } else {
      setUsers(users.map(user => 
        user.id === id 
          ? { ...user, status: action === 'activate' ? 'Active' : 'Inactive' }
          : user
      ));
    }
    updateAnalytics();
  };

  const toggleUserSelection = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(filteredUsers.map(user => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (action === 'delete') {
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    } else {
      setUsers(users.map(user => 
        selectedUsers.includes(user.id)
          ? { ...user, status: action === 'activate' ? 'Active' : 'Inactive' }
          : user
      ));
    }
    setSelectedUsers([]);
    updateAnalytics();
  };

  const updateAnalytics = () => {
    const total = users.length;
    const active = users.filter(u => u.status === 'Active').length;
    const inactive = users.filter(u => u.status === 'Inactive').length;
    const pending = users.reduce((sum, u) => sum + u.pendingApprovals, 0);
    const avgPerformance = users.length > 0 ? users.reduce((sum, u) => sum + u.performance, 0) / users.length : 0;
    const newThisMonth = users.filter(u => {
      const created = new Date(u.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length;

    setAnalytics({
      totalUsers: total,
      activeUsers: active,
      inactiveUsers: inactive,
      totalPendingApprovals: pending,
      averagePerformance: Math.round(avgPerformance),
      newUsersThisMonth: newThisMonth
    });
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate data update
      setUsers(prev => prev.map(user => ({
        ...user,
        performance: Math.min(100, Math.max(0, user.performance + Math.floor(Math.random() * 5) - 2)),
        pendingApprovals: Math.max(0, user.pendingApprovals + Math.floor(Math.random() * 3) - 1)
      })));
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Inactive": return "bg-red-100 text-red-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Manager": return <Shield className="w-4 h-4 text-blue-500" />;
      case "Engineer": return <BarChart3 className="w-4 h-4 text-green-500" />;
      case "Inspector": return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case "Safety": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "Architect": return <PieChart className="w-4 h-4 text-purple-500" />;
      default: return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4 text-blue-500" />;
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'performance': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'role': return <Shield className="w-4 h-4 text-purple-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
      return matchesSearch && matchesStatus && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filterStatus, filterRole, users]);

  useEffect(() => {
    updateAnalytics();
  }, [users]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        lastActive: Math.random() > 0.5 ? "Just now" : user.lastActive
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Overview</h1>
            <p className="text-muted-foreground mt-2">Manage users and track their performance</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">User Overview</span>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-blue-500">{analytics.totalUsers}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-green-500">{analytics.activeUsers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
                <p className="text-2xl font-bold text-red-500">{analytics.inactiveUsers}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-yellow-500">{analytics.totalPendingApprovals}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold text-purple-500">{analytics.averagePerformance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold text-orange-500">{analytics.newUsersThisMonth}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Roles</option>
              <option value="manager">Manager</option>
              <option value="engineer">Engineer</option>
              <option value="inspector">Inspector</option>
              <option value="safety">Safety</option>
              <option value="architect">Architect</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedUsers.length} selected</span>
                <button 
                  onClick={() => handleBulkAction('activate')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  Activate
                </button>
                <button 
                  onClick={() => handleBulkAction('deactivate')}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  <XCircle className="w-4 h-4" />
                  Deactivate
                </button>
                <button 
                  onClick={() => handleBulkAction('delete')}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <button 
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={selectedUsers.length === filteredUsers.length ? clearSelection : selectAllUsers}
                      className="flex items-center gap-2"
                    >
                      {selectedUsers.length === filteredUsers.length ? 
                        <CheckCircle className="w-4 h-4" /> : 
                        <div className="w-4 h-4 border border-muted-foreground rounded"></div>
                      }
                      Select All
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Performance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Pending</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <button onClick={() => toggleUserSelection(user.id)}>
                        {selectedUsers.includes(user.id) ? 
                          <CheckCircle className="w-4 h-4 text-blue-500" /> : 
                          <div className="w-4 h-4 border border-muted-foreground rounded"></div>
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{user.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.designation}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.company}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className="text-sm text-foreground">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              user.performance >= 90 ? 'bg-green-500' :
                              user.performance >= 70 ? 'bg-yellow-500' :
                              user.performance >= 50 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{width: `${user.performance}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-foreground">{user.performance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.pendingApprovals}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, user.status === 'Active' ? 'deactivate' : 'activate')}
                          className="p-1 hover:bg-muted rounded"
                        >
                          {user.status === 'Active' ? 
                            <XCircle className="w-4 h-4 text-yellow-500" /> : 
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          }
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, 'delete')}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 shadow-card w-full max-w-2xl mx-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input 
                      type="email" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Designation *</label>
                    <input 
                      type="text" 
                      value={newUser.designation}
                      onChange={(e) => setNewUser({...newUser, designation: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                    <input 
                      type="text" 
                      value={newUser.company}
                      onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input 
                      type="tel" 
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <input 
                      type="text" 
                      value={newUser.location}
                      onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Role *</label>
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Manager">Manager</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Inspector">Inspector</option>
                      <option value="Safety">Safety</option>
                      <option value="Architect">Architect</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserOverview;