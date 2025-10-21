import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Building, MapPin, Users, Download, Send, DollarSign, Award, Target } from "lucide-react";
import { useState } from "react";

const BidProposal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [proposals, setProposals] = useState([
    {
      id: "BP-001",
      title: "Office Building Construction",
      client: "ABC Corporation",
      type: "Construction",
      amount: 2500000,
      status: "Draft",
      createdBy: "AHSAN UL HAQ",
      createdDate: "2024-01-15",
      deadline: "2024-02-15",
      priority: "High"
    },
    {
      id: "BP-002",
      title: "Highway Infrastructure",
      client: "City Development Authority",
      type: "Infrastructure",
      amount: 5000000,
      status: "Submitted",
      createdBy: "John Doe",
      createdDate: "2024-01-12",
      deadline: "2024-02-20",
      priority: "Critical"
    },
    {
      id: "BP-003",
      title: "Residential Complex",
      client: "Housing Solutions Ltd",
      type: "Residential",
      amount: 1800000,
      status: "Under Review",
      createdBy: "Jane Smith",
      createdDate: "2024-01-10",
      deadline: "2024-02-10",
      priority: "Medium"
    },
    {
      id: "BP-004",
      title: "Industrial Plant Design",
      client: "Manufacturing Corp",
      type: "Industrial",
      amount: 3200000,
      status: "Approved",
      createdBy: "Mike Johnson",
      createdDate: "2024-01-08",
      deadline: "2024-02-05",
      priority: "High"
    },
    {
      id: "BP-005",
      title: "Shopping Mall Development",
      client: "Retail Ventures",
      type: "Commercial",
      amount: 4500000,
      status: "Rejected",
      createdBy: "Sarah Wilson",
      createdDate: "2024-01-05",
      deadline: "2024-02-01",
      priority: "Low"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    client: "",
    type: "",
    amount: "",
    deadline: "",
    priority: "",
    description: ""
  });

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const proposal = {
      id: `BP-${String(proposals.length + 1).padStart(3, '0')}`,
      title: newProposal.title,
      client: newProposal.client,
      type: newProposal.type,
      amount: parseFloat(newProposal.amount),
      status: "Draft",
      createdBy: "AHSAN UL HAQ",
      createdDate: new Date().toISOString().split('T')[0],
      deadline: newProposal.deadline,
      priority: newProposal.priority
    };
    setProposals([proposal, ...proposals]);
    setNewProposal({ title: "", client: "", type: "", amount: "", deadline: "", priority: "", description: "" });
    setShowCreateForm(false);
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        proposal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || proposal.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === "all" || proposal.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-gray-100 text-gray-700";
      case "Submitted": return "bg-blue-100 text-blue-700";
      case "Under Review": return "bg-yellow-100 text-yellow-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
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

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Bid Proposal</h1>
          <p className="text-muted-foreground mt-2">Manage and track your bid proposals</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Bid Proposal</span>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search proposals..." 
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
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Types</option>
              <option value="construction">Construction</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="residential">Residential</option>
              <option value="industrial">Industrial</option>
              <option value="commercial">Commercial</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Proposal
          </button>
        </div>

        {/* Create Proposal Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 shadow-card w-full max-w-2xl mx-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Create New Bid Proposal</h2>
              <form onSubmit={handleCreateProposal} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Proposal Title *</label>
                    <input 
                      type="text" 
                      value={newProposal.title}
                      onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Client *</label>
                    <input 
                      type="text" 
                      value={newProposal.client}
                      onChange={(e) => setNewProposal({...newProposal, client: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type *</label>
                    <select 
                      value={newProposal.type}
                      onChange={(e) => setNewProposal({...newProposal, type: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Construction">Construction</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Residential">Residential</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Amount *</label>
                    <input 
                      type="number" 
                      value={newProposal.amount}
                      onChange={(e) => setNewProposal({...newProposal, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Deadline *</label>
                    <input 
                      type="date" 
                      value={newProposal.deadline}
                      onChange={(e) => setNewProposal({...newProposal, deadline: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Priority *</label>
                    <select 
                      value={newProposal.priority}
                      onChange={(e) => setNewProposal({...newProposal, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea 
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Proposals Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Proposal ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Created By</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{proposal.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{proposal.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.client}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.type}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">${proposal.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(proposal.priority)}`}>
                        {proposal.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.deadline}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.createdBy}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Send className="w-4 h-4 text-orange-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">{proposals.length}</div>
              <div className="text-sm text-muted-foreground">Total Proposals</div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {proposals.filter(p => p.status === 'Approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {proposals.filter(p => p.status === 'Under Review').length}
              </div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {proposals.filter(p => p.status === 'Rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BidProposal;
