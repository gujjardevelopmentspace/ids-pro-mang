import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import { RoleBasedRoute } from "./components/RoleBasedRoute";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { Permission, UserRole } from "./types/auth";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard1 from "./pages/Dashboard1";
import MyPendingActions from "./pages/MyPendingActions";
import UserProfile from "./pages/UserProfile";
import InventoryDashboard from "./pages/InventoryDashboard";
import LiveGraphs from "./pages/LiveGraphs";
import UserOverview from "./pages/UserOverview";
import UsersPerformance from "./pages/UsersPerformance";
import ApprovalsFlow from "./pages/ApprovalsFlow";
import Staff from "./pages/Staff";
import Sites from "./pages/Sites";
import Documents from "./pages/Documents";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import QueryDashboard from "./pages/QueryDashboard";
import Reports from "./pages/Reports";
import LabTests from "./pages/LabTests";
import AssetsManagement from "./pages/AssetsManagement";
import HSEEnvironment from "./pages/HSEEnvironment";
import MaterialsSection from "./pages/MaterialsSection";
import IPCApprovals from "./pages/IPCApprovals";
import IPCs from "./pages/IPCs";
import IRApprovals from "./pages/IRApprovals";
import InspectionRequests from "./pages/InspectionRequests";
import Planning from "./pages/Planning";
import ApprovedWorkOrder from "./pages/ApprovedWorkOrder";
import WorkOrder from "./pages/WorkOrder";
import BidProposalApprovals from "./pages/BidProposalApprovals";
import Bids from "./pages/Bids";
import DrawingManagement from "./pages/DrawingManagement";
import Items from "./pages/Items";
import BidProposal from "./pages/BidProposal";
import UserManagement from "./pages/UserManagement";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import OrganizationManagement from "./pages/OrganizationManagement";
import RealTimeCollaboration from "./components/RealTimeCollaboration";
import AdvancedNotificationSystem from "./components/AdvancedNotificationSystem";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TenantProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PWAInstallPrompt />
            <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with Role-Based Access */}
            <Route path="/" element={<RoleBasedRoute><Index /></RoleBasedRoute>} />
            <Route path="/dashboard1" element={<RoleBasedRoute><Dashboard1 /></RoleBasedRoute>} />
            <Route path="/enhanced-dashboard" element={<RoleBasedRoute><EnhancedDashboard /></RoleBasedRoute>} />
            <Route path="/user-management" element={<RoleBasedRoute requiredPermissions={[Permission.MANAGE_USERS]}><UserManagement /></RoleBasedRoute>} />
            <Route path="/my-pending-actions" element={<RoleBasedRoute><MyPendingActions /></RoleBasedRoute>} />
            <Route path="/user-profile" element={<RoleBasedRoute><UserProfile /></RoleBasedRoute>} />
            <Route path="/inventory-dashboard" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_INVENTORY]}><InventoryDashboard /></RoleBasedRoute>} />
            <Route path="/live-graphs" element={<RoleBasedRoute><LiveGraphs /></RoleBasedRoute>} />
            <Route path="/user-overview" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_USERS]}><UserOverview /></RoleBasedRoute>} />
            <Route path="/users-performance" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_USERS]}><UsersPerformance /></RoleBasedRoute>} />
            <Route path="/approvals-flow" element={<RoleBasedRoute requiredPermissions={[Permission.APPROVE_WORK_ORDERS]}><ApprovalsFlow /></RoleBasedRoute>} />
            <Route path="/staff" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_USERS]}><Staff /></RoleBasedRoute>} />
            <Route path="/sites" element={<RoleBasedRoute><Sites /></RoleBasedRoute>} />
            <Route path="/documents" element={<RoleBasedRoute><Documents /></RoleBasedRoute>} />
            <Route path="/projects" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_PROJECTS]}><Projects /></RoleBasedRoute>} />
            <Route path="/settings" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_SETTINGS]}><Settings /></RoleBasedRoute>} />
            <Route path="/query-dashboard" element={<RoleBasedRoute><QueryDashboard /></RoleBasedRoute>} />
            <Route path="/reports" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_REPORTS]}><Reports /></RoleBasedRoute>} />
            <Route path="/lab-tests" element={<RoleBasedRoute><LabTests /></RoleBasedRoute>} />
            <Route path="/assets-management" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_INVENTORY]}><AssetsManagement /></RoleBasedRoute>} />
            <Route path="/hse-environment" element={<RoleBasedRoute><HSEEnvironment /></RoleBasedRoute>} />
            <Route path="/materials-section" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_INVENTORY]}><MaterialsSection /></RoleBasedRoute>} />
            <Route path="/ipc-approvals" element={<RoleBasedRoute requiredPermissions={[Permission.APPROVE_PURCHASES]}><IPCApprovals /></RoleBasedRoute>} />
            <Route path="/ipcs" element={<RoleBasedRoute><IPCs /></RoleBasedRoute>} />
            <Route path="/ir-approvals" element={<RoleBasedRoute requiredPermissions={[Permission.APPROVE_WORK_ORDERS]}><IRApprovals /></RoleBasedRoute>} />
            <Route path="/inspection-requests" element={<RoleBasedRoute><InspectionRequests /></RoleBasedRoute>} />
            <Route path="/planning" element={<RoleBasedRoute><Planning /></RoleBasedRoute>} />
            <Route path="/approved-work-order" element={<RoleBasedRoute><ApprovedWorkOrder /></RoleBasedRoute>} />
            <Route path="/work-order" element={<RoleBasedRoute><WorkOrder /></RoleBasedRoute>} />
            <Route path="/bid-proposal-approvals" element={<RoleBasedRoute requiredPermissions={[Permission.APPROVE_BIDS]}><BidProposalApprovals /></RoleBasedRoute>} />
            <Route path="/bids" element={<RoleBasedRoute><Bids /></RoleBasedRoute>} />
            <Route path="/drawing-management" element={<RoleBasedRoute><DrawingManagement /></RoleBasedRoute>} />
            <Route path="/items" element={<RoleBasedRoute requiredPermissions={[Permission.VIEW_INVENTORY]}><Items /></RoleBasedRoute>} />
            <Route path="/bid-proposal" element={<RoleBasedRoute><BidProposal /></RoleBasedRoute>} />
            
            {/* Enterprise & Multi-User Features */}
            <Route path="/organization-management" element={<RoleBasedRoute requiredPermissions={[Permission.MANAGE_USERS]}><OrganizationManagement /></RoleBasedRoute>} />
            <Route path="/real-time-collaboration" element={<RoleBasedRoute><RealTimeCollaboration /></RoleBasedRoute>} />
            <Route path="/advanced-notifications" element={<RoleBasedRoute><AdvancedNotificationSystem /></RoleBasedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
          </TooltipProvider>
        </TenantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
