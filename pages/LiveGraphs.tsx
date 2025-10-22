import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart } from "@/components/LineChart";
import { 
  AdvancedBarChart, 
  AdvancedPieChart, 
  AdvancedAreaChart,
  MultiLineChart 
} from "@/components/AdvancedCharts";
import { ExportButton } from "@/components/ExportButton";
import { useState, useEffect } from "react";
import { RefreshCw, Download, Filter, Calendar, Building, Users, BarChart3, TrendingUp, TrendingDown, Activity, PieChart, Target, Clock } from "lucide-react";

const LiveGraphs = () => {
  const [dateDuration, setDateDuration] = useState("7");
  const [siteName, setSiteName] = useState("all");
  const [projectType, setProjectType] = useState("all");
  const [contractor, setContractor] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Generate realistic date labels
  const generateDates = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Generate realistic work activity data (with weekday/weekend patterns)
  const generateWorkActivity = (days: number) => {
    const dates = generateDates(days);
    return dates.map((date, i) => {
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseValue = isWeekend ? 5 : 25;
      const variance = Math.floor(Math.random() * 15);
      const trend = Math.floor(i / 2); // Gradual upward trend
      return { date, value: baseValue + variance + trend };
    });
  };

  // Generate realistic budget data (cumulative with realistic spending pattern)
  const generateBudgetData = (days: number) => {
    const dates = generateDates(days);
    let cumulative = 850000;
    return dates.map((date, i) => {
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dailySpend = isWeekend ? 
        Math.floor(Math.random() * 5000) : 
        Math.floor(Math.random() * 25000) + 15000;
      cumulative += dailySpend;
      return { date, value: cumulative };
    });
  };

  // Generate realistic progress data (incremental with plateaus)
  const generateProgressData = (days: number) => {
    const dates = generateDates(days);
    let progress = 42;
    return dates.map((date, i) => {
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (!isWeekend && progress < 95) {
        progress += Math.random() * 2.5;
      }
      return { date, value: Math.min(95, progress) };
    });
  };

  // Generate multi-project comparison data
  const generateProjectComparison = (days: number) => {
    const dates = generateDates(days);
    return dates.map((date, i) => {
      const projectA = 45 + (i * 1.5) + (Math.random() * 5 - 2.5);
      const projectB = 38 + (i * 1.8) + (Math.random() * 6 - 3);
      const projectC = 52 + (i * 1.2) + (Math.random() * 4 - 2);
      return {
        date,
        'Office Complex': Math.min(95, Math.max(0, projectA)),
        'Residential Tower': Math.min(95, Math.max(0, projectB)),
        'Shopping Mall': Math.min(95, Math.max(0, projectC))
      };
    });
  };

  // Revenue vs Expenses data
  const generateFinancialData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      revenue: 450000 + (i * 75000) + (Math.random() * 50000),
      expenses: 280000 + (i * 45000) + (Math.random() * 30000),
      profit: 0 // Will be calculated
    })).map(item => ({
      ...item,
      profit: item.revenue - item.expenses
    }));
  };

  // Project distribution data
  const projectDistribution = [
    { name: 'Construction', value: 8, color: '#3b82f6' },
    { name: 'Infrastructure', value: 5, color: '#10b981' },
    { name: 'Residential', value: 3, color: '#8b5cf6' },
    { name: 'Commercial', value: 4, color: '#f59e0b' },
  ];

  // Team performance data
  const teamPerformanceData = [
    { subject: 'Planning', actual: 85, target: 90 },
    { subject: 'Execution', actual: 92, target: 85 },
    { subject: 'Quality', actual: 88, target: 95 },
    { subject: 'Safety', actual: 95, target: 100 },
    { subject: 'Budget', actual: 78, target: 80 },
    { subject: 'Timeline', actual: 82, target: 85 },
  ];

  const [chartData, setChartData] = useState({
    dailyActivity: generateWorkActivity(14),
    budgetSpending: generateBudgetData(14),
    projectProgress: generateProgressData(14),
    projectComparison: generateProjectComparison(10),
    financialData: generateFinancialData(),
    projectDistribution: projectDistribution,
    teamPerformance: teamPerformanceData
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 45,
    completedTasks: 128,
    pendingTasks: 23,
    totalRevenue: 1250000,
    efficiency: 87,
    productivity: 92
  });

  const [sites] = useState([
    { id: "all", name: "All Sites" },
    { id: "site1", name: "Downtown Office Complex" },
    { id: "site2", name: "Residential Tower" },
    { id: "site3", name: "Industrial Plant" },
    { id: "site4", name: "Shopping Mall" },
    { id: "site5", name: "Office Building" }
  ]);

  const [projectTypes] = useState([
    { id: "all", name: "All Types" },
    { id: "construction", name: "Construction" },
    { id: "infrastructure", name: "Infrastructure" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "industrial", name: "Industrial" }
  ]);

  const [contractors] = useState([
    { id: "all", name: "All Contractors" },
    { id: "contractor1", name: "ABC Construction" },
    { id: "contractor2", name: "XYZ Builders" },
    { id: "contractor3", name: "Metro Construction" },
    { id: "contractor4", name: "Elite Contractors" }
  ]);

  const [recentUpdates, setRecentUpdates] = useState([
    { id: 1, type: 'data', message: 'Daily activity data updated', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'chart', message: 'Project progress chart refreshed', time: '5 minutes ago', status: 'info' },
    { id: 3, type: 'metric', message: 'Resource utilization metrics updated', time: '8 minutes ago', status: 'success' },
    { id: 4, type: 'alert', message: 'Cost analysis threshold exceeded', time: '12 minutes ago', status: 'warning' },
    { id: 5, type: 'update', message: 'Real-time metrics synchronized', time: '15 minutes ago', status: 'success' }
  ]);

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      // Regenerate realistic data with updated patterns
      setChartData({
        dailyActivity: generateWorkActivity(14),
        budgetSpending: generateBudgetData(14),
        projectProgress: generateProgressData(14),
        projectComparison: generateProjectComparison(10),
        financialData: generateFinancialData(),
        projectDistribution: projectDistribution,
        teamPerformance: teamPerformanceData
      });

      // Update real-time metrics with realistic changes
      setRealTimeMetrics(prev => ({
        activeUsers: Math.max(20, prev.activeUsers + Math.floor(Math.random() * 6) - 3),
        completedTasks: prev.completedTasks + Math.floor(Math.random() * 8) + 1,
        pendingTasks: Math.max(0, prev.pendingTasks + Math.floor(Math.random() * 5) - 2),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 50000) + 10000,
        efficiency: Math.min(100, Math.max(70, prev.efficiency + Math.floor(Math.random() * 4) - 2)),
        productivity: Math.min(100, Math.max(75, prev.productivity + Math.floor(Math.random() * 4) - 2))
      }));

      // Add new update to recent updates
      const updateMessages = [
        'Daily activity data updated with latest metrics',
        'Project progress synchronized across all sites',
        'Budget spending data refreshed from accounting',
        'Resource utilization metrics recalculated',
        'Financial data updated with new transactions',
        'Team performance metrics updated'
      ];
      
      setRecentUpdates(prev => [{
        id: Date.now(),
        type: ['data', 'chart', 'metric', 'update'][Math.floor(Math.random() * 4)],
        message: updateMessages[Math.floor(Math.random() * updateMessages.length)],
        time: 'Just now',
        status: 'success'
      }, ...prev.slice(0, 4)]);

      setIsLoading(false);
    }, 1000);
  };

  const exportData = () => {
    const data = {
      dateDuration,
      siteName,
      projectType,
      contractor,
      chartData,
      realTimeMetrics,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `live-graphs-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'data': return <BarChart3 className="w-4 h-4 text-blue-500" />;
      case 'chart': return <PieChart className="w-4 h-4 text-green-500" />;
      case 'metric': return <Target className="w-4 h-4 text-purple-500" />;
      case 'alert': return <Activity className="w-4 h-4 text-yellow-500" />;
      case 'update': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        refreshData();
      }, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Live Graphs</h1>
            <p className="text-muted-foreground mt-2">Real-time data visualization and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Live Graphs</span>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Duration</label>
              <select 
                value={dateDuration}
                onChange={(e) => setDateDuration(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="1">Last 24 Hours</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
              <select 
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {sites.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
              <select 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {projectTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contractor</label>
              <select 
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {contractors.map(contractor => (
                  <option key={contractor.id} value={contractor.id}>{contractor.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-foreground">Auto-refresh every 30 seconds</span>
            </label>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-blue-500">{realTimeMetrics.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-500">{realTimeMetrics.completedTasks}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-500">{realTimeMetrics.pendingTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-500">${(realTimeMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-orange-500">{realTimeMetrics.efficiency}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productivity</p>
                <p className="text-2xl font-bold text-red-500">{realTimeMetrics.productivity}%</p>
              </div>
              <Activity className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Charts Grid - Row 1: Line Charts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Activity & Progress Trends</h2>
            <ExportButton 
              data={chartData.dailyActivity}
              filename="activity-trends"
              title="Activity Trends Report"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Work Activity (realistic weekday/weekend pattern) */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Daily Work Activity</h3>
                  <p className="text-xs text-muted-foreground mt-1">Lower on weekends, higher on weekdays</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Tasks/Day</span>
                </div>
              </div>
              <LineChart
                title=""
                subtitle={`Last 14 days`}
                yAxisLabel="Tasks"
                xAxisLabel="Date"
                data={chartData.dailyActivity}
                color="#3b82f6"
              />
            </div>

            {/* Cumulative Budget Spending */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Cumulative Budget Spending</h3>
                  <p className="text-xs text-muted-foreground mt-1">Real spending pattern with daily increases</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Amount</span>
                </div>
              </div>
              <LineChart
                title=""
                subtitle="Last 14 days"
                yAxisLabel="Cost ($)"
                xAxisLabel="Date"
                data={chartData.budgetSpending}
                color="#8b5cf6"
              />
            </div>
          </div>
        </div>

        {/* Charts Grid - Row 2: Multi-Line Comparison */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Project Progress Comparison</h2>
            <ExportButton 
              data={chartData.projectComparison}
              filename="project-comparison"
              title="Multi-Project Progress"
            />
          </div>
          <MultiLineChart
            data={chartData.projectComparison}
            title="Real-time Progress Tracking"
            dataKeys={['Office Complex', 'Residential Tower', 'Shopping Mall']}
            xAxisKey="date"
          />
        </div>

        {/* Charts Grid - Row 3: Financial Analysis */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Financial Analysis</h2>
            <ExportButton 
              data={chartData.financialData}
              filename="financial-analysis"
              title="Revenue & Expenses Report"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Bar Chart */}
            <AdvancedBarChart
              data={chartData.financialData}
              title="Monthly Revenue vs Expenses"
              dataKey="revenue"
              xAxisKey="month"
              color="#28A3A3"
            />

            {/* Project Distribution Pie Chart */}
            <AdvancedPieChart
              data={chartData.projectDistribution}
              title="Project Type Distribution"
              dataKey="value"
              nameKey="name"
            />
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getUpdateIcon(update.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{update.message}</p>
                  <p className="text-xs text-muted-foreground">{update.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`w-2 h-2 rounded-full ${
                    update.status === 'success' ? 'bg-green-500' :
                    update.status === 'warning' ? 'bg-yellow-500' :
                    update.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveGraphs;