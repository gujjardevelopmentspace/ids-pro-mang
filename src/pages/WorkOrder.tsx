import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Building, MapPin, Users } from "lucide-react";

const WorkOrder = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Work Order</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Work Order</span>
        </div>

        {/* Add Work Order Directly Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Add Work Order Directly</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Work Order Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Create New Work Order</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Project *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Project</option>
                      <option>Downtown Office Complex</option>
                      <option>Highway Expansion</option>
                      <option>Residential Complex</option>
                      <option>Industrial Park</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Contractor *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Contractor</option>
                      <option>ABC Construction Ltd</option>
                      <option>Road Builders Inc</option>
                      <option>Home Builders Co</option>
                      <option>Industrial Contractors</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Work Order Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Type</option>
                      <option>Construction</option>
                      <option>Maintenance</option>
                      <option>Repair</option>
                      <option>Installation</option>
                      <option>Inspection</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Site Location *</label>
                    <input 
                      type="text" 
                      placeholder="Enter site location" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Start Date *</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">End Date *</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Priority *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea 
                      placeholder="Enter work order description" 
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Work Order
                  </button>
                </div>
              </div>
              
              {/* Recent Work Orders */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Work Orders</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#WO-001 - Construction Work</p>
                      <p className="text-xs text-muted-foreground">Created 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#WO-002 - Maintenance Work</p>
                      <p className="text-xs text-muted-foreground">Created 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#WO-003 - Repair Work</p>
                      <p className="text-xs text-muted-foreground">Created 3 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add Work Order Variation Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Add Work Order Variation</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Variation Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Create Work Order Variation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Original Work Order *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Original Work Order</option>
                      <option>#WO-001 - Construction Work</option>
                      <option>#WO-002 - Maintenance Work</option>
                      <option>#WO-003 - Repair Work</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Variation Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Variation Type</option>
                      <option>Scope Change</option>
                      <option>Time Extension</option>
                      <option>Cost Adjustment</option>
                      <option>Resource Change</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Variation Reason *</label>
                    <textarea 
                      placeholder="Enter variation reason" 
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Additional Cost</label>
                    <input 
                      type="number" 
                      placeholder="Enter additional cost" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">New End Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Variation
                  </button>
                </div>
              </div>
              
              {/* Variation History */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Variation History</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#VAR-001 - Scope Change</p>
                      <p className="text-xs text-muted-foreground">Created 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#VAR-002 - Time Extension</p>
                      <p className="text-xs text-muted-foreground">Created 3 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Clock className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#VAR-003 - Cost Adjustment</p>
                      <p className="text-xs text-muted-foreground">Created 5 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Rejected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Order (Approvals) Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Work Order (Approvals)</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search work orders..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>In Progress</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Types</option>
                  <option>Construction</option>
                  <option>Maintenance</option>
                  <option>Repair</option>
                  <option>Installation</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Work Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">WO ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contractor</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Created By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#WO-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">ABC Construction Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Building A, Floor 3</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 15, 2024</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <XCircle className="w-4 h-4 text-red-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#WO-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Highway Expansion</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Road Builders Inc</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Maintenance</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Site B, Zone 2</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">John Doe</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 12, 2024</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#WO-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Residential Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Home Builders Co</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Repair</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Block C, Unit 5</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 10, 2024</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Work Order Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Work Order Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">45</div>
                <div className="text-sm text-muted-foreground">Total Work Orders</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">28</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">12</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default WorkOrder;
