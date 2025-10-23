import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Users, 
  Building, 
  Globe, 
  Shield, 
  Settings, 
  Crown,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Zap,
  Rocket,
  Sparkles
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  type: 'enterprise' | 'startup' | 'government' | 'nonprofit';
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended' | 'trial';
  subscription: 'free' | 'basic' | 'professional' | 'enterprise';
  users: number;
  projects: number;
  revenue: number;
  location: string;
  website: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  features: string[];
  createdAt: string;
  lastActive: string;
  admin: {
    name: string;
    email: string;
    avatar: string;
  };
  departments: Department[];
  metrics: {
    totalUsers: number;
    activeUsers: number;
    totalProjects: number;
    completedProjects: number;
    totalRevenue: number;
    monthlyRevenue: number;
    userSatisfaction: number;
    systemUptime: number;
  };
}

interface Department {
  id: string;
  name: string;
  head: string;
  members: number;
  budget: number;
  projects: number;
  status: 'active' | 'inactive';
}

const OrganizationManagement = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrgs, setFilteredOrgs] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubscription, setFilterSubscription] = useState("all");
  const [showAddOrg, setShowAddOrg] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockOrganizations: Organization[] = [
      {
        id: "1",
        name: "INVENTOR Design Studio",
        type: "enterprise",
        industry: "Construction & Engineering",
        size: "large",
        status: "active",
        subscription: "enterprise",
        users: 150,
        projects: 45,
        revenue: 2500000,
        location: "New York, NY",
        website: "https://inventor-design.com",
        contact: {
          email: "admin@inventor-design.com",
          phone: "+1 (555) 123-4567",
          address: "123 Business Ave, New York, NY 10001"
        },
        features: ["Advanced Analytics", "Multi-Project Management", "Real-time Collaboration", "Custom Integrations"],
        createdAt: "2023-01-15",
        lastActive: "2024-01-20",
        admin: {
          name: "John Smith",
          email: "john@inventor-design.com",
          avatar: "/avatars/john.jpg"
        },
        departments: [
          { id: "1", name: "Engineering", head: "Sarah Johnson", members: 25, budget: 500000, projects: 12, status: "active" },
          { id: "2", name: "Project Management", head: "Mike Chen", members: 15, budget: 300000, projects: 8, status: "active" },
          { id: "3", name: "Quality Assurance", head: "Lisa Brown", members: 10, budget: 200000, projects: 5, status: "active" }
        ],
        metrics: {
          totalUsers: 150,
          activeUsers: 142,
          totalProjects: 45,
          completedProjects: 38,
          totalRevenue: 2500000,
          monthlyRevenue: 180000,
          userSatisfaction: 4.8,
          systemUptime: 99.9
        }
      },
      {
        id: "2",
        name: "Metro Construction Group",
        type: "enterprise",
        industry: "Construction",
        size: "large",
        status: "active",
        subscription: "professional",
        users: 85,
        projects: 28,
        revenue: 1800000,
        location: "Los Angeles, CA",
        website: "https://metro-construction.com",
        contact: {
          email: "contact@metro-construction.com",
          phone: "+1 (555) 987-6543",
          address: "456 Construction Blvd, Los Angeles, CA 90210"
        },
        features: ["Project Management", "Team Collaboration", "Document Management"],
        createdAt: "2023-03-20",
        lastActive: "2024-01-19",
        admin: {
          name: "Robert Davis",
          email: "robert@metro-construction.com",
          avatar: "/avatars/robert.jpg"
        },
        departments: [
          { id: "1", name: "Construction", head: "Tom Wilson", members: 40, budget: 800000, projects: 15, status: "active" },
          { id: "2", name: "Planning", head: "Emma Taylor", members: 12, budget: 250000, projects: 8, status: "active" }
        ],
        metrics: {
          totalUsers: 85,
          activeUsers: 78,
          totalProjects: 28,
          completedProjects: 22,
          totalRevenue: 1800000,
          monthlyRevenue: 120000,
          userSatisfaction: 4.6,
          systemUptime: 99.7
        }
      },
      {
        id: "3",
        name: "TechStart Solutions",
        type: "startup",
        industry: "Technology",
        size: "small",
        status: "trial",
        subscription: "free",
        users: 12,
        projects: 5,
        revenue: 150000,
        location: "San Francisco, CA",
        website: "https://techstart-solutions.com",
        contact: {
          email: "hello@techstart-solutions.com",
          phone: "+1 (555) 456-7890",
          address: "789 Startup St, San Francisco, CA 94105"
        },
        features: ["Basic Project Management", "Team Collaboration"],
        createdAt: "2023-11-10",
        lastActive: "2024-01-18",
        admin: {
          name: "Alex Kim",
          email: "alex@techstart-solutions.com",
          avatar: "/avatars/alex.jpg"
        },
        departments: [
          { id: "1", name: "Development", head: "Alex Kim", members: 8, budget: 100000, projects: 3, status: "active" },
          { id: "2", name: "Design", head: "Maria Garcia", members: 4, budget: 50000, projects: 2, status: "active" }
        ],
        metrics: {
          totalUsers: 12,
          activeUsers: 10,
          totalProjects: 5,
          completedProjects: 2,
          totalRevenue: 150000,
          monthlyRevenue: 25000,
          userSatisfaction: 4.2,
          systemUptime: 99.5
        }
      }
    ];

    setOrganizations(mockOrganizations);
    setFilteredOrgs(mockOrganizations);
  }, []);

  // Filter organizations
  useEffect(() => {
    let filtered = organizations;

    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(org => org.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(org => org.status === filterStatus);
    }

    if (filterSubscription !== "all") {
      filtered = filtered.filter(org => org.subscription === filterSubscription);
    }

    setFilteredOrgs(filtered);
  }, [organizations, searchTerm, filterType, filterStatus, filterSubscription]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'trial': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'professional': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'free': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Modern Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-ids-cyan/10 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Organization Management
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4">
              Manage multiple organizations, departments, and enterprise accounts with advanced analytics
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Multi-Tenant System</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Scalable Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Building className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-blue-500">{organizations.length}</span>
            </div>
            <div className="text-sm font-medium text-foreground">Total Organizations</div>
            <div className="text-xs text-muted-foreground mt-1">Active enterprise accounts</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-2xl font-bold text-green-500">
                {organizations.reduce((sum, org) => sum + org.users, 0)}
              </span>
            </div>
            <div className="text-sm font-medium text-foreground">Total Users</div>
            <div className="text-xs text-muted-foreground mt-1">Across all organizations</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-purple-500">
                {organizations.reduce((sum, org) => sum + org.projects, 0)}
              </span>
            </div>
            <div className="text-sm font-medium text-foreground">Total Projects</div>
            <div className="text-xs text-muted-foreground mt-1">Active across all orgs</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-2xl font-bold text-orange-500">
                ${(organizations.reduce((sum, org) => sum + org.revenue, 0) / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="text-sm font-medium text-foreground">Total Revenue</div>
            <div className="text-xs text-muted-foreground mt-1">Annual revenue generated</div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search organizations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-64 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="enterprise">Enterprise</option>
              <option value="startup">Startup</option>
              <option value="government">Government</option>
              <option value="nonprofit">Nonprofit</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="trial">Trial</option>
            </select>
            <select 
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground w-full sm:w-auto focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="all">All Plans</option>
              <option value="enterprise">Enterprise</option>
              <option value="professional">Professional</option>
              <option value="basic">Basic</option>
              <option value="free">Free</option>
            </select>
          </div>
          
          <button 
            onClick={() => setShowAddOrg(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 w-full sm:w-auto active:scale-95 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Organization
          </button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <div 
              key={org.id}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-95 h-full flex flex-col bg-gradient-to-br from-card to-card/80 hover:from-card/90 hover:to-card/70"
              onClick={() => setSelectedOrg(org)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg mb-1 truncate">
                    {org.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{org.industry}</p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(org.status)}`}>
                    {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(org.subscription)}`}>
                    {org.subscription.charAt(0).toUpperCase() + org.subscription.slice(1)}
                  </span>
                </div>
              </div>

              {/* Organization Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Users</p>
                  <p className="text-sm font-medium text-foreground">{org.users}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Projects</p>
                  <p className="text-sm font-medium text-foreground">{org.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  <p className="text-sm font-medium text-foreground">${(org.revenue / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-medium text-foreground truncate">{org.location}</p>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">User Satisfaction</span>
                  <span className="text-sm font-bold text-primary">{org.metrics.userSatisfaction}/5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(org.metrics.userSatisfaction / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1">
                  {org.features.slice(0, 2).map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {org.features.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{org.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Created: {new Date(org.createdAt).toLocaleDateString()}</span>
                  <span>Last Active: {new Date(org.lastActive).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Organization Detail Modal */}
        {selectedOrg && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedOrg.name}</h2>
                <button 
                  onClick={() => setSelectedOrg(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organization Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Organization Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-foreground">{selectedOrg.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="text-foreground">{selectedOrg.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="text-foreground">{selectedOrg.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrg.status)}`}>
                          {selectedOrg.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subscription:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(selectedOrg.subscription)}`}>
                          {selectedOrg.subscription}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedOrg.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedOrg.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedOrg.contact.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedOrg.website}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{selectedOrg.metrics.totalUsers}</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{selectedOrg.metrics.activeUsers}</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{selectedOrg.metrics.totalProjects}</div>
                        <div className="text-sm text-muted-foreground">Total Projects</div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{selectedOrg.metrics.completedProjects}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Departments</h3>
                    <div className="space-y-2">
                      {selectedOrg.departments.map((dept) => (
                        <div key={dept.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium text-foreground">{dept.name}</div>
                            <div className="text-sm text-muted-foreground">Head: {dept.head}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-foreground">{dept.members} members</div>
                            <div className="text-xs text-muted-foreground">{dept.projects} projects</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrganizationManagement;
