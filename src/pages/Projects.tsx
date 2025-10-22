import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, FolderOpen, Calendar, Users, DollarSign, Edit, Trash2, Filter, Eye } from "lucide-react";

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Modern Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-ids-cyan/10 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Projects Management
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4">
              Advanced project tracking with modern workflow management and real-time collaboration
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Live Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-muted-foreground">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-ids-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <span className="text-muted-foreground">Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Projects</span>
        </div>

        {/* Project Type Filter */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Project Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Construction Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Construction</h3>
                  <p className="text-sm text-muted-foreground">Building projects</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-500">8</div>
            </div>

            {/* Infrastructure Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">Roads, bridges, utilities</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500">5</div>
            </div>

            {/* Residential Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Residential</h3>
                  <p className="text-sm text-muted-foreground">Housing developments</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-500">3</div>
            </div>

            {/* Commercial Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Commercial</h3>
                  <p className="text-sm text-muted-foreground">Office buildings, retail</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-500">4</div>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-64"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto">
              <option>All Projects</option>
              <option>Active Projects</option>
              <option>Completed Projects</option>
              <option>On Hold</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Modern Project Card 1 */}
          <div className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FolderOpen className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Downtown Office Complex</h3>
                  <p className="text-sm text-muted-foreground">Construction Project</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs font-medium rounded-full">Active</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs font-medium rounded-full">High Priority</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors group/btn">
                  <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors group/btn">
                  <Edit className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                </button>
                <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group/btn">
                  <Trash2 className="w-4 h-4 text-muted-foreground group-hover/btn:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium text-foreground">Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="text-sm font-medium text-foreground">25 members</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="text-sm font-medium text-foreground">$2.5M</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Project Progress</span>
                <span className="text-sm font-bold text-green-500">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Started</span>
                <span>Expected: Dec 2024</span>
              </div>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Highway Expansion</h3>
                  <p className="text-sm text-muted-foreground">Infrastructure</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
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
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Start: Feb 20, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Team: 18 members</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Budget: $5.2M</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-600">In Progress</span>
                <span className="text-sm text-muted-foreground">Progress: 45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Residential Complex</h3>
                  <p className="text-sm text-muted-foreground">Residential</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
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
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Start: Mar 10, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Team: 32 members</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Budget: $8.1M</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">On Hold</span>
                <span className="text-sm text-muted-foreground">Progress: 20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Project Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">20</div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">12</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
