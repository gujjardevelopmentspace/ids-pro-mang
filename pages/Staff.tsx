import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

const Staff = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Users List</span>
        </div>

        {/* Users List Section */}
        <section>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Users List</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>

            {/* User Card */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">AHSAN UL HAQ</h3>
                  <p className="text-sm text-muted-foreground">yahyaahsan210@gmail.com</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Click here to add new User</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles List Section */}
        <section>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span>Home</span>
              <span className="mx-2">&gt;</span>
              <span className="text-foreground font-medium">Roles List</span>
            </div>

            {/* Search and Entries */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">10</span>
                <span className="text-sm text-muted-foreground">entries per page</span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
            </div>

            {/* Roles Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">#</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Permissions</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">1</td>
                    <td className="px-6 py-4 text-sm text-foreground">Owner_1536</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 1 of 1 entries
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
