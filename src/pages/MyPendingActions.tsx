import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle, User, Calendar, FileText, DollarSign, Building, MapPin, Eye, Edit, Trash2, Filter, Search, Plus, RefreshCw, Bell, CheckSquare, Square } from "lucide-react";

const MyPendingActions = () => {
  const [pendingActions, setPendingActions] = useState([
    {
      id: 1,
      title: "Approve Budget for Downtown Office Complex",
      type: "Budget Approval",
      priority: "High",
      status: "Pending",
      assignedBy: "John Smith",
      dueDate: "2024-01-20",
      description: "Review and approve the proposed budget for the downtown office complex project",
      amount: 2500000,
      project: "Downtown Office Complex",
      location: "New York, NY"
    },
    {
      id: 2,
      title: "Review Material Purchase Request",
      type: "Purchase Approval",
      priority: "Medium",
      status: "Pending",
      assignedBy: "Sarah Johnson",
      dueDate: "2024-01-22",
      description: "Review the material purchase request for steel and concrete supplies",
      amount: 125000,
      project: "Residential Tower",
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      title: "Approve Work Order #WO-001",
      type: "Work Order",
      priority: "Critical",
      status: "Pending",
      assignedBy: "Mike Davis",
      dueDate: "2024-01-18",
      description: "Approve the work order for foundation construction",
      amount: 450000,
      project: "Industrial Plant",
      location: "Chicago, IL"
    },
    {
      id: 4,
      title: "Review Inspection Report",
      type: "Inspection",
      priority: "Medium",
      status: "Pending",
      assignedBy: "Lisa Wilson",
      dueDate: "2024-01-25",
      description: "Review the safety inspection report for the construction site",
      amount: 0,
      project: "Shopping Mall",
      location: "Miami, FL"
    },
    {
      id: 5,
      title: "Approve Contractor Payment",
      type: "Payment",
      priority: "High",
      status: "Pending",
      assignedBy: "Robert Brown",
      dueDate: "2024-01-19",
      description: "Approve payment for completed foundation work",
      amount: 180000,
      project: "Office Building",
      location: "Seattle, WA"
    }
  ]);

  const [filteredActions, setFilteredActions] = useState(pendingActions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedActions, setSelectedActions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    setPendingActions(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: action === 'approve' ? 'Approved' : 'Rejected' }
        : item
    ));
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    setPendingActions(prev => prev.map(item => 
      selectedActions.includes(item.id)
        ? { ...item, status: action === 'approve' ? 'Approved' : 'Rejected' }
        : item
    ));
    setSelectedActions([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedActions(prev => 
      prev.includes(id) 
        ? prev.filter(actionId => actionId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedActions(filteredActions.map(action => action.id));
  };

  const clearSelection = () => {
    setSelectedActions([]);
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-700";
      case "High": return "bg-orange-100 text-orange-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Budget Approval": return <DollarSign className="w-4 h-4 text-green-500" />;
      case "Purchase Approval": return <FileText className="w-4 h-4 text-blue-500" />;
      case "Work Order": return <Building className="w-4 h-4 text-purple-500" />;
      case "Inspection": return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case "Payment": return <DollarSign className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    let filtered = pendingActions.filter(action => {
      const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          action.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === "all" || action.priority.toLowerCase() === filterPriority.toLowerCase();
      const matchesType = filterType === "all" || action.type.toLowerCase().includes(filterType.toLowerCase());
      return matchesSearch && matchesPriority && matchesType;
    });
    setFilteredActions(filtered);
  }, [searchTerm, filterPriority, filterType, pendingActions]);

  const stats = {
    total: pendingActions.length,
    critical: pendingActions.filter(a => a.priority === 'Critical').length,
    overdue: pendingActions.filter(a => getDaysUntilDue(a.dueDate) < 0).length,
    highPriority: pendingActions.filter(a => a.priority === 'High').length
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Pending Actions</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Manage your pending approvals and tasks</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">My Pending Actions</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Actions</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Priority</p>
                <p className="text-2xl font-bold text-red-500">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-orange-500">{stats.overdue}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.highPriority}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search actions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-64"
              />
            </div>
            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto"
            >
              <option value="all">All Types</option>
              <option value="budget">Budget Approval</option>
              <option value="purchase">Purchase Approval</option>
              <option value="work">Work Order</option>
              <option value="inspection">Inspection</option>
              <option value="payment">Payment</option>
            </select>
          </div>
          {selectedActions.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedActions.length} selected</span>
              <button 
                onClick={() => handleBulkAction('approve')}
                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                <CheckCircle className="w-4 h-4" />
                Approve All
              </button>
              <button 
                onClick={() => handleBulkAction('reject')}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                <XCircle className="w-4 h-4" />
                Reject All
              </button>
            </div>
          )}
        </div>

        {/* Actions Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={selectedActions.length === filteredActions.length ? clearSelection : selectAll}
                      className="flex items-center gap-2"
                    >
                      {selectedActions.length === filteredActions.length ? 
                        <CheckSquare className="w-4 h-4" /> : 
                        <Square className="w-4 h-4" />
                      }
                      Select All
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Assigned By</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActions.map((action) => {
                  const daysUntilDue = getDaysUntilDue(action.dueDate);
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <tr key={action.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <button onClick={() => toggleSelection(action.id)}>
                          {selectedActions.includes(action.id) ? 
                            <CheckSquare className="w-4 h-4 text-blue-500" /> : 
                            <Square className="w-4 h-4 text-muted-foreground" />
                          }
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          {getTypeIcon(action.type)}
                          <div>
                            <p className="text-sm font-medium text-foreground">{action.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Building className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{action.project}</span>
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{action.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{action.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{action.assignedBy}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-foreground">{action.dueDate}</p>
                            <p className={`text-xs ${isOverdue ? 'text-red-500' : daysUntilDue <= 2 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                              {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                               daysUntilDue === 0 ? 'Due today' : 
                               `${daysUntilDue} days left`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {action.amount > 0 ? `$${action.amount.toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleAction(action.id, 'approve')}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                          <button 
                            onClick={() => handleAction(action.id, 'reject')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-500" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4 text-green-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No pending actions found</h3>
            <p className="text-muted-foreground">You're all caught up! No pending actions match your current filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyPendingActions;
