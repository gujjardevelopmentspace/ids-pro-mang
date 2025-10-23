import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  PieChart,
  RefreshCw,
  Eye,
  MessageSquare,
  Bell
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTenant } from "../contexts/TenantContext";
import { useRealTime } from "../hooks/useRealTime";
import { PermissionGate } from "../components/PermissionGate";
import { Permission } from "../types/auth";

const EnhancedDashboard = () => {
  const { user, hasPermission } = useAuth();
  const { currentTenant } = useTenant();
  const { onlineUsers, events, isConnected, sendNotification } = useRealTime();
  
  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalUsers: 0,
    onlineUsers: 0,
    pendingApprovals: 0,
    recentActivities: [] as any[]
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setDashboardData({
          totalProjects: 25,
          activeProjects: 12,
          completedProjects: 13,
          totalUsers: onlineUsers.length,
          onlineUsers: onlineUsers.filter(u => u.isActive).length,
          pendingApprovals: 8,
          recentActivities: [
            {
              id: 1,
              type: 'project_created',
              message: 'New project "Office Complex" created',
              user: 'Project Manager',
              time: '2 hours ago',
              status: 'success'
            },
            {
              id: 2,
              type: 'approval_pending',
              message: 'Work Order #WO-001 needs approval',
              user: 'Senior Engineer',
              time: '4 hours ago',
              status: 'warning'
            },
            {
              id: 3,
              type: 'material_delivered',
              message: 'Concrete delivery completed',
              user: 'System',
              time: '6 hours ago',
              status: 'success'
            }
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, [onlineUsers]);

  const refreshData = async () => {
    setIsLoading(true);
    sendNotification('Dashboard data refreshed', 'success');
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_created':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'approval_pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'material_delivered':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Enhanced Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Here's what's happening in your organization.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <p className="text-3xl font-bold text-foreground">{dashboardData.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold text-foreground">{dashboardData.activeProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600">In progress</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Online Users</p>
              <p className="text-3xl font-bold text-foreground">{dashboardData.onlineUsers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Live</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <p className="text-3xl font-bold text-foreground">{dashboardData.pendingApprovals}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-600">Awaiting review</span>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Online Users */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Online Users</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">{onlineUsers.length} online</span>
            </div>
          </div>
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">by {activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Events */}
      <PermissionGate permissions={[Permission.VIEW_REPORTS]}>
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Real-time Events</h3>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{events.length} events</span>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No real-time events yet</p>
              </div>
            ) : (
              events.slice(-10).reverse().map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{event.data.message || `${event.type} event`}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">by {event.userName}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </PermissionGate>

      {/* Organization Info */}
      {currentTenant && (
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Organization Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Organization</p>
              <p className="text-foreground">{currentTenant.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Subscription</p>
              <p className="text-foreground capitalize">{currentTenant.subscription.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Max Users</p>
              <p className="text-foreground">{currentTenant.subscription.maxUsers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboard;
