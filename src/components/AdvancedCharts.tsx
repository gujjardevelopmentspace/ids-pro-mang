import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Color palette matching the theme
const COLORS = {
  primary: '#28A3A3',
  green: '#10b981',
  blue: '#3b82f6',
  yellow: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316',
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.green,
  COLORS.blue,
  COLORS.yellow,
  COLORS.purple,
  COLORS.pink,
];

interface ChartData {
  [key: string]: string | number;
}

interface AdvancedBarChartProps {
  data: ChartData[];
  title: string;
  dataKey: string;
  xAxisKey: string;
  color?: string;
}

export const AdvancedBarChart = ({ 
  data, 
  title, 
  dataKey, 
  xAxisKey,
  color = COLORS.primary 
}: AdvancedBarChartProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#243D3D" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D2626',
              border: '1px solid #243D3D',
              borderRadius: '8px',
              color: '#F2F2F2',
            }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface AdvancedPieChartProps {
  data: ChartData[];
  title: string;
  dataKey: string;
  nameKey: string;
}

export const AdvancedPieChart = ({ 
  data, 
  title, 
  dataKey, 
  nameKey 
}: AdvancedPieChartProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D2626',
              border: '1px solid #243D3D',
              borderRadius: '8px',
              color: '#F2F2F2',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface RadarChartData {
  subject: string;
  [key: string]: string | number;
}

interface AdvancedRadarChartProps {
  data: RadarChartData[];
  title: string;
  dataKeys: string[];
}

export const AdvancedRadarChart = ({ 
  data, 
  title, 
  dataKeys 
}: AdvancedRadarChartProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#243D3D" />
          <PolarAngleAxis 
            dataKey="subject" 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <PolarRadiusAxis 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          {dataKeys.map((key, index) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D2626',
              border: '1px solid #243D3D',
              borderRadius: '8px',
              color: '#F2F2F2',
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface AdvancedAreaChartProps {
  data: ChartData[];
  title: string;
  dataKeys: string[];
  xAxisKey: string;
}

export const AdvancedAreaChart = ({ 
  data, 
  title, 
  dataKeys, 
  xAxisKey 
}: AdvancedAreaChartProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#243D3D" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D2626',
              border: '1px solid #243D3D',
              borderRadius: '8px',
              color: '#F2F2F2',
            }}
          />
          <Legend />
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface MultiLineChartProps {
  data: ChartData[];
  title: string;
  dataKeys: string[];
  xAxisKey: string;
}

export const MultiLineChart = ({ 
  data, 
  title, 
  dataKeys, 
  xAxisKey 
}: MultiLineChartProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#243D3D" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9BA8A8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D2626',
              border: '1px solid #243D3D',
              borderRadius: '8px',
              color: '#F2F2F2',
            }}
          />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS[index % CHART_COLORS.length], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Example usage component
export const AnalyticsDashboard = () => {
  // Sample data
  const barData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
  ];

  const pieData = [
    { name: 'Construction', value: 8 },
    { name: 'Infrastructure', value: 5 },
    { name: 'Residential', value: 3 },
    { name: 'Commercial', value: 4 },
  ];

  const radarData = [
    { subject: 'Planning', A: 120, B: 110 },
    { subject: 'Execution', A: 98, B: 130 },
    { subject: 'Quality', A: 86, B: 130 },
    { subject: 'Safety', A: 99, B: 100 },
    { subject: 'Budget', A: 85, B: 90 },
    { subject: 'Timeline', A: 65, B: 85 },
  ];

  const areaData = [
    { date: 'Week 1', approved: 4000, pending: 2400, rejected: 500 },
    { date: 'Week 2', approved: 3000, pending: 1398, rejected: 200 },
    { date: 'Week 3', approved: 2000, pending: 9800, rejected: 1200 },
    { date: 'Week 4', approved: 2780, pending: 3908, rejected: 800 },
  ];

  const lineData = [
    { month: 'Jan', projectA: 4000, projectB: 2400, projectC: 2400 },
    { month: 'Feb', projectA: 3000, projectB: 1398, projectC: 2210 },
    { month: 'Mar', projectA: 2000, projectB: 9800, projectC: 2290 },
    { month: 'Apr', projectA: 2780, projectB: 3908, projectC: 2000 },
    { month: 'May', projectA: 1890, projectB: 4800, projectC: 2181 },
    { month: 'Jun', projectA: 2390, projectB: 3800, projectC: 2500 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdvancedBarChart
          data={barData}
          title="Monthly Revenue vs Expenses"
          dataKey="revenue"
          xAxisKey="month"
        />
        <AdvancedPieChart
          data={pieData}
          title="Projects by Type"
          dataKey="value"
          nameKey="name"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdvancedRadarChart
          data={radarData}
          title="Project Performance Metrics"
          dataKeys={['A', 'B']}
        />
        <AdvancedAreaChart
          data={areaData}
          title="Work Order Status (Stacked)"
          dataKeys={['approved', 'pending', 'rejected']}
          xAxisKey="date"
        />
      </div>

      <MultiLineChart
        data={lineData}
        title="Project Progress Comparison"
        dataKeys={['projectA', 'projectB', 'projectC']}
        xAxisKey="month"
      />
    </div>
  );
};

