import { DashboardLayout } from "@/components/DashboardLayout";
import { Search, Plus, Filter, MessageSquare, Settings, Users, BarChart3 } from "lucide-react";

const QueryDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Query Dashboard</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Query Dashboard</span>
        </div>

        {/* Query Portal Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Query Portal</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search queries..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Queries</option>
                  <option>Open Queries</option>
                  <option>Resolved Queries</option>
                  <option>Pending Queries</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                New Query
              </button>
            </div>

            {/* Queries Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Query ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Created By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#QRY-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">System Performance Issue</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Open
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">High</td>
                    <td className="px-6 py-4 text-sm text-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 15, 2024</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#QRY-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Database Connection Error</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Resolved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">Medium</td>
                    <td className="px-6 py-4 text-sm text-foreground">John Doe</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 12, 2024</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#QRY-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">User Authentication Problem</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">High</td>
                    <td className="px-6 py-4 text-sm text-foreground">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 10, 2024</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Setup Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Setup</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Query Categories */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Query Categories</h3>
                  <p className="text-sm text-muted-foreground">Manage query types</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-500 mb-2">5</div>
              <p className="text-sm text-muted-foreground">Active categories</p>
            </div>

            {/* Query Templates */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Query Templates</h3>
                  <p className="text-sm text-muted-foreground">Predefined responses</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500 mb-2">12</div>
              <p className="text-sm text-muted-foreground">Available templates</p>
            </div>

            {/* Auto Assignment Rules */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Auto Assignment</h3>
                  <p className="text-sm text-muted-foreground">Automated routing</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-500 mb-2">3</div>
              <p className="text-sm text-muted-foreground">Active rules</p>
            </div>
          </div>
        </section>

        {/* Query Admin Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Query Admin</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Statistics */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Admin Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Queries</span>
                  <span className="text-sm font-bold text-foreground">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Resolved Today</span>
                  <span className="text-sm font-bold text-green-500">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Response Time</span>
                  <span className="text-sm font-bold text-blue-500">2.4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Satisfaction Rate</span>
                  <span className="text-sm font-bold text-purple-500">94%</span>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-foreground">Manage Agents</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Settings className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-foreground">System Configuration</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-foreground">Analytics & Reports</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-foreground">Bulk Operations</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Query Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Query Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">156</div>
                <div className="text-sm text-muted-foreground">Total Queries</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">23</div>
                <div className="text-sm text-muted-foreground">Open Queries</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">128</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default QueryDashboard;
