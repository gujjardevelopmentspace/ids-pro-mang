import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ModernCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}

export const ModernCard = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  className = "",
  gradient = false,
  hover = true
}: ModernCardProps) => {
  return (
    <div className={`
      bg-card rounded-2xl p-6 shadow-card border border-border/50
      ${hover ? 'hover:shadow-xl hover:border-primary/20' : ''}
      transition-all duration-300
      ${gradient ? 'bg-gradient-to-br from-card to-card/80' : ''}
      ${className}
    `}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

interface ModernMetricProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const ModernMetric = ({ 
  value, 
  label, 
  icon: Icon, 
  color = "primary",
  trend,
  trendValue
}: ModernMetricProps) => {
  const colorClasses = {
    primary: "text-primary bg-primary/20",
    success: "text-green-500 bg-green-500/20",
    warning: "text-yellow-500 bg-yellow-500/20",
    danger: "text-red-500 bg-red-500/20",
    info: "text-blue-500 bg-blue-500/20"
  };

  const trendClasses = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground"
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-200 border border-border/50">
      <div className="flex items-center justify-between mb-3">
        {Icon && (
          <div className={`w-10 h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trendClasses[trend]}`}>
            <span>{trendValue}</span>
            {trend === "up" && <span>↗</span>}
            {trend === "down" && <span>↘</span>}
            {trend === "neutral" && <span>→</span>}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

interface ModernButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ModernButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  icon: Icon,
  className = "",
  onClick,
  disabled = false
}: ModernButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    outline: "border border-border text-foreground hover:bg-muted focus:ring-primary",
    ghost: "text-foreground hover:bg-muted focus:ring-primary"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
