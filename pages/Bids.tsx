import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Building, MapPin, Users, Download, Send, DollarSign } from "lucide-react";

const Bids = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Bids</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Bids</span>
        </div>

        {/* Add Bids Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Add Bids</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bid Creation Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Create New Bid</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Project *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Project</option>
                      <option>Downtown Office Complex</option>
                      <option>Highway Expansion</option>
                      <option>Residential Complex</option>
                      <option>Industrial Park</option>
                      <option>Shopping Mall Construction</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bid Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Bid Type</option>
                      <option>Construction</option>
                      <option>Maintenance</option>
                      <option>Supply</option>
                      <option>Service</option>
                      <option>Consulting</option>
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
                      <option>Mall Builders Ltd</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bid Amount *</label>
                    <input 
                      type="number" 
                      placeholder="Enter bid amount" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bid Deadline *</label>
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
                    <label className="block text-sm font-medium text-foreground mb-2">Bid Description</label>
                    <textarea 
                      placeholder="Enter bid description" 
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop files here or click to upload</p>
                      <input type="file" className="hidden" multiple />
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Bid
                  </button>
                </div>
              </div>
              
              {/* Recent Bids */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Bids</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#BID-001 - Office Complex</p>
                      <p className="text-xs text-muted-foreground">$2,500,000 • Created 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#BID-002 - Highway Project</p>
                      <p className="text-xs text-muted-foreground">$1,800,000 • Created 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#BID-003 - Residential</p>
                      <p className="text-xs text-muted-foreground">$3,200,000 • Created 3 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Under Review
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#BID-004 - Industrial</p>
                      <p className="text-xs text-muted-foreground">$850,000 • Created 5 days ago</p>
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

        {/* Bids Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Bids</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search bids..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Types</option>
                  <option>Construction</option>
                  <option>Maintenance</option>
                  <option>Supply</option>
                  <option>Service</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Contractors</option>
                  <option>ABC Construction Ltd</option>
                  <option>Road Builders Inc</option>
                  <option>Home Builders Co</option>
                  <option>Industrial Contractors</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Bids Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Bid ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contractor</th>
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
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#BID-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">ABC Construction Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$2,500,000</td>
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
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 25, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
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
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#BID-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Highway Expansion</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Road Builders Inc</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$1,800,000</td>
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
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 20, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">John Doe</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Send className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#BID-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Residential Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Home Builders Co</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$3,200,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Under Review
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 18, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#BID-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Industrial Park</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Industrial Contractors</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Supply</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$850,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 15, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mike Johnson</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#BID-005</td>
                    <td className="px-6 py-4 text-sm text-foreground">Shopping Mall</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mall Builders Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$4,500,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Critical
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 30, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Sarah Wilson</td>
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
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bid Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Bid Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">28</div>
                <div className="text-sm text-muted-foreground">Total Bids</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">15</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">8</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bulk Approve</h3>
                <p className="text-sm text-muted-foreground mb-4">Approve multiple bids at once</p>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Bulk Approve
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Export Bids</h3>
                <p className="text-sm text-muted-foreground mb-4">Generate bid reports</p>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Export Bids
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Financial Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">View financial overview</p>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  View Summary
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Bids;
