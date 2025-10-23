import { Bell, ChevronDown, LogOut, CheckCircle, AlertTriangle, Info, Clock, X, Menu } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Onboarding } from "./Onboarding";
import { HelpSystem } from "./HelpSystem";
import { UserFriendlyNotifications } from "./UserFriendlyNotifications";
import { MobileOptimized } from "./MobileOptimized";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'pending';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, organization, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Work Order Approved',
      message: 'Work Order #WO-001 has been approved successfully',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Sand inventory is running low. Current stock: 15%',
      time: '15 min ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Document Uploaded',
      message: 'Project blueprint v2.3 has been uploaded to Documents',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'pending',
      title: 'Pending Approval',
      message: 'You have 5 new items awaiting your approval',
      time: '2 hours ago',
      read: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Processed',
      message: 'Payment of $25,000 has been successfully processed',
      time: '3 hours ago',
      read: true
    }
  ]);

  // Authentication is handled by RoleBasedRoute, so we don't need to check here

  const userName = user.name || user.email.split("@")[0];
  const userRole = user.role;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Modern Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-sidebar border-r border-sidebar-border flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        {/* Modern Logo Section */}
        <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-sidebar-background to-sidebar-accent/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-border/20 p-2">
                <img 
                  src="/ids-logo.png" 
                  alt="INVENTOR Design Studio Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text logo if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex items-center gap-1 text-black font-bold text-sm">
                  <div className="relative">
                    <span>i</span>
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  </div>
                  <span>d</span>
                  <span className="text-gray-600">s</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground bg-gradient-to-r from-sidebar-foreground to-primary bg-clip-text text-transparent">
                  INVENTOR Design Studio
                </h1>
                <p className="text-xs text-muted-foreground">Software Development House</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">Online</span>
                </div>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        {/* Modern Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {/* Dashboard Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Overview
            </h3>
            <div className="space-y-1">
              <NavItem icon="dashboard" label="Home" href="/" />
              <NavItem icon="dashboard" label="Analytics" href="/dashboard1" />
              <NavItem icon="dashboard" label="Enhanced Dashboard" href="/enhanced-dashboard" />
            </div>
          </div>

          {/* Project Management Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Projects
            </h3>
            <div className="space-y-1">
              <NavItem icon="projects" label="All Projects" href="/projects" />
              <NavItem icon="site" label="Client Work" href="/sites" />
              <NavItem icon="work-order" label="Work Orders" href="/work-order" />
              <NavItem icon="approved-work" label="Completed Work" href="/approved-work-order" />
              <NavItem icon="planning" label="Planning" href="/planning" />
            </div>
          </div>

          {/* Team & Collaboration Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Team
            </h3>
            <div className="space-y-1">
              <NavItem icon="users" label="Our Team" href="/staff" />
              <NavItem icon="user-overview" label="Team Overview" href="/user-overview" />
              <NavItem icon="performance" label="How We're Doing" href="/users-performance" />
              <NavItem icon="inbox" label="My Tasks" href="/my-pending-actions" />
              <NavItem icon="users" label="User Management" href="/user-management" />
            </div>
          </div>

          {/* Quality & Approvals Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Reviews & Approvals
            </h3>
            <div className="space-y-1">
              <NavItem icon="approvals" label="Review Process" href="/approvals-flow" />
              <NavItem icon="inspection" label="Inspection Requests" href="/inspection-requests" />
              <NavItem icon="ir-approvals" label="IR Approvals" href="/ir-approvals" />
              <NavItem icon="ipc" label="IPCs" href="/ipcs" />
              <NavItem icon="ipc-approvals" label="IPC Approvals" href="/ipc-approvals" />
            </div>
          </div>

          {/* Business & Bidding Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Business
            </h3>
            <div className="space-y-1">
              <NavItem icon="bids" label="Bids" href="/bids" />
              <NavItem icon="proposal" label="Proposals" href="/bid-proposal" />
              <NavItem icon="proposal-approvals" label="Proposal Reviews" href="/bid-proposal-approvals" />
            </div>
          </div>

          {/* Resources & Assets Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Resources
            </h3>
            <div className="space-y-1">
              <NavItem icon="documents" label="Documents" href="/documents" />
              <NavItem icon="drawing" label="Drawings" href="/drawing-management" />
              <NavItem icon="materials" label="Materials" href="/materials-section" />
              <NavItem icon="assets" label="Assets" href="/assets-management" />
              <NavItem icon="inventory" label="Inventory" href="/inventory-dashboard" />
            </div>
          </div>

          {/* Analytics & Reports Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Analytics
            </h3>
            <div className="space-y-1">
              <NavItem icon="graph" label="Live Data" href="/live-graphs" />
              <NavItem icon="reports" label="Reports" href="/reports" />
              <NavItem icon="query" label="Data Explorer" href="/query-dashboard" />
            </div>
          </div>

          {/* Safety & Compliance Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Safety
            </h3>
            <div className="space-y-1">
              <NavItem icon="hse" label="HSE Environment" href="/hse-environment" />
              <NavItem icon="lab-tests" label="Lab Tests" href="/lab-tests" />
            </div>
          </div>

          {/* Enterprise Features Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Enterprise
            </h3>
            <div className="space-y-1">
              <NavItem icon="building" label="Organizations" href="/organization-management" />
              <NavItem icon="users" label="Real-time Collaboration" href="/real-time-collaboration" />
              <NavItem icon="bell" label="Advanced Notifications" href="/advanced-notifications" />
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Settings
            </h3>
            <div className="space-y-1">
              <NavItem icon="settings" label="Settings" href="/settings" />
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            
            <h2 className="text-lg lg:text-2xl font-semibold text-foreground">INVENTOR Design Studio</h2>
            <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">•</span>
              <span>Software Development House</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            {/* User-Friendly Notifications */}
            <UserFriendlyNotifications />
            
            {/* Help System */}
            <HelpSystem />
            
            {/* User Menu */}
            <div className="relative">
              <div 
                className="user-menu-button flex items-center gap-2 lg:gap-3 cursor-pointer hover:bg-muted rounded-lg px-2 lg:px-4 py-2 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs lg:text-sm font-medium text-primary-foreground">{userName.substring(0, 2)}</span>
                </div>
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-foreground">{userName}</span>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="user-menu-dropdown absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <Link
                      to="/user-profile"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6" />
                        <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24" />
                        <path d="M1 12h6m6 0h6" />
                        <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24" />
                      </svg>
                      Settings
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Onboarding */}
      {showOnboarding && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Mobile Optimization */}
      <MobileOptimized />
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  href?: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active }: NavItemProps) => {
  const location = useLocation();
  const isActive = active || (href && location.pathname === href);

  const content = (
    <>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
        isActive 
          ? "bg-primary text-primary-foreground shadow-lg" 
          : "bg-sidebar-accent/30 text-sidebar-foreground group-hover:bg-primary/20 group-hover:text-primary"
      }`}>
        <NavIcon type={icon} />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium transition-colors ${
          isActive 
            ? "text-primary" 
            : "text-sidebar-foreground group-hover:text-primary"
        }`}>
          {label}
        </span>
      </div>
      {isActive && (
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-sidebar-accent/50 border border-primary/20 shadow-lg"
            : "hover:bg-sidebar-accent/30 hover:border-border/50 border border-transparent"
        }`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-sidebar-accent/50 border border-primary/20 shadow-lg"
          : "hover:bg-sidebar-accent/30 hover:border-border/50 border border-transparent"
      }`}
    >
      {content}
    </button>
  );
};

const NavIcon = ({ type }: { type: string }) => {
  const iconClass = "w-5 h-5 text-sidebar-foreground";
  
  switch (type) {
    case "dashboard":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "inbox":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "inventory":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "graph":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "user-overview":
    case "users":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "performance":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case "approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "site":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "documents":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "projects":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "items":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "drawing":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "bids":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "proposal":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      );
    case "proposal-approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <polyline points="9 11 12 14 16 10" />
        </svg>
      );
    case "work-order":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      );
    case "approved-work":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      );
    case "planning":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "inspection":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      );
    case "ir-approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <polyline points="9 11 11 13 14 10" />
        </svg>
      );
    case "ipc":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case "ipc-approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "hse":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "materials":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case "assets":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M12 7V3" />
          <path d="M8 3h8" />
          <path d="M7 12h10" />
          <path d="M7 16h10" />
        </svg>
      );
    case "lab-tests":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3h6l-.6 10.8c0 1.6-1.4 2.9-3 2.9H10c-1.7 0-3-1.3-3-2.9L6.4 3" />
          <path d="M6.5 3C5.7 3 5 3.7 5 4.5S5.7 6 6.5 6h11c.8 0 1.5-.7 1.5-1.5S18.3 3 17.5 3" />
          <path d="M9 17v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4" />
        </svg>
      );
    case "reports":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13h2" />
          <path d="M8 17h8" />
          <path d="M14 13h2" />
        </svg>
      );
    case "query":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      );
    case "settings":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "building":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
          <path d="M10 18h4" />
        </svg>
      );
    case "bell":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    default:
      return null;
  }
};
