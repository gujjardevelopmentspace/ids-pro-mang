import { DashboardLayout } from "@/components/DashboardLayout";
import { Upload, CheckCircle, Clock, FileText, Download, Edit, Trash2, Plus, Filter, Search, XCircle } from "lucide-react";

const LabTests = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Lab Tests</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Lab Tests</span>
        </div>

        {/* Upload Lab Test Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Upload Lab Test</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Upload New Test</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Test Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter test name" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Test Type *</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Concrete Test</option>
                      <option>Steel Test</option>
                      <option>Soil Test</option>
                      <option>Water Test</option>
                      <option>Material Test</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Test Date *</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Test Results *</label>
                    <textarea 
                      placeholder="Enter test results" 
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Upload Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to browse</p>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Upload Test
                  </button>
                </div>
              </div>
              
              {/* Recent Uploads */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Uploads</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Concrete Strength Test</p>
                      <p className="text-xs text-muted-foreground">Uploaded 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Steel Quality Test</p>
                      <p className="text-xs text-muted-foreground">Uploaded 1 day ago</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Soil Analysis</p>
                      <p className="text-xs text-muted-foreground">Uploaded 3 days ago</p>
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

        {/* Approval Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Approval</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search tests..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Tests</option>
                  <option>Pending Approval</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Approval Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Test ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Test Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Submitted By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#LT-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Concrete Compressive Strength</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Concrete Test</td>
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
                          <Download className="w-4 h-4 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#LT-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Steel Tensile Strength</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Steel Test</td>
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
                          <Download className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#LT-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Soil Bearing Capacity</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Soil Test</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jan 10, 2024</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Approved Labs Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Approved Labs</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
              <Plus className="w-4 h-4" />
              Add New Test
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lab Test Card 1 - Concrete */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">Concrete Strength Test</h3>
                  <p className="text-sm text-primary font-medium">#LT-001</p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold">
                  Approved
                </span>
              </div>
              
              {/* Test Details */}
              <div className="space-y-3 mb-6 bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Type:</span>
                  <span className="text-sm font-semibold text-foreground">Concrete Test</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Result:</span>
                  <span className="text-sm font-semibold text-primary">35.2 MPa</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Date:</span>
                  <span className="text-sm font-semibold text-foreground">Jan 15, 2024</span>
                </div>
              </div>
              
              {/* Actions */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Lab Test Card 2 - Steel */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">Steel Quality Test</h3>
                  <p className="text-sm text-primary font-medium">#LT-002</p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold">
                  Approved
                </span>
              </div>
              
              {/* Test Details */}
              <div className="space-y-3 mb-6 bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Type:</span>
                  <span className="text-sm font-semibold text-foreground">Steel Test</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Result:</span>
                  <span className="text-sm font-semibold text-primary">Grade 60</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Date:</span>
                  <span className="text-sm font-semibold text-foreground">Jan 12, 2024</span>
                </div>
              </div>
              
              {/* Actions */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Lab Test Card 3 - Water */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">Water Quality Test</h3>
                  <p className="text-sm text-primary font-medium">#LT-003</p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold">
                  Approved
                </span>
              </div>
              
              {/* Test Details */}
              <div className="space-y-3 mb-6 bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Type:</span>
                  <span className="text-sm font-semibold text-foreground">Water Test</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Result:</span>
                  <span className="text-sm font-semibold text-primary">Potable</span>
                </div>
                <div className="border-t border-border"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Date:</span>
                  <span className="text-sm font-semibold text-foreground">Jan 08, 2024</span>
                </div>
              </div>
              
              {/* Actions */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </section>

        {/* Lab Test Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Lab Test Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">156</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">128</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">18</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">10</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default LabTests;