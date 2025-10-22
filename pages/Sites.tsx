import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, MapPin, Users, Calendar, Edit, Trash2 } from "lucide-react";

const Sites = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Sites Management</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Sites</span>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search sites..." 
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>All Sites</option>
              <option>Active Sites</option>
              <option>Inactive Sites</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            Add Site
          </button>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Site Card 1 */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Site Alpha</h3>
                  <p className="text-sm text-muted-foreground">Construction Site</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location: Downtown Area</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Staff: 25 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created: Jan 15, 2024</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Active</span>
                <span className="text-sm text-muted-foreground">Progress: 75%</span>
              </div>
            </div>
          </div>

          {/* Site Card 2 */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Site Beta</h3>
                  <p className="text-sm text-muted-foreground">Infrastructure Project</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location: Industrial Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Staff: 18 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created: Feb 20, 2024</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-600">In Progress</span>
                <span className="text-sm text-muted-foreground">Progress: 45%</span>
              </div>
            </div>
          </div>

          {/* Site Card 3 */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Site Gamma</h3>
                  <p className="text-sm text-muted-foreground">Residential Complex</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location: Suburban Area</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Staff: 32 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created: Mar 10, 2024</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">On Hold</span>
                <span className="text-sm text-muted-foreground">Progress: 20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sites Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Sites Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Total Sites</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">1</div>
                <div className="text-sm text-muted-foreground">Active Sites</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">1</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">1</div>
                <div className="text-sm text-muted-foreground">On Hold</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Sites;
