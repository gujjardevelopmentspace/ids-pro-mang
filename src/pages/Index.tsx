import { ModernDashboardWrapper } from "@/components/ModernDashboardWrapper";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { 
  MetricCard, 
  PieChartIcon, 
  TrendUpIcon, 
  BarsIcon,
  CalendarPlusIcon,
  CalendarCheckIcon,
  CalendarMinusIcon
} from "@/components/MetricCard";
import { LineChart } from "@/components/LineChart";
import { Calendar } from "@/components/Calendar";
import { useState, useEffect } from "react";
import { analyticsApi, projectApi, userApi } from "../services/realApi";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  PieChart, 
  Activity, 
  RefreshCw,
  Zap,
  Target,
  Award,
  Globe,
  Shield,
  Sparkles,
  Rocket,
  Star,
  Crown,
  Flame
} from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workOrderData, setWorkOrderData] = useState({
    totalAmount: 1250000,
    approvedAmount: 850000,
    underProcessAmount: 400000
  });

  const [inspectionData, setInspectionData] = useState({
    totalRequests: 45,
    approvedRequests: 32,
    pendingRequests: 13
  });

  // Generate realistic dates for last 10 days
  const generateRecentDates = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Generate realistic work activity with weekday/weekend pattern
  const generateActivityData = () => {
    const dates = generateRecentDates(10);
    return dates.map((date, i) => {
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseValue = isWeekend ? 3 : 18;
      const variance = Math.floor(Math.random() * 12);
      const trend = Math.floor(i * 1.5); // Upward trend
      return { date, value: baseValue + variance + trend };
    });
  };

  // Generate realistic payment requests (business days only)
  const generatePaymentData = () => {
    const dates = generateRecentDates(10);
    let cumulative = 425000;
    return dates.map((date) => {
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dailyPayment = isWeekend ? 
        0 : 
        Math.floor(Math.random() * 35000) + 15000;
      cumulative += dailyPayment;
      return { date, value: cumulative };
    });
  };

  const [chartData, setChartData] = useState(generateActivityData());
  const [checkRequestData, setCheckRequestData] = useState(generatePaymentData());

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'work-order', message: 'Work Order #WO-001 approved', time: '2 hours ago', status: 'success', priority: 'high' },
    { id: 2, type: 'inspection', message: 'Inspection Request #IR-002 submitted', time: '4 hours ago', status: 'info', priority: 'medium' },
    { id: 3, type: 'payment', message: 'Payment of $25,000 processed', time: '6 hours ago', status: 'success', priority: 'high' },
    { id: 4, type: 'approval', message: 'Budget approval pending for Project Alpha', time: '8 hours ago', status: 'warning', priority: 'critical' },
    { id: 5, type: 'milestone', message: 'Project Beta reached 75% completion', time: '1 day ago', status: 'success', priority: 'medium' }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    efficiency: 94,
    productivity: 87,
    quality: 96,
    satisfaction: 92
  });

  const [quickStats, setQuickStats] = useState({
    activeProjects: 12,
    completedTasks: 156,
    teamMembers: 8,
    clientSatisfaction: 4.8
  });

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Try to load real dashboard statistics, but fallback to mock data if API is not available
      try {
        const stats = await analyticsApi.getDashboardStats();
        
        // Update work order data with real data
        setWorkOrderData({
          totalAmount: stats.totalRevenue,
          approvedAmount: stats.monthlyRevenue,
          underProcessAmount: stats.totalRevenue - stats.monthlyRevenue
        });

        // Load real projects data
        const projectsResponse = await projectApi.getProjects(1, 10);
        setQuickStats(prev => ({
          ...prev,
          activeProjects: projectsResponse.projects.length,
          completedTasks: projectsResponse.projects.filter(p => p.status === 'completed').length
        }));

        // Load real users data
        const usersResponse = await userApi.getUsers(1, 10);
        setQuickStats(prev => ({
          ...prev,
          teamMembers: usersResponse.total
        }));
      } catch (apiError) {
        console.log('API not available, using mock data:', apiError);
        // Use mock data when API is not available
        setWorkOrderData({
          totalAmount: 2500000,
          approvedAmount: 1800000,
          underProcessAmount: 700000
        });
        
        setQuickStats(prev => ({
          ...prev,
          activeProjects: 8,
          completedTasks: 24,
          teamMembers: 25
        }));
      }

    } catch (error) {
      console.error('Error refreshing data:', error);
      // Fallback to mock data if API fails
      setWorkOrderData(prev => ({
        totalAmount: prev.totalAmount + Math.floor(Math.random() * 10000),
        approvedAmount: prev.approvedAmount + Math.floor(Math.random() * 5000),
        underProcessAmount: prev.underProcessAmount + Math.floor(Math.random() * 3000)
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time updates using WebSocket (temporarily disabled)
  // useRealTime('project_update', (update: any) => {
  //   console.log('Project update received:', update);
  //   // Refresh data when project updates occur
  //   refreshData();
  // });

  // useRealTime('user_activity', (activity: any) => {
  //   console.log('User activity received:', activity);
  //   // Update recent activities
  //   setRecentActivities(prev => [
  //     {
  //       id: Date.now(),
  //       type: activity.action,
  //       message: `${activity.action} on ${activity.resource}`,
  //       time: 'Just now',
  //       status: 'info',
  //       priority: 'medium'
  //     },
  //     ...prev.slice(0, 4) // Keep only 5 most recent
  //   ]);
  // });

  // useRealTime('notification', (notification: any) => {
  //   console.log('Notification received:', notification);
  //   // Update recent activities with notification
  //   setRecentActivities(prev => [
  //     {
  //       id: Date.now(),
  //       type: 'notification',
  //       message: notification.title,
  //       time: 'Just now',
  //       status: notification.type,
  //       priority: notification.priority || 'medium'
  //     },
  //     ...prev.slice(0, 4)
  //   ]);
  // });

  useEffect(() => {
    // Load initial data
    refreshData();
    
    // Set up periodic refresh as fallback
    const interval = setInterval(() => {
      refreshData();
    }, 300000); // Refresh every 5 minutes as fallback

    return () => clearInterval(interval);
  }, []);
  return (
    <ModernDashboardWrapper>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-12">
          {/* Welcome Message */}
          <WelcomeMessage />
        {/* Modern Header with Enhanced Features */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-ids-cyan/10 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Welcome to Your Dashboard
                </h1>
              </div>
              <p className="text-sm sm:text-lg text-muted-foreground mb-4">
                Everything you need to manage your projects, track progress, and stay on top of your team's work
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Always up-to-date</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Your data is safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-ids-cyan" />
                  <span className="text-muted-foreground">Lightning fast</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl min-w-[120px]"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Getting the latest...' : 'Get Latest Updates'}
              </button>
              <button 
                onClick={() => {
                  // Quick actions functionality
                  const actions = [
                    'Create New Project',
                    'Generate Report', 
                    'View Analytics',
                    'Manage Team'
                  ];
                  const randomAction = actions[Math.floor(Math.random() * actions.length)];
                  alert(`Quick Action: ${randomAction}`);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-xl hover:bg-muted transition-all duration-200 text-sm font-medium min-w-[120px]"
              >
                <Rocket className="w-4 h-4" />
                Quick Tasks
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">How We're Doing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-200 border border-border/50 cursor-pointer group" onClick={() => alert('Efficiency Details: System performance metrics and optimization suggestions')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-2xl font-bold text-green-500">{performanceMetrics.efficiency}%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Efficiency</h3>
              <p className="text-sm text-muted-foreground">System performance</p>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: `${performanceMetrics.efficiency}%`}}></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-200 border border-border/50 cursor-pointer group" onClick={() => alert('Productivity Details: Team output metrics and performance analytics')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Activity className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-2xl font-bold text-blue-500">{performanceMetrics.productivity}%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Productivity</h3>
              <p className="text-sm text-muted-foreground">Team output</p>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{width: `${performanceMetrics.productivity}%`}}></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-200 border border-border/50 cursor-pointer group" onClick={() => alert('Quality Details: Code quality metrics and improvement suggestions')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-2xl font-bold text-purple-500">{performanceMetrics.quality}%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quality</h3>
              <p className="text-sm text-muted-foreground">Code quality</p>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{width: `${performanceMetrics.quality}%`}}></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-200 border border-border/50 cursor-pointer group" onClick={() => alert('Satisfaction Details: Client rating metrics and feedback analysis')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-2xl font-bold text-orange-500">{performanceMetrics.satisfaction}%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Satisfaction</h3>
              <p className="text-sm text-muted-foreground">Client rating</p>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{width: `${performanceMetrics.satisfaction}%`}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">At a Glance</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-200 text-center cursor-pointer group" onClick={() => alert(`Active Projects: ${quickStats.activeProjects} projects currently in development`)}>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{quickStats.activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-200 text-center cursor-pointer group" onClick={() => alert(`Completed Tasks: ${quickStats.completedTasks} tasks finished this month`)}>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{quickStats.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed Tasks</div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-200 text-center cursor-pointer group" onClick={() => alert(`Team Members: ${quickStats.teamMembers} developers in the team`)}>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{quickStats.teamMembers}</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-200 text-center cursor-pointer group" onClick={() => alert(`Client Rating: ${quickStats.clientSatisfaction}/5.0 average client satisfaction`)}>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{quickStats.clientSatisfaction}</div>
              <div className="text-sm text-muted-foreground">Client Rating</div>
            </div>
          </div>
        </section>

        {/* Work Order - All Over */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            Work Orders <span className="font-normal text-muted-foreground text-sm sm:text-base">(All Projects)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MetricCard
              icon={<PieChartIcon />}
              value={`$${workOrderData.totalAmount.toLocaleString()}`}
              label="Total Work Order Amount"
              color="cyan"
            />
            <MetricCard
              icon={<TrendUpIcon />}
              value={`$${workOrderData.approvedAmount.toLocaleString()}`}
              label="Approved Amount"
              color="green"
            />
            <MetricCard
              icon={<BarsIcon />}
              value={`$${workOrderData.underProcessAmount.toLocaleString()}`}
              label="Under Process Amount"
              color="coral"
            />
          </div>
        </section>

        {/* Inspection Requests */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            Inspection Requests <span className="font-normal text-muted-foreground text-sm sm:text-base">(All Projects)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MetricCard
              icon={<PieChartIcon />}
              value={inspectionData.totalRequests.toString()}
              label="Total Inspection Requests"
              color="cyan"
            />
            <MetricCard
              icon={<TrendUpIcon />}
              value={inspectionData.approvedRequests.toString()}
              label="Approved Requests"
              color="green"
            />
            <MetricCard
              icon={<BarsIcon />}
              value={inspectionData.pendingRequests.toString()}
              label="Pending Requests"
              color="coral"
            />
          </div>
        </section>

        {/* Work Order - October 2025 */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            This Month's Work <span className="font-normal text-muted-foreground text-sm sm:text-base">(October 2025)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MetricCard
              icon={<CalendarPlusIcon />}
              value="0"
              label="Total Work Order Amount"
              color="cyan"
            />
            <MetricCard
              icon={<CalendarCheckIcon />}
              value="0"
              label="Approved Amount"
              color="green"
            />
            <MetricCard
              icon={<CalendarMinusIcon />}
              value="0"
              label="Under Process Amount"
              color="coral"
            />
          </div>
        </section>

        {/* Charts and Analytics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Charts & Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Count Chart */}
            <LineChart
              title="Daily Activity Count"
              subtitle="Last 10 Days"
              yAxisLabel="Count"
              xAxisLabel="Days"
              data={chartData}
              color="#3b82f6"
            />

            {/* Check Request Chart */}
            <LineChart
              title="Check Request Amount"
              subtitle="Last 10 Days"
              yAxisLabel="Amount ($)"
              xAxisLabel="Days"
              data={checkRequestData}
              color="#10b981"
            />
          </div>
        </section>

        {/* Modern Recent Activities */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">What's Happening</h2>
            </div>
            <button 
              onClick={() => alert('Viewing all activities... Redirecting to activity log.')}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-primary/10"
            >
              See Everything →
            </button>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="group flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:bg-muted/30 hover:border-primary/20 transition-all duration-200 cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-500/20' :
                      activity.status === 'warning' ? 'bg-yellow-500/20' :
                      activity.status === 'info' ? 'bg-blue-500/20' : 'bg-gray-500/20'
                    }`}>
                      {activity.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {activity.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {activity.status === 'info' && <Activity className="w-5 h-5 text-blue-500" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{activity.message}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.priority === 'critical' ? 'bg-red-500/20 text-red-500' :
                          activity.priority === 'high' ? 'bg-orange-500/20 text-orange-500' :
                          activity.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {activity.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            CALENDAR
          </h2>
          <div className="max-w-4xl">
            <Calendar title="Calendar" />
          </div>
        </section>
      </div>
    </ModernDashboardWrapper>
  );
};

export default Index;
