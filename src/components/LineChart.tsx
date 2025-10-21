import { ReactNode } from "react";

interface LineChartProps {
  title: string;
  subtitle?: string;
  yAxisLabel: string;
  xAxisLabel: string;
  data: Array<{ date: string; value: number }>;
  color?: string;
}

export const LineChart = ({ 
  title, 
  subtitle, 
  yAxisLabel, 
  xAxisLabel, 
  data, 
  color = "#ff6b35" 
}: LineChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value), 0);
  const range = maxValue - minValue;
  
  const getYPosition = (value: number) => {
    if (range === 0) return 50; // Center if all values are the same
    return 100 - ((value - minValue) / range) * 80; // 80% of height for data area
  };

  const getXPosition = (index: number) => {
    return (index / (data.length - 1)) * 80 + 10; // 80% width, 10% margin
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        )}
      </div>
      
      <div className="relative h-72 mb-8">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between">
          <div className="text-xs text-muted-foreground transform -rotate-90 origin-center whitespace-nowrap">
            {yAxisLabel}
          </div>
          <div className="text-xs text-muted-foreground transform -rotate-90 origin-center whitespace-nowrap">
            {yAxisLabel}
          </div>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 mr-4 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            <div className="h-full w-full relative">
              {/* Horizontal grid line at 1 */}
              <div 
                className="absolute w-full border-t border-dashed border-gray-300"
                style={{ top: `${getYPosition(1)}%` }}
              />
            </div>
          </div>
          
          {/* Data line */}
          <svg className="absolute inset-0 w-full h-full">
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="2"
              points={data.map((d, i) => 
                `${getXPosition(i)},${getYPosition(d.value)}`
              ).join(' ')}
            />
            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={getXPosition(i)}
                cy={getYPosition(d.value)}
                r="4"
                fill={color}
              />
            ))}
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="ml-8 mr-4 mt-4 flex justify-between items-end h-12">
          {data.map((d, i) => {
            // Show only every nth label to prevent overlap
            const showLabel = data.length <= 7 || i % Math.ceil(data.length / 7) === 0 || i === data.length - 1;
            
            if (!showLabel) return <div key={i} className="text-xs w-0" />;
            
            // Format date for better readability
            const dateObj = new Date(d.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            });
            
            return (
              <div 
                key={i} 
                className="text-[10px] text-muted-foreground whitespace-nowrap"
                style={{
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'top left',
                  marginLeft: i === 0 ? '0' : '-8px'
                }}
              >
                {formattedDate}
              </div>
            );
          })}
        </div>
        
        {/* X-axis label */}
        <div className="text-center mt-6">
          <span className="text-xs text-muted-foreground font-medium">{xAxisLabel}</span>
        </div>
      </div>
    </div>
  );
};
