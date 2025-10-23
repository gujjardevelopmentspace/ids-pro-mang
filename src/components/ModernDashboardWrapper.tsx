import { ReactNode } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { ModernCard } from './ModernEnhancements';

interface ModernDashboardWrapperProps {
  children: ReactNode;
}

export const ModernDashboardWrapper = ({ children }: ModernDashboardWrapperProps) => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-ids-cyan/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-ids-cyan/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Content with enhanced styling */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
};
