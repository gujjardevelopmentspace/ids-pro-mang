import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/dashboard1" element={<ProtectedRoute><Dashboard1 /></ProtectedRoute>} />
          <Route path="/my-pending-actions" element={<ProtectedRoute><MyPendingActions /></ProtectedRoute>} />
          <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/inventory-dashboard" element={<ProtectedRoute><InventoryDashboard /></ProtectedRoute>} />
          <Route path="/live-graphs" element={<ProtectedRoute><LiveGraphs /></ProtectedRoute>} />
          <Route path="/user-overview" element={<ProtectedRoute><UserOverview /></ProtectedRoute>} />
          <Route path="/users-performance" element={<ProtectedRoute><UsersPerformance /></ProtectedRoute>} />
          <Route path="/approvals-flow" element={<ProtectedRoute><ApprovalsFlow /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/sites" element={<ProtectedRoute><Sites /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/query-dashboard" element={<ProtectedRoute><QueryDashboard /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/lab-tests" element={<ProtectedRoute><LabTests /></ProtectedRoute>} />
          <Route path="/assets-management" element={<ProtectedRoute><AssetsManagement /></ProtectedRoute>} />
          <Route path="/hse-environment" element={<ProtectedRoute><HSEEnvironment /></ProtectedRoute>} />
          <Route path="/materials-section" element={<ProtectedRoute><MaterialsSection /></ProtectedRoute>} />
          <Route path="/ipc-approvals" element={<ProtectedRoute><IPCApprovals /></ProtectedRoute>} />
          <Route path="/ipcs" element={<ProtectedRoute><IPCs /></ProtectedRoute>} />
          <Route path="/ir-approvals" element={<ProtectedRoute><IRApprovals /></ProtectedRoute>} />
          <Route path="/inspection-requests" element={<ProtectedRoute><InspectionRequests /></ProtectedRoute>} />
          <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
          <Route path="/approved-work-order" element={<ProtectedRoute><ApprovedWorkOrder /></ProtectedRoute>} />
          <Route path="/work-order" element={<ProtectedRoute><WorkOrder /></ProtectedRoute>} />
          <Route path="/bid-proposal-approvals" element={<ProtectedRoute><BidProposalApprovals /></ProtectedRoute>} />
          <Route path="/bids" element={<ProtectedRoute><Bids /></ProtectedRoute>} />
          <Route path="/drawing-management" element={<ProtectedRoute><DrawingManagement /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="/bid-proposal" element={<ProtectedRoute><BidProposal /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
