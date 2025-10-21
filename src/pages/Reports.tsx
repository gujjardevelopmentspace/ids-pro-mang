import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Download, Calendar, Users, Building, CheckCircle, XCircle, BarChart3, TrendingUp, Clock } from "lucide-react";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Reports</span>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Clients Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Clients Report</h3>
                <p className="text-sm text-muted-foreground">Client information and statistics</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Clients: 45</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Contractors Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contractors Report</h3>
                <p className="text-sm text-muted-foreground">Contractor details and performance</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Contractors: 28</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-green-500" />
              </button>
            </div>
          </div>

          {/* Bids Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Bids Report</h3>
                <p className="text-sm text-muted-foreground">Bid submissions and analysis</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Bids: 156</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-purple-500" />
              </button>
            </div>
          </div>

          {/* Submitted Bid Reports */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Submitted Bid Reports</h3>
                <p className="text-sm text-muted-foreground">Submitted bid documentation</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Submitted: 89</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-orange-500" />
              </button>
            </div>
          </div>

          {/* Inspection Request Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Inspection Request Report</h3>
                <p className="text-sm text-muted-foreground">Inspection requests and status</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending: 23</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>

          {/* Contractor Approved/Unapproved Summary */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contractor Summary</h3>
                <p className="text-sm text-muted-foreground">Approved/Unapproved status</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Approved: 18</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-indigo-500" />
              </button>
            </div>
          </div>

          {/* Approved BOQs */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-teal-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Approved BOQs</h3>
                <p className="text-sm text-muted-foreground">Bill of Quantities approved</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Approved: 34</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-teal-500" />
              </button>
            </div>
          </div>

          {/* IPC Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">IPC Report</h3>
                <p className="text-sm text-muted-foreground">Interim Payment Certificates</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total IPCs: 67</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-pink-500" />
              </button>
            </div>
          </div>

          {/* Daily Progress Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Daily Progress Report</h3>
                <p className="text-sm text-muted-foreground">Daily work progress tracking</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Today's Progress</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-yellow-500" />
              </button>
            </div>
          </div>

          {/* Weekly Progress Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Weekly Progress Report</h3>
                <p className="text-sm text-muted-foreground">Weekly progress analysis</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-cyan-500" />
              </button>
            </div>
          </div>

          {/* Monthly Progress Report */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Monthly Progress Report</h3>
                <p className="text-sm text-muted-foreground">Monthly progress summary</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Download className="w-4 h-4 text-emerald-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Report Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Report Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">11</div>
                <div className="text-sm text-muted-foreground">Report Types</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">245</div>
                <div className="text-sm text-muted-foreground">Total Reports Generated</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">89</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">12</div>
                <div className="text-sm text-muted-foreground">Pending Reports</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Generate Custom Report</h3>
                  <p className="text-sm text-muted-foreground">Create custom reports with filters</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Generate Report
              </button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Bulk Download</h3>
                  <p className="text-sm text-muted-foreground">Download multiple reports at once</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Bulk Download
              </button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Schedule Reports</h3>
                  <p className="text-sm text-muted-foreground">Set up automated report generation</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Schedule Reports
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
