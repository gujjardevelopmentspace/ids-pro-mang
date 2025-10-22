import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, DollarSign } from "lucide-react";

const IPCApprovals = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">IPC Approvals</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">IPC Approvals</span>
        </div>

        {/* Approvals Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Approvals</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search approvals..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Under Review</option>
                </select>
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
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                New IPC
              </button>
            </div>

            {/* Approvals Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">IPC ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contractor</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Submitted By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#IPC-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">ABC Construction Ltd</td>
                    <td className="px-6 py-4 text-sm text-foreground">$125,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Pending
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
                    <td className="px-6 py-4 text-sm text-foreground">#IPC-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Highway Expansion</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Road Builders Inc</td>
                    <td className="px-6 py-4 text-sm text-foreground">$85,500</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Approved
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
                    <td className="px-6 py-4 text-sm text-foreground">#IPC-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Residential Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Home Builders Co</td>
                    <td className="px-6 py-4 text-sm text-foreground">$95,200</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Under Review
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#IPC-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">ABC Construction Ltd</td>
                    <td className="px-6 py-4 text-sm text-foreground">$67,800</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mike Johnson</td>
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

        {/* Approved Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Approved</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search approved IPCs..." 
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
              {/* Approved IPC Card 1 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IPC-002</h3>
                      <p className="text-sm text-muted-foreground">Highway Expansion</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Approved
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">Road Builders Inc</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-bold text-green-500">$85,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approved By:</span>
                    <span className="text-sm text-foreground">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 12, 2024</span>
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

              {/* Approved IPC Card 2 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IPC-005</h3>
                      <p className="text-sm text-muted-foreground">Downtown Office Complex</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Approved
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">ABC Construction Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-bold text-green-500">$142,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approved By:</span>
                    <span className="text-sm text-foreground">Sarah Wilson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 18, 2024</span>
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

              {/* Approved IPC Card 3 */}
              <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">#IPC-006</h3>
                      <p className="text-sm text-muted-foreground">Residential Complex</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Approved
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contractor:</span>
                    <span className="text-sm text-foreground">Home Builders Co</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-bold text-green-500">$78,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approved By:</span>
                    <span className="text-sm text-foreground">David Brown</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-foreground">Jan 20, 2024</span>
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

        {/* IPC Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">IPC Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">24</div>
                <div className="text-sm text-muted-foreground">Total IPCs</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">18</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">4</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">2</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Summary */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Financial Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Total Approved Amount</h3>
                  <p className="text-sm text-muted-foreground">All approved IPCs</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500 mb-2">$2,456,800</div>
              <p className="text-sm text-muted-foreground">18 approved IPCs</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pending Amount</h3>
                  <p className="text-sm text-muted-foreground">Awaiting approval</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-500 mb-2">$485,200</div>
              <p className="text-sm text-muted-foreground">4 pending IPCs</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Average IPC Amount</h3>
                  <p className="text-sm text-muted-foreground">Per approved IPC</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-500 mb-2">$136,489</div>
              <p className="text-sm text-muted-foreground">Based on approved IPCs</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default IPCApprovals;
