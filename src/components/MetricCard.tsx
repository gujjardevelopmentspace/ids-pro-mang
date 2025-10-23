import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color: "cyan" | "green" | "coral";
}

export const MetricCard = ({ icon, value, label, color }: MetricCardProps) => {
  const colorClasses = {
    cyan: "text-metric-cyan",
    green: "text-metric-green",
    coral: "text-metric-coral",
  };

  return (
    <div className="bg-gradient-to-br from-card via-card/80 to-muted/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/30 cursor-pointer group hover:scale-[1.02] hover:border-primary/20">
      <div className="flex items-center gap-4">
        <div className={`${colorClasses[color]} shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-current/10 to-current/20 group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
export const PieChartIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M24 6 L24 24 L38 16 Z" fill="currentColor" opacity="0.7" />
  </svg>
);

export const TrendUpIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="6 32, 16 22, 26 28, 42 12" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="32 12, 42 12, 42 22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BarsIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="currentColor">
    <rect x="8" y="20" width="8" height="20" rx="2" opacity="0.7" />
    <rect x="20" y="12" width="8" height="28" rx="2" opacity="0.5" />
    <rect x="32" y="26" width="8" height="14" rx="2" opacity="0.8" />
  </svg>
);

export const CalendarPlusIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="8" y="10" width="32" height="30" rx="3" />
    <line x1="8" y1="18" x2="40" y2="18" />
    <line x1="16" y1="6" x2="16" y2="14" strokeLinecap="round" />
    <line x1="32" y1="6" x2="32" y2="14" strokeLinecap="round" />
    <line x1="24" y1="24" x2="24" y2="34" strokeLinecap="round" />
    <line x1="19" y1="29" x2="29" y2="29" strokeLinecap="round" />
  </svg>
);

export const CalendarCheckIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="8" y="10" width="32" height="30" rx="3" />
    <line x1="8" y1="18" x2="40" y2="18" />
    <line x1="16" y1="6" x2="16" y2="14" strokeLinecap="round" />
    <line x1="32" y1="6" x2="32" y2="14" strokeLinecap="round" />
    <polyline points="18 29, 22 33, 30 25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarMinusIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="8" y="10" width="32" height="30" rx="3" />
    <line x1="8" y1="18" x2="40" y2="18" />
    <line x1="16" y1="6" x2="16" y2="14" strokeLinecap="round" />
    <line x1="32" y1="6" x2="32" y2="14" strokeLinecap="round" />
    <line x1="19" y1="29" x2="29" y2="29" strokeLinecap="round" />
  </svg>
);
