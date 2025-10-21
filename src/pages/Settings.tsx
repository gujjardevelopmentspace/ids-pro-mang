import { DashboardLayout } from "@/components/DashboardLayout";
import { Upload, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Settings</span>
        </div>

        {/* Brand Settings */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Brand Settings</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card space-y-6">
            {/* Company Logo */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Company Logo</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Logo</span>
                    </div>
                    <div className="flex-1">
                      <input type="file" className="hidden" id="company-logo" />
                      <label htmlFor="company-logo" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose file here
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">No file chosen</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Dark Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Dark</span>
                    </div>
                    <div className="flex-1">
                      <input type="file" className="hidden" id="dark-logo" />
                      <label htmlFor="dark-logo" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose file here
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">No file chosen</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Light Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Light</span>
                    </div>
                    <div className="flex-1">
                      <input type="file" className="hidden" id="light-logo" />
                      <label htmlFor="light-logo" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose file here
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">No file chosen</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Favicon</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Favicon</span>
                    </div>
                    <div className="flex-1">
                      <input type="file" className="hidden" id="favicon" />
                      <label htmlFor="favicon" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose file here
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">No file chosen</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* App Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">App Name *</label>
                <input 
                  type="text" 
                  defaultValue="EZY PRO" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-1">7/50</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Footer Text</label>
                <input 
                  type="text" 
                  defaultValue="© 2023 TicketGo" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-1">16/100</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Default Language</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Ar</option>
                  <option>En</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Enable RTL</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Email Settings */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Email Settings</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Driver *</label>
                <input 
                  type="text" 
                  placeholder="Mail Driver *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Host *</label>
                <input 
                  type="text" 
                  placeholder="Mail Host *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Port *</label>
                <input 
                  type="text" 
                  placeholder="Mail Port *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Username *</label>
                <input 
                  type="text" 
                  placeholder="Mail Username *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Password *</label>
                <div className="relative">
                  <input 
                    type={showPasswords.mailPassword ? "text" : "password"} 
                    placeholder="Mail Password *" 
                    className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground"
                  />
                  <button 
                    type="button"
                    onClick={() => togglePasswordVisibility('mailPassword')}
                    className="absolute right-3 top-2.5"
                  >
                    {showPasswords.mailPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail Encryption *</label>
                <input 
                  type="text" 
                  placeholder="Mail Encryption *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail From Address *</label>
                <input 
                  type="email" 
                  placeholder="Mail From Address *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mail From Name *</label>
                <input 
                  type="text" 
                  placeholder="Mail From Name *" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Settings */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Company Settings</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zip/Post Code *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telephone *</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Application URL *</label>
                <input 
                  type="url" 
                  defaultValue="https://manage.ezypro.net" 
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cache Settings */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Cache Settings</h2>
          
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-4">
              This is a page meant for more advanced users, simply ignore it if you don't understand what cache is.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Current cache size</span>
              <span className="text-sm font-bold text-blue-500">3.3261 MB</span>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
