import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Building, MapPin, Users, Download, Send, Upload, Image, FileImage } from "lucide-react";

const DrawingManagement = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Drawing Management Section</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Drawing Management Section</span>
        </div>

        {/* Drawing Upload Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Drawing Upload Section</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Drawing Upload Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Upload New Drawing</h3>
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
                    <label className="block text-sm font-medium text-foreground mb-2">Drawing Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Select Drawing Type</option>
                      <option>Architectural</option>
                      <option>Structural</option>
                      <option>Electrical</option>
                      <option>Mechanical</option>
                      <option>Plumbing</option>
                      <option>Civil</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Drawing Title *</label>
                    <input 
                      type="text" 
                      placeholder="Enter drawing title" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Drawing Number *</label>
                    <input 
                      type="text" 
                      placeholder="Enter drawing number" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Version *</label>
                    <input 
                      type="text" 
                      placeholder="Enter version (e.g., v1.0)" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Drawing Description</label>
                    <textarea 
                      placeholder="Enter drawing description" 
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Drawing Files *</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop drawing files here or click to upload</p>
                      <p className="text-xs text-muted-foreground mb-4">Supported formats: PDF, DWG, DXF, PNG, JPG (Max 50MB)</p>
                      <input type="file" className="hidden" multiple accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg" />
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload Drawing
                  </button>
                </div>
              </div>
              
              {/* Recent Uploads */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Uploads</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileImage className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Floor Plan - Level 1</p>
                      <p className="text-xs text-muted-foreground">Architectural • v2.1 • Uploaded 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileImage className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Structural Foundation</p>
                      <p className="text-xs text-muted-foreground">Structural • v1.0 • Uploaded 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileImage className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Electrical Layout</p>
                      <p className="text-xs text-muted-foreground">Electrical • v1.2 • Uploaded 3 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Under Review
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileImage className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Mechanical Systems</p>
                      <p className="text-xs text-muted-foreground">Mechanical • v1.0 • Uploaded 5 days ago</p>
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

        {/* Drawing Approved Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Drawing Approved</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search drawings..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>Rejected</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Types</option>
                  <option>Architectural</option>
                  <option>Structural</option>
                  <option>Electrical</option>
                  <option>Mechanical</option>
                  <option>Plumbing</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Projects</option>
                  <option>Downtown Office Complex</option>
                  <option>Highway Expansion</option>
                  <option>Residential Complex</option>
                  <option>Industrial Park</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Drawings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Drawing ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Version</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Uploaded By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Upload Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Approved By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#DRW-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Floor Plan - Level 1</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Downtown Office Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Architectural</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">v2.1</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 15, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#DRW-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Structural Foundation</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Highway Expansion</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Structural</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">v1.0</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">John Doe</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 12, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#DRW-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Electrical Layout</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Residential Complex</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Electrical</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">v1.2</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Under Review
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 10, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
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
                    <td className="px-6 py-4 text-sm text-foreground">#DRW-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Mechanical Systems</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Industrial Park</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mechanical</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">v1.0</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mike Johnson</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 08, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#DRW-005</td>
                    <td className="px-6 py-4 text-sm text-foreground">Plumbing Layout</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Shopping Mall</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Plumbing</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">v1.1</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Sarah Wilson</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 05, 2024</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-purple-500" />
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

        {/* Drawing Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Drawing Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">42</div>
                <div className="text-sm text-muted-foreground">Total Drawings</div>
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
                <div className="text-3xl font-bold text-yellow-500 mb-2">8</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">6</div>
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
                  <Upload className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bulk Upload</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload multiple drawings at once</p>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Bulk Upload
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Export Drawings</h3>
                <p className="text-sm text-muted-foreground mb-4">Generate drawing reports</p>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Export Drawings
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bulk Approve</h3>
                <p className="text-sm text-muted-foreground mb-4">Approve multiple drawings</p>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Bulk Approve
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DrawingManagement;
