import { DashboardLayout } from "@/components/DashboardLayout";
import { Filter, RefreshCw, Search, ChevronLeft, ChevronRight, Star } from "lucide-react";

const ApprovedWorkOrder = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Approved Work Order</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Approved Work Order</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-muted-foreground">Entries</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Search:</span>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search work orders..." 
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Approved Work Orders Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">SR #</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">PROJECT NAME</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">SITE LOCATION</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">CREATED BY</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">CONTRACTOR</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ITEMS IN CONTRACT</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">DATE</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">TOTAL</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    No data available in table.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-foreground">Grand Total</div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Items in Contract</div>
                <div className="text-lg font-bold text-foreground">0</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-lg font-bold text-foreground">0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 0 to 0 of 0 entries
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Work Order Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Work Order Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Total Approved</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">0</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Filter Work Orders</h3>
                  <p className="text-sm text-muted-foreground">Filter by status, project, or contractor</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Refresh Data</h3>
                  <p className="text-sm text-muted-foreground">Update work order information</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Favorites</h3>
                  <p className="text-sm text-muted-foreground">Manage favorite work orders</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ApprovedWorkOrder;
