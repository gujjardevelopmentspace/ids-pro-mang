import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle, Building, MapPin, Users, Download, Send, Package, Tag, Ruler, ShoppingCart } from "lucide-react";

const Items = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Items</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Items</span>
        </div>

        {/* Items Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Items</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search items..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Categories</option>
                  <option>Construction Materials</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Tools & Equipment</option>
                  <option>Safety Equipment</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>All Units</option>
                  <option>Pieces</option>
                  <option>Meters</option>
                  <option>Kilograms</option>
                  <option>Liters</option>
                  <option>Square Meters</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Item ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Unit</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Supplier</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Created By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#ITM-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Steel Rebar 12mm</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Construction Materials</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Meters</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$15.50</td>
                    <td className="px-6 py-4 text-sm text-foreground">250</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Steel Suppliers Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#ITM-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Electrical Cable 2.5mm</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Electrical</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Meters</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$8.75</td>
                    <td className="px-6 py-4 text-sm text-foreground">500</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Electrical Supplies Co</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">John Doe</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#ITM-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">PVC Pipe 4 inch</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Plumbing</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Meters</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$12.30</td>
                    <td className="px-6 py-4 text-sm text-foreground">0</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Out of Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Plumbing Solutions</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#ITM-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Safety Helmet</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Safety Equipment</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Pieces</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$25.00</td>
                    <td className="px-6 py-4 text-sm text-foreground">50</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Low Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Safety First Ltd</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mike Johnson</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#ITM-005</td>
                    <td className="px-6 py-4 text-sm text-foreground">Concrete Mixer</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Tools & Equipment</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Pieces</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">$2,500.00</td>
                    <td className="px-6 py-4 text-sm text-foreground">3</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Equipment Rentals</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Sarah Wilson</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Categories</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search categories..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Construction Materials</h3>
                      <p className="text-sm text-muted-foreground">45 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Steel, concrete, bricks, and other construction materials</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Electrical</h3>
                      <p className="text-sm text-muted-foreground">32 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Cables, switches, outlets, and electrical components</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Plumbing</h3>
                      <p className="text-sm text-muted-foreground">28 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Pipes, fittings, valves, and plumbing fixtures</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Tools & Equipment</h3>
                      <p className="text-sm text-muted-foreground">18 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Hand tools, power tools, and construction equipment</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Safety Equipment</h3>
                      <p className="text-sm text-muted-foreground">15 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Helmets, gloves, safety vests, and protective gear</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Finishing Materials</h3>
                      <p className="text-sm text-muted-foreground">22 items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Paint, tiles, flooring, and finishing materials</p>
              </div>
            </div>
          </div>
        </section>

        {/* Unit Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Unit</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search units..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Unit
                </button>
              </div>
            </div>

            {/* Units Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Unit ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Unit Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Symbol</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Items Count</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Created By</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#UNT-001</td>
                    <td className="px-6 py-4 text-sm text-foreground">Pieces</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">pcs</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Count</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Individual items or units</td>
                    <td className="px-6 py-4 text-sm text-foreground">25</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">AHSAN UL HAQ</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#UNT-002</td>
                    <td className="px-6 py-4 text-sm text-foreground">Meters</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">m</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Length</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Linear measurement unit</td>
                    <td className="px-6 py-4 text-sm text-foreground">18</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">John Doe</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#UNT-003</td>
                    <td className="px-6 py-4 text-sm text-foreground">Kilograms</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">kg</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Weight</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Weight measurement unit</td>
                    <td className="px-6 py-4 text-sm text-foreground">12</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Jane Smith</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#UNT-004</td>
                    <td className="px-6 py-4 text-sm text-foreground">Liters</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">L</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Volume</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Volume measurement unit</td>
                    <td className="px-6 py-4 text-sm text-foreground">8</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Mike Johnson</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 text-sm text-foreground">#UNT-005</td>
                    <td className="px-6 py-4 text-sm text-foreground">Square Meters</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">m²</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Area</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Area measurement unit</td>
                    <td className="px-6 py-4 text-sm text-foreground">6</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Sarah Wilson</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Items Statistics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Items Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">156</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">128</div>
                <div className="text-sm text-muted-foreground">In Stock</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">18</div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">10</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bulk Import</h3>
                <p className="text-sm text-muted-foreground mb-4">Import multiple items from CSV</p>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Bulk Import
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Export Items</h3>
                <p className="text-sm text-muted-foreground mb-4">Generate items report</p>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Export Items
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Inventory Check</h3>
                <p className="text-sm text-muted-foreground mb-4">Perform inventory audit</p>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Start Check
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Items;
