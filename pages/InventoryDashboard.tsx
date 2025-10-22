import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Package, Truck, DollarSign, BarChart3, PieChart, RefreshCw, MapPin, Building, Calendar, User, ChevronDown } from "lucide-react";

const InventoryDashboard = () => {
  const [selectedSite, setSelectedSite] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const [inventoryData, setInventoryData] = useState({
    totalAmount: 1250000,
    consumedAmount: 750000,
    balanceAmount: 500000
  });

  const [sites, setSites] = useState([
    { id: "all", name: "All Sites", location: "All Locations" },
    { id: "site1", name: "Downtown Office Complex", location: "New York, NY" },
    { id: "site2", name: "Residential Tower", location: "Los Angeles, CA" },
    { id: "site3", name: "Industrial Plant", location: "Chicago, IL" },
    { id: "site4", name: "Shopping Mall", location: "Miami, FL" },
    { id: "site5", name: "Office Building", location: "Seattle, WA" }
  ]);

  const [purchasedItems, setPurchasedItems] = useState([
    {
      id: 1,
      item: "Concrete",
      category: "Construction Materials",
      quantity: 150,
      unit: "m³",
      unitPrice: 300,
      totalPrice: 45000,
      supplier: "Concrete Corp",
      purchaseDate: "2024-01-15",
      site: "site1",
      status: "Delivered"
    },
    {
      id: 2,
      item: "Steel Beams",
      category: "Structural Materials",
      quantity: 25,
      unit: "tons",
      unitPrice: 5000,
      totalPrice: 125000,
      supplier: "Steel Works",
      purchaseDate: "2024-01-12",
      site: "site1",
      status: "In Transit"
    },
    {
      id: 3,
      item: "Cement",
      category: "Construction Materials",
      quantity: 50,
      unit: "bags",
      unitPrice: 300,
      totalPrice: 15000,
      supplier: "Cement Ltd",
      purchaseDate: "2024-01-10",
      site: "site2",
      status: "Delivered"
    },
    {
      id: 4,
      item: "Sand",
      category: "Construction Materials",
      quantity: 200,
      unit: "m³",
      unitPrice: 40,
      totalPrice: 8000,
      supplier: "Sand Supply",
      purchaseDate: "2024-01-08",
      site: "site2",
      status: "Delivered"
    },
    {
      id: 5,
      item: "Gravel",
      category: "Construction Materials",
      quantity: 100,
      unit: "m³",
      unitPrice: 120,
      totalPrice: 12000,
      supplier: "Gravel Co",
      purchaseDate: "2024-01-05",
      site: "site3",
      status: "Pending"
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'delivery', message: 'Concrete delivery completed at Downtown Office Complex', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'purchase', message: 'Steel beams purchase order placed', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'alert', message: 'Cement stock running low at Residential Tower', time: '6 hours ago', status: 'warning' },
    { id: 4, type: 'delivery', message: 'Sand delivery scheduled for tomorrow', time: '8 hours ago', status: 'info' },
    { id: 5, type: 'approval', message: 'Gravel purchase approved by project manager', time: '1 day ago', status: 'success' }
  ]);

  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    category: "",
    quantity: "",
    unit: "",
    unitPrice: "",
    supplier: "",
    site: ""
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: purchasedItems.length + 1,
      item: newItem.item,
      category: newItem.category,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      unitPrice: parseFloat(newItem.unitPrice),
      totalPrice: parseFloat(newItem.quantity) * parseFloat(newItem.unitPrice),
      supplier: newItem.supplier,
      purchaseDate: new Date().toISOString().split('T')[0],
      site: newItem.site,
      status: "Pending"
    };
    setPurchasedItems([...purchasedItems, item]);
    setNewItem({ item: "", category: "", quantity: "", unit: "", unitPrice: "", supplier: "", site: "" });
    setShowAddItem(false);
    updateInventoryData();
  };

  const updateInventoryData = () => {
    const total = purchasedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const consumed = purchasedItems.filter(item => item.status === 'Delivered').reduce((sum, item) => sum + item.totalPrice, 0);
    const balance = total - consumed;
    
    setInventoryData({
      totalAmount: total,
      consumedAmount: consumed,
      balanceAmount: balance
    });
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setInventoryData(prev => ({
        ...prev,
        totalAmount: prev.totalAmount + Math.floor(Math.random() * 10000),
        consumedAmount: prev.consumedAmount + Math.floor(Math.random() * 5000)
      }));
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "In Transit": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'delivery': return <Truck className="w-4 h-4 text-green-500" />;
      case 'purchase': return <Package className="w-4 h-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredItems = purchasedItems.filter(item => {
    const matchesSite = selectedSite === "all" || item.site === selectedSite;
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSite && matchesSearch && matchesCategory;
  });

  const categoryTotals = filteredItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += item.totalPrice;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    updateInventoryData();
  }, [purchasedItems]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setInventoryData(prev => ({
        ...prev,
        totalAmount: prev.totalAmount + Math.floor(Math.random() * 1000),
        consumedAmount: prev.consumedAmount + Math.floor(Math.random() * 500)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory and Assets Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track and manage your inventory across all sites</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Inventory and Assets Dashboard</span>
        </div>

        {/* Site Filter */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm font-medium text-foreground">Site:</span>
          <div className="flex items-center gap-2">
            <select 
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground min-w-[200px]"
            >
              {sites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
              />
            </div>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Categories</option>
              <option value="construction">Construction Materials</option>
              <option value="structural">Structural Materials</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
            </select>
          </div>
          <button 
            onClick={() => setShowAddItem(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Purchased Items Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              PURCHASED ITEMS BY REGION / SITE
            </h2>
            
            {filteredItems.length === 0 ? (
              <div className="bg-card rounded-xl p-8 shadow-card">
                <div className="text-center text-muted-foreground mb-8">
                  <Package className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">No data found for selected site.</p>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl p-8 shadow-card">
                {/* Category Totals */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm font-medium text-muted-foreground">Category</div>
                    <div className="text-sm font-medium text-muted-foreground">Amount</div>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(categoryTotals).map(([category, amount]) => (
                      <div key={category} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-foreground">{category}</span>
                        <span className="text-foreground font-medium">${amount.toLocaleString()}</span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center py-2 font-semibold bg-muted/50 px-4 py-3 rounded-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Item</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Quantity</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Unit Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Total Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Supplier</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Site</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm text-foreground font-medium">{item.item}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{item.quantity} {item.unit}</td>
                          <td className="px-6 py-4 text-sm text-foreground">${item.unitPrice.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-foreground font-medium">${item.totalPrice.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{item.supplier}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {sites.find(s => s.id === item.site)?.name || item.site}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-1 hover:bg-muted rounded">
                                <Eye className="w-4 h-4 text-blue-500" />
                              </button>
                              <button className="p-1 hover:bg-muted rounded">
                                <Edit className="w-4 h-4 text-green-500" />
                              </button>
                              <button className="p-1 hover:bg-muted rounded">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Inventory Summary Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Inventory Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">${(inventoryData.totalAmount / 1000000).toFixed(2)}M</div>
                  <div className="text-sm text-muted-foreground">Total Inventory Amount</div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">${(inventoryData.consumedAmount / 1000000).toFixed(2)}M</div>
                  <div className="text-sm text-muted-foreground">Consumed Inventory Amount</div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">${(inventoryData.balanceAmount / 1000000).toFixed(2)}M</div>
                  <div className="text-sm text-muted-foreground">Balance Inventory Amount</div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activities</h2>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Add Item Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 shadow-card w-full max-w-2xl mx-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New Item</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Item Name *</label>
                    <input 
                      type="text" 
                      value={newItem.item}
                      onChange={(e) => setNewItem({...newItem, item: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                    <select 
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Construction Materials">Construction Materials</option>
                      <option value="Structural Materials">Structural Materials</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quantity *</label>
                    <input 
                      type="number" 
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Unit *</label>
                    <select 
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Unit</option>
                      <option value="m³">m³</option>
                      <option value="tons">tons</option>
                      <option value="bags">bags</option>
                      <option value="kg">kg</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Unit Price *</label>
                    <input 
                      type="number" 
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({...newItem, unitPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Supplier *</label>
                    <input 
                      type="text" 
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Site *</label>
                    <select 
                      value={newItem.site}
                      onChange={(e) => setNewItem({...newItem, site: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    >
                      <option value="">Select Site</option>
                      {sites.filter(site => site.id !== "all").map(site => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowAddItem(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InventoryDashboard;