import { DashboardLayout } from "@/components/DashboardLayout";
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
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, CheckCircle, AlertTriangle, BarChart3, PieChart, Activity, RefreshCw } from "lucide-react";

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
    { id: 1, type: 'work-order', message: 'Work Order #WO-001 approved', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'inspection', message: 'Inspection Request #IR-002 submitted', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'payment', message: 'Payment of $25,000 processed', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'approval', message: 'Budget approval pending for Project Alpha', time: '8 hours ago', status: 'warning' },
    { id: 5, type: 'milestone', message: 'Project Beta reached 75% completion', time: '1 day ago', status: 'success' }
  ]);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWorkOrderData(prev => ({
        totalAmount: prev.totalAmount + Math.floor(Math.random() * 10000),
        approvedAmount: prev.approvedAmount + Math.floor(Math.random() * 5000),
        underProcessAmount: prev.underProcessAmount + Math.floor(Math.random() * 3000)
      }));
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Simulate real-time updates with realistic patterns
    const interval = setInterval(() => {
      // Only update the most recent data point
      setChartData(prev => {
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        const dayOfWeek = new Date(newData[lastIndex].date).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const increment = isWeekend ? 
          Math.floor(Math.random() * 3) : 
          Math.floor(Math.random() * 5) + 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          value: newData[lastIndex].value + increment
        };
        return newData;
      });

      // Update payment data realistically
      setCheckRequestData(prev => {
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        const dayOfWeek = new Date(newData[lastIndex].date).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const increment = isWeekend ? 0 : Math.floor(Math.random() * 15000) + 5000;
        newData[lastIndex] = {
          ...newData[lastIndex],
          value: newData[lastIndex].value + increment
        };
        return newData;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-12">
        {/* Header with Refresh Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Real-time project monitoring and analytics</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Work Order - All Over */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            WORK ORDER <span className="font-normal text-muted-foreground text-sm sm:text-base">(ALL OVER)</span>
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
            INSPECTION REQUESTS <span className="font-normal text-muted-foreground text-sm sm:text-base">(ALL OVER)</span>
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
            WORK ORDER <span className="font-normal text-muted-foreground text-sm sm:text-base">(OCTOBER 2025)</span>
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
            CHARTS & ANALYTICS
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

        {/* Recent Activities */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            RECENT ACTIVITIES
          </h2>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {activity.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {activity.status === 'info' && <Activity className="w-4 h-4 text-blue-500" />}
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
    </DashboardLayout>
  );
};

export default Index;
