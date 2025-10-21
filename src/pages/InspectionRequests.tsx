import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Shield, Building, MapPin } from "lucide-react";

const InspectionRequests = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Inspection Requests</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Inspection Requests</span>
        </div>

        {/* Add Inspection Request Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Add Inspection Request</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inspection Request Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Create New Inspection Request</h3>
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
                    <label className="block text-sm font-medium text-foreground mb-2">Inspection Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Type</option>
                      <option>Structural Inspection</option>
                      <option>Safety Inspection</option>
                      <option>Quality Inspection</option>
                      <option>Environmental Inspection</option>
                      <option>Electrical Inspection</option>
                      <option>Plumbing Inspection</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                    <input 
                      type="text" 
                      placeholder="Enter inspection location" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Requested Date *</label>
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
                      placeholder="Enter inspection description" 
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Submit Inspection Request
                  </button>
                </div>
              </div>
              
              {/* Recent Requests */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Requests</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#IR-001 - Structural Inspection</p>
                      <p className="text-xs text-muted-foreground">Submitted 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#IR-002 - Safety Inspection</p>
                      <p className="text-xs text-muted-foreground">Submitted 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">#IR-003 - Quality Inspection</p>
                      <p className="text-xs text-muted-foreground">Submitted 3 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Under Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspection Requests Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Inspection Requests</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search requests..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Under Review</option>
                  <option>Rejected</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Types</option>
                  <option>Structural</option>
                  <option>Safety</option>
                  <option>Quality</option>
                  <option>Environmental</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Inspection Requests Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">IR ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contractor</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#IR-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">ABC Construction Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Structural</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#IR-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Highway Expansion</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Road Builders Inc</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Safety</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#IR-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Residential Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Home Builders Co</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Quality</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Block C, Unit 5</td>
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
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 10, 2024</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#IR-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Industrial Park</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Industrial Contractors</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Environmental</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Zone 3, Building 7</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        Critical
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 08, 2024</td>
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

        {/* Rejected IRs Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Rejected IRs</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search rejected IRs..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Projects</option>
                  <option>Downtown Office Complex</option>
                  <option>Highway Expansion</option>
                  <option>Residential Complex</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Rejected IR Card 1 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IR-004</h3>
                      <p className="text-sm text-muted-foreground">Industrial Park</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Rejected
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">Industrial Contractors</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm text-foreground">Environmental</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm text-foreground">Zone 3, Building 7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rejected By:</span>
                    <span className="text-sm text-foreground">Mike Johnson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 08, 2024</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Rejected IR Card 2 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IR-007</h3>
                      <p className="text-sm text-muted-foreground">Downtown Office Complex</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Rejected
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">ABC Construction Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm text-foreground">Electrical</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm text-foreground">Building A, Floor 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rejected By:</span>
                    <span className="text-sm text-foreground">Sarah Wilson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 05, 2024</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Rejected IR Card 3 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IR-009</h3>
                      <p className="text-sm text-muted-foreground">Highway Expansion</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Rejected
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">Road Builders Inc</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm text-foreground">Plumbing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm text-foreground">Site B, Zone 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rejected By:</span>
                    <span className="text-sm text-foreground">David Brown</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 03, 2024</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IR Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">IR Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">35</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">22</div>
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
      </div>
    </DashboardLayout>
  );
};

export default InspectionRequests;
