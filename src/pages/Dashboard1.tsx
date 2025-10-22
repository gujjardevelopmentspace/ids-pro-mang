import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Package, Truck, DollarSign, BarChart3, PieChart, RefreshCw } from "lucide-react";

const Dashboard1 = () => {
  const [projectData, setProjectData] = useState({
    contractAmount: 2500000,
    workDoneAmount: 1800000,
    approvedIpcAmount: 1500000,
    remainingAmount: 700000
  });

  const [materialData, setMaterialData] = useState({
    totalInventory: { quantity: 0, amount: 0 },
    consumedInventory: { quantity: 0, amount: 0 },
    balanceInventory: { quantity: 0, amount: 0 }
  });

  const [materials, setMaterials] = useState([
    { id: 1, name: "Concrete", quantity: 150, unit: "m³", cost: 45000, status: "In Stock", consumption: 75, supplier: "Concrete Corp" },
    { id: 2, name: "Steel", quantity: 25, unit: "tons", cost: 125000, status: "Available", consumption: 60, supplier: "Steel Works" },
    { id: 3, name: "Cement", quantity: 50, unit: "bags", cost: 15000, status: "Low Stock", consumption: 45, supplier: "Cement Ltd" },
    { id: 4, name: "Sand", quantity: 200, unit: "m³", cost: 8000, status: "Critical", consumption: 90, supplier: "Sand Supply" },
    { id: 5, name: "Gravel", quantity: 100, unit: "m³", cost: 12000, status: "In Stock", consumption: 30, supplier: "Gravel Co" },
    { id: 6, name: "Rebar", quantity: 15, unit: "tons", cost: 75000, status: "Available", consumption: 55, supplier: "Rebar Inc" }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'delivery', message: 'Concrete delivery received - 50m³', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'consumption', message: 'Steel consumption updated - 5 tons used', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'alert', message: 'Sand stock critically low - reorder needed', time: '6 hours ago', status: 'warning' },
    { id: 4, type: 'approval', message: 'Cement purchase order approved', time: '8 hours ago', status: 'success' },
    { id: 5, type: 'delivery', message: 'Gravel delivery scheduled for tomorrow', time: '1 day ago', status: 'info' }
  ]);

  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    unit: "",
    cost: "",
    supplier: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const material = {
      id: materials.length + 1,
      name: newMaterial.name,
      quantity: parseFloat(newMaterial.quantity),
      unit: newMaterial.unit,
      cost: parseFloat(newMaterial.cost),
      status: "In Stock",
      consumption: 0,
      supplier: newMaterial.supplier
    };
    setMaterials([...materials, material]);
    setNewMaterial({ name: "", quantity: "", unit: "", cost: "", supplier: "" });
    setShowAddMaterial(false);
    updateMaterialData();
  };

  const updateMaterialData = () => {
    const totalQty = materials.reduce((sum, m) => sum + m.quantity, 0);
    const totalAmount = materials.reduce((sum, m) => sum + m.cost, 0);
    const consumedQty = materials.reduce((sum, m) => sum + (m.quantity * m.consumption / 100), 0);
    const consumedAmount = materials.reduce((sum, m) => sum + (m.cost * m.consumption / 100), 0);
    
    setMaterialData({
      totalInventory: { quantity: totalQty, amount: totalAmount },
      consumedInventory: { quantity: consumedQty, amount: consumedAmount },
      balanceInventory: { quantity: totalQty - consumedQty, amount: totalAmount - consumedAmount }
    });
  };

  const updateMaterialConsumption = (id: number, consumption: number) => {
    setMaterials(materials.map(material => 
      material.id === id 
        ? { ...material, consumption: Math.min(100, Math.max(0, consumption)) }
        : material
    ));
    updateMaterialData();
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setProjectData(prev => ({
        ...prev,
        workDoneAmount: prev.workDoneAmount + Math.floor(Math.random() * 10000),
        approvedIpcAmount: prev.approvedIpcAmount + Math.floor(Math.random() * 5000)
      }));
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Available": return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "Low Stock": return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border border-red-500/30";
      default: return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'delivery': return <Truck className="w-4 h-4 text-green-500" />;
      case 'consumption': return <BarChart3 className="w-4 h-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    updateMaterialData();
  }, [materials]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProjectData(prev => ({
        ...prev,
        workDoneAmount: prev.workDoneAmount + Math.floor(Math.random() * 1000),
        approvedIpcAmount: prev.approvedIpcAmount + Math.floor(Math.random() * 500)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      {/* Top Header/Summary Bar */}
      <div className="bg-card p-4 shadow-card border-b border-border">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-ids-cyan mr-2 rounded-full"></span>
              <span className="text-sm font-medium text-foreground">BOQ AMOUNT</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-orange-500 mr-2 rounded-full"></span>
              <span className="text-sm font-medium text-foreground">UNAPPROVED AMOUNT</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
              <span className="text-sm font-medium text-foreground">APPROVED AMOUNT</span>
            </div>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">Project</div>
          <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">Contract Amount</div>
          <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">Work done Amount</div>
          <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">APPROVED IPC AMOUNT</div>
          <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">Remaining Amount</div>
        </div>
        <div className="grid grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden mt-1">
          <div className="bg-primary/10 p-3 text-sm font-medium text-foreground">Downtown Office Complex</div>
          <div className="bg-card p-3 text-sm font-medium text-ids-cyan">${projectData.contractAmount.toLocaleString()}</div>
          <div className="bg-card p-3 text-sm font-medium text-green-500">${projectData.workDoneAmount.toLocaleString()}</div>
          <div className="bg-card p-3 text-sm font-medium text-ids-cyan">${projectData.approvedIpcAmount.toLocaleString()}</div>
          <div className="bg-card p-3 text-sm font-medium text-blue-400">${projectData.remainingAmount.toLocaleString()}</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard 1</h1>
            <p className="text-muted-foreground mt-2">Material consumption tracking and project monitoring</p>
          </div>
          <button 
            onClick={() => setShowAddMaterial(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Material
          </button>
        </div>

        {/* Material Consumption Section */}
        <section>
          <div className="flex items-baseline mb-4">
            <h2 className="text-xl font-bold text-foreground mr-4">Material Consumption</h2>
            <span className="text-sm text-muted-foreground">INVENTORY WITH PERCENTAGE</span>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-5xl font-bold text-center text-foreground my-8">
              {materialData.totalInventory.amount > 0 ? 
                Math.round((materialData.consumedInventory.amount / materialData.totalInventory.amount) * 100) : 0}%
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">{materialData.totalInventory.quantity.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Total Quantity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">{materialData.consumedInventory.quantity.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Consumed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">{materialData.balanceInventory.quantity.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Balance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Material Details Table/Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">MATERIAL</h2>
            <button className="px-4 py-2 border rounded-lg text-sm text-muted-foreground hover:bg-accent">All Items</button>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-sm font-medium text-muted-foreground">Quantity:</div>
              <div className="text-sm font-medium text-muted-foreground">Amount:</div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-blue-500 font-medium">Total Inventory Quantity / Amount</span>
                <div className="flex justify-between">
                  <span className="text-foreground">{materialData.totalInventory.quantity.toFixed(0)}</span>
                  <span className="text-foreground">${materialData.totalInventory.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-orange-500 font-medium">Consumed Inventory Quantity / Amount</span>
                <div className="flex justify-between">
                  <span className="text-foreground">{materialData.consumedInventory.quantity.toFixed(0)}</span>
                  <span className="text-foreground">${materialData.consumedInventory.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-green-500 font-medium">Balance Inventory Quantity / Amount</span>
                <div className="flex justify-between">
                  <span className="text-foreground">{materialData.balanceInventory.quantity.toFixed(0)}</span>
                  <span className="text-foreground">${materialData.balanceInventory.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Material List */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Material Details</h2>
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Material</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Cost</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Consumption</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => (
                    <tr key={material.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm text-foreground">{material.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{material.quantity} {material.unit}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">${material.cost.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                          {material.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                material.consumption > 80 ? 'bg-red-500' :
                                material.consumption > 60 ? 'bg-yellow-500' :
                                material.consumption > 40 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{width: `${material.consumption}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{material.consumption}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateMaterialConsumption(material.id, material.consumption - 5)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          </button>
                          <button 
                            onClick={() => updateMaterialConsumption(material.id, material.consumption + 5)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          </button>
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
        </section>

        {/* Recent Activities */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activities</h2>
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

        {/* Add Material Modal */}
        {showAddMaterial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 shadow-card w-full max-w-md mx-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New Material</h2>
              <form onSubmit={handleAddMaterial} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Material Name *</label>
                  <input 
                    type="text" 
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quantity *</label>
                    <input 
                      type="number" 
                      value={newMaterial.quantity}
                      onChange={(e) => setNewMaterial({...newMaterial, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Unit *</label>
                    <select 
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cost *</label>
                    <input 
                      type="number" 
                      value={newMaterial.cost}
                      onChange={(e) => setNewMaterial({...newMaterial, cost: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Supplier *</label>
                    <input 
                      type="text" 
                      value={newMaterial.supplier}
                      onChange={(e) => setNewMaterial({...newMaterial, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowAddMaterial(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Material
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

export default Dashboard1;