import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, RefreshCw, Download, Upload, ArrowRight, ArrowDown, Users, Calendar, Shield, Target, Zap, Crown } from "lucide-react";

const ApprovalsFlow = () => {
  const [approvalFlows, setApprovalFlows] = useState([
    {
      id: 1,
      name: "Budget Approval",
      steps: 4,
      actions: ["Submit", "Review", "Approve", "Finalize"],
      status: "Active",
      description: "Multi-level budget approval process for project expenses",
      createdBy: "AHSAN UL HAQ",
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
      totalApprovals: 45,
      pendingApprovals: 8,
      completedApprovals: 37,
      averageTime: "2.5 days",
      successRate: 92
    },
    {
      id: 2,
      name: "Purchase Order Approval",
      steps: 3,
      actions: ["Request", "Verify", "Approve"],
      status: "Active",
      description: "Standard purchase order approval workflow",
      createdBy: "John Smith",
      createdAt: "2024-01-10",
      lastModified: "2024-01-18",
      totalApprovals: 32,
      pendingApprovals: 5,
      completedApprovals: 27,
      averageTime: "1.8 days",
      successRate: 88
    },
    {
      id: 3,
      name: "Work Order Approval",
      steps: 5,
      actions: ["Submit", "Technical Review", "Safety Check", "Manager Approval", "Final Approval"],
      status: "Active",
      description: "Comprehensive work order approval with safety checks",
      createdBy: "Sarah Johnson",
      createdAt: "2024-01-08",
      lastModified: "2024-01-22",
      totalApprovals: 28,
      pendingApprovals: 12,
      completedApprovals: 16,
      averageTime: "4.2 days",
      successRate: 85
    },
    {
      id: 4,
      name: "Contract Approval",
      steps: 6,
      actions: ["Draft", "Legal Review", "Finance Review", "Management Review", "Board Approval", "Execution"],
      status: "Draft",
      description: "Complex contract approval process with multiple stakeholders",
      createdBy: "Mike Davis",
      createdAt: "2024-01-12",
      lastModified: "2024-01-19",
      totalApprovals: 0,
      pendingApprovals: 0,
      completedApprovals: 0,
      averageTime: "0 days",
      successRate: 0
    },
    {
      id: 5,
      name: "Material Request Approval",
      steps: 3,
      actions: ["Request", "Inventory Check", "Approve"],
      status: "Inactive",
      description: "Quick material request approval process",
      createdBy: "Lisa Wilson",
      createdAt: "2024-01-05",
      lastModified: "2024-01-15",
      totalApprovals: 15,
      pendingApprovals: 0,
      completedApprovals: 15,
      averageTime: "0.8 days",
      successRate: 100
    }
  ]);

  const [filteredFlows, setFilteredFlows] = useState(approvalFlows);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSteps, setFilterSteps] = useState("all");
  const [selectedFlows, setSelectedFlows] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddFlow, setShowAddFlow] = useState(false);
  const [newFlow, setNewFlow] = useState({
    name: "",
    description: "",
    steps: "",
    actions: [""]
  });

  const [flowAnalytics, setFlowAnalytics] = useState({
    totalFlows: 0,
    activeFlows: 0,
    totalApprovals: 0,
    pendingApprovals: 0,
    averageSuccessRate: 0,
    averageProcessingTime: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'approval', message: 'Budget Approval flow completed for Project Alpha', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'workflow', message: 'New Work Order Approval flow created', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'pending', message: 'Purchase Order Approval pending for 3 days', time: '6 hours ago', status: 'warning' },
    { id: 4, type: 'rejection', message: 'Contract Approval rejected at Legal Review stage', time: '8 hours ago', status: 'error' },
    { id: 5, type: 'completion', message: 'Material Request Approval completed successfully', time: '1 day ago', status: 'success' }
  ]);

  const handleAddFlow = (e: React.FormEvent) => {
    e.preventDefault();
    const flow = {
      id: approvalFlows.length + 1,
      name: newFlow.name,
      steps: parseInt(newFlow.steps),
      actions: newFlow.actions.filter(action => action.trim() !== ""),
      status: "Draft",
      description: newFlow.description,
      createdBy: "AHSAN UL HAQ",
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      totalApprovals: 0,
      pendingApprovals: 0,
      completedApprovals: 0,
      averageTime: "0 days",
      successRate: 0
    };
    setApprovalFlows([...approvalFlows, flow]);
    setNewFlow({ name: "", description: "", steps: "", actions: [""] });
    setShowAddFlow(false);
    updateAnalytics();
  };

  const handleFlowAction = (id: number, action: 'activate' | 'deactivate' | 'delete') => {
    if (action === 'delete') {
      setApprovalFlows(approvalFlows.filter(flow => flow.id !== id));
    } else {
      setApprovalFlows(approvalFlows.map(flow => 
        flow.id === id 
          ? { ...flow, status: action === 'activate' ? 'Active' : 'Inactive' }
          : flow
      ));
    }
    updateAnalytics();
  };

  const toggleFlowSelection = (id: number) => {
    setSelectedFlows(prev => 
      prev.includes(id) 
        ? prev.filter(flowId => flowId !== id)
        : [...prev, id]
    );
  };

  const selectAllFlows = () => {
    setSelectedFlows(filteredFlows.map(flow => flow.id));
  };

  const clearSelection = () => {
    setSelectedFlows([]);
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (action === 'delete') {
      setApprovalFlows(approvalFlows.filter(flow => !selectedFlows.includes(flow.id)));
    } else {
      setApprovalFlows(approvalFlows.map(flow => 
        selectedFlows.includes(flow.id)
          ? { ...flow, status: action === 'activate' ? 'Active' : 'Inactive' }
          : flow
      ));
    }
    setSelectedFlows([]);
    updateAnalytics();
  };

  const updateAnalytics = () => {
    const total = approvalFlows.length;
    const active = approvalFlows.filter(f => f.status === 'Active').length;
    const totalApprovals = approvalFlows.reduce((sum, f) => sum + f.totalApprovals, 0);
    const pending = approvalFlows.reduce((sum, f) => sum + f.pendingApprovals, 0);
    const avgSuccessRate = approvalFlows.length > 0 ? 
      approvalFlows.reduce((sum, f) => sum + f.successRate, 0) / approvalFlows.length : 0;
    const avgProcessingTime = approvalFlows.length > 0 ? 
      approvalFlows.reduce((sum, f) => sum + parseFloat(f.averageTime), 0) / approvalFlows.length : 0;

    setFlowAnalytics({
      totalFlows: total,
      activeFlows: active,
      totalApprovals,
      pendingApprovals: pending,
      averageSuccessRate: Math.round(avgSuccessRate),
      averageProcessingTime: Math.round(avgProcessingTime * 10) / 10
    });
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setApprovalFlows(prev => prev.map(flow => ({
        ...flow,
        successRate: Math.min(100, Math.max(0, flow.successRate + Math.floor(Math.random() * 3) - 1)),
        pendingApprovals: Math.max(0, flow.pendingApprovals + Math.floor(Math.random() * 2) - 1)
      })));
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Inactive": return "bg-red-100 text-red-700";
      case "Draft": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'workflow': return <Activity className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejection': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'completion': return <Target className="w-4 h-4 text-purple-500" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderFlowDiagram = (flow: any) => {
    return (
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
        {flow.actions.map((action: string, index: number) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="px-3 py-2 bg-card rounded-lg border border-border">
                <span className="text-sm font-medium text-foreground">{action}</span>
              </div>
              {index < flow.actions.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    let filtered = approvalFlows.filter(flow => {
      const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          flow.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || flow.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesSteps = filterSteps === "all" || 
                          (filterSteps === "simple" && flow.steps <= 3) ||
                          (filterSteps === "moderate" && flow.steps > 3 && flow.steps <= 5) ||
                          (filterSteps === "complex" && flow.steps > 5);
      return matchesSearch && matchesStatus && matchesSteps;
    });
    setFilteredFlows(filtered);
  }, [searchTerm, filterStatus, filterSteps, approvalFlows]);

  useEffect(() => {
    updateAnalytics();
  }, [approvalFlows]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setApprovalFlows(prev => prev.map(flow => ({
        ...flow,
        successRate: Math.min(100, Math.max(0, flow.successRate + Math.floor(Math.random() * 2) - 1))
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Approvals Flow</h1>
            <p className="text-muted-foreground mt-2">Manage and track approval workflows</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Approvals Flow</span>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Flows</p>
                <p className="text-2xl font-bold text-blue-500">{flowAnalytics.totalFlows}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Flows</p>
                <p className="text-2xl font-bold text-green-500">{flowAnalytics.activeFlows}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Approvals</p>
                <p className="text-2xl font-bold text-purple-500">{flowAnalytics.totalApprovals}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-yellow-500">{flowAnalytics.pendingApprovals}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-orange-500">{flowAnalytics.averageSuccessRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                <p className="text-2xl font-bold text-red-500">{flowAnalytics.averageProcessingTime} days</p>
              </div>
              <Zap className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search flows..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
            <select 
              value={filterSteps}
              onChange={(e) => setFilterSteps(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Complexity</option>
              <option value="simple">Simple (≤3 steps)</option>
              <option value="moderate">Moderate (4-5 steps)</option>
              <option value="complex">Complex (&gt;5 steps)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            {selectedFlows.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedFlows.length} selected</span>
                <button 
                  onClick={() => handleBulkAction('activate')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  Activate
                </button>
                <button 
                  onClick={() => handleBulkAction('deactivate')}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  <XCircle className="w-4 h-4" />
                  Deactivate
                </button>
                <button 
                  onClick={() => handleBulkAction('delete')}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <button 
              onClick={() => setShowAddFlow(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Flow
            </button>
          </div>
        </div>

        {/* Approval Flows Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={selectedFlows.length === filteredFlows.length ? clearSelection : selectAllFlows}
                      className="flex items-center gap-2"
                    >
                      {selectedFlows.length === filteredFlows.length ? 
                        <CheckCircle className="w-4 h-4" /> : 
                        <div className="w-4 h-4 border border-muted-foreground rounded"></div>
                      }
                      Select All
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Flow Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Steps</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Total Approvals</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Pending</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Success Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Avg Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlows.map((flow) => (
                  <tr key={flow.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <button onClick={() => toggleFlowSelection(flow.id)}>
                        {selectedFlows.includes(flow.id) ? 
                          <CheckCircle className="w-4 h-4 text-blue-500" /> : 
                          <div className="w-4 h-4 border border-muted-foreground rounded"></div>
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{flow.name}</p>
                        <p className="text-xs text-muted-foreground">{flow.description}</p>
                        <p className="text-xs text-muted-foreground">Created by {flow.createdBy}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{flow.steps}</span>
                        <div className="flex items-center gap-1">
                          {flow.actions.slice(0, 3).map((action, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {action}
                            </span>
                          ))}
                          {flow.actions.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{flow.actions.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flow.status)}`}>
                        {flow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{flow.totalApprovals}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{flow.pendingApprovals}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              flow.successRate >= 90 ? 'bg-green-500' :
                              flow.successRate >= 70 ? 'bg-yellow-500' :
                              flow.successRate >= 50 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{width: `${flow.successRate}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-foreground">{flow.successRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{flow.averageTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button 
                          onClick={() => handleFlowAction(flow.id, flow.status === 'Active' ? 'deactivate' : 'activate')}
                          className="p-1 hover:bg-muted rounded"
                        >
                          {flow.status === 'Active' ? 
                            <XCircle className="w-4 h-4 text-yellow-500" /> : 
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          }
                        </button>
                        <button 
                          onClick={() => handleFlowAction(flow.id, 'delete')}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flow Diagrams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFlows.slice(0, 4).map((flow) => (
            <div key={flow.id} className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flow.status)}`}>
                  {flow.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{flow.description}</p>
              {renderFlowDiagram(flow)}
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>{flow.steps} steps</span>
                <span>{flow.successRate}% success rate</span>
                <span>{flow.averageTime} avg time</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'error' ? 'bg-red-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Flow Modal */}
        {showAddFlow && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 shadow-card w-full max-w-2xl mx-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New Approval Flow</h2>
              <form onSubmit={handleAddFlow} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Flow Name *</label>
                    <input 
                      type="text" 
                      value={newFlow.name}
                      onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Number of Steps *</label>
                    <input 
                      type="number" 
                      min="1"
                      max="10"
                      value={newFlow.steps}
                      onChange={(e) => setNewFlow({...newFlow, steps: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                  <textarea 
                    value={newFlow.description}
                    onChange={(e) => setNewFlow({...newFlow, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Flow Steps *</label>
                  <div className="space-y-2">
                    {newFlow.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground w-8">Step {index + 1}:</span>
                        <input 
                          type="text" 
                          value={action}
                          onChange={(e) => {
                            const newActions = [...newFlow.actions];
                            newActions[index] = e.target.value;
                            setNewFlow({...newFlow, actions: newActions});
                          }}
                          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder={`Step ${index + 1} action`}
                        />
                        {newFlow.actions.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => {
                              const newActions = newFlow.actions.filter((_, i) => i !== index);
                              setNewFlow({...newFlow, actions: newActions});
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setNewFlow({...newFlow, actions: [...newFlow.actions, ""]})}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowAddFlow(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Flow
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApprovalsFlow;