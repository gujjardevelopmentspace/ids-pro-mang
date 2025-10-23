import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'neon';
  hover?: boolean;
  interactive?: boolean;
  glow?: boolean;
}

export const ModernCard = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true,
  interactive = false,
  glow = false
}: ModernCardProps) => {
  const baseClasses = "relative rounded-2xl transition-all duration-300 ease-out";
  
  const variantClasses = {
    default: "bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl",
    gradient: "bg-gradient-to-br from-card via-card/80 to-muted/20 border border-border/30 shadow-xl",
    neon: "bg-card border border-primary/20 shadow-lg shadow-primary/10"
  };

  const hoverClasses = hover ? "hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30" : "";
  const interactiveClasses = interactive ? "cursor-pointer active:scale-[0.98]" : "";
  const glowClasses = glow ? "shadow-lg shadow-primary/20" : "";

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        interactiveClasses,
        glowClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

interface ModernButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const ModernButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  loading = false
}: ModernButtonProps) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    ghost: "hover:bg-muted focus:ring-primary",
    gradient: "bg-gradient-to-r from-primary via-primary to-ids-cyan text-white hover:from-primary/90 hover:to-ids-cyan/90 focus:ring-primary shadow-lg hover:shadow-xl",
    neon: "bg-primary text-primary-foreground border border-primary/50 shadow-lg shadow-primary/25 hover:shadow-primary/40 focus:ring-primary"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {loading && (
        <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
      )}
      
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

interface ModernMetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: ReactNode;
  color: string;
  bgColor: string;
  className?: string;
}

export const ModernMetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color, 
  bgColor,
  className 
}: ModernMetricCardProps) => {
  return (
    <ModernCard 
      variant="gradient" 
      hover 
      interactive
      glow
      className={`p-6 border-2 border-transparent hover:border-primary/20 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center border-2 border-current/20 shadow-lg`}>
          <span className={color}>
            {icon}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {trend === 'up' ? (
            <span className="text-green-500 text-sm">↗</span>
          ) : (
            <span className="text-red-500 text-sm">↘</span>
          )}
          <span className={`text-sm font-bold ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-foreground mb-2">
          {value}
        </h3>
        <p className="text-muted-foreground font-medium">
          {title}
        </p>
      </div>
    </ModernCard>
  );
};
