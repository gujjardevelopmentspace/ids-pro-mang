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
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Construction</h3>
                  <p className="text-sm text-muted-foreground">Building projects</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-blue-500">8</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
            </div>

            {/* Infrastructure Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FolderOpen className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">Roads, bridges, utilities</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-green-500">5</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
            </div>

            {/* Residential Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FolderOpen className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Residential</h3>
                  <p className="text-sm text-muted-foreground">Housing developments</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-purple-500">3</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
            </div>

            {/* Commercial Projects */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FolderOpen className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Commercial</h3>
                  <p className="text-sm text-muted-foreground">Office buildings, retail</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-orange-500">4</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
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
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-64 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200">
              <option>All Projects</option>
              <option>Active Projects</option>
              <option>Completed Projects</option>
              <option>On Hold</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-200 w-full sm:w-auto active:scale-95">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 w-full sm:w-auto active:scale-95 shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Downtown Office Complex */}
          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col bg-gradient-to-br from-card to-card/80 hover:from-card/90 hover:to-card/70">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg mb-1">Downtown Office Complex</h3>
                <p className="text-sm text-muted-foreground">Construction Project</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-xs font-medium">
                  Active
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full text-xs font-medium">
                  High Priority
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                <p className="text-sm font-medium text-foreground">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                <p className="text-sm font-medium text-foreground">25 members</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-sm font-medium text-foreground">$2.5M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected</p>
                <p className="text-sm font-medium text-foreground">Dec 2024</p>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Project Progress</span>
                <span className="text-sm font-bold text-primary">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Started</span>
                <span>Expected: Dec 2024</span>
              </div>
            </div>
          </div>

          {/* Highway Expansion */}
          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col bg-gradient-to-br from-card to-card/80 hover:from-card/90 hover:to-card/70">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg mb-1">Highway Expansion</h3>
                <p className="text-sm text-muted-foreground">Infrastructure</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full text-xs font-medium">
                  In Progress
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full text-xs font-medium">
                  High Priority
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                <p className="text-sm font-medium text-foreground">Feb 20, 2024</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                <p className="text-sm font-medium text-foreground">18 members</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-sm font-medium text-foreground">$5.2M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected</p>
                <p className="text-sm font-medium text-foreground">Mar 2025</p>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Project Progress</span>
                <span className="text-sm font-bold text-blue-500">45%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{width: '45%'}}></div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Started</span>
                <span>Expected: Mar 2025</span>
              </div>
            </div>
          </div>

          {/* Residential Complex */}
          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col bg-gradient-to-br from-card to-card/80 hover:from-card/90 hover:to-card/70">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg mb-1">Residential Complex</h3>
                <p className="text-sm text-muted-foreground">Residential</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-full text-xs font-medium">
                  On Hold
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-full text-xs font-medium">
                  Medium Priority
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                <p className="text-sm font-medium text-foreground">Mar 10, 2024</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                <p className="text-sm font-medium text-foreground">32 members</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-sm font-medium text-foreground">$8.1M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected</p>
                <p className="text-sm font-medium text-foreground">Jun 2025</p>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Project Progress</span>
                <span className="text-sm font-bold text-yellow-500">20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full transition-all duration-500" style={{width: '20%'}}></div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Started</span>
                <span>Expected: Jun 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Project Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">20</div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold text-green-500 mb-2">12</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col justify-center">
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
