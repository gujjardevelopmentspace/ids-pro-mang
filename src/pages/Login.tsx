import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Code, Users, Zap, X, Send, Phone, MapPin } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      // Redirect will be handled by the auth context
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your interest! We'll contact you within 24 hours.");
      setShowContactModal(false);
      setContactForm({ name: "", email: "", company: "", message: "" });
      setIsSubmittingContact(false);
    }, 1500);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-ids-cyan/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-ids-cyan/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/ids-logo.png" 
              alt="INVENTOR Design Studio Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">INVENTOR Design Studio</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Software Development House</p>
        </div>

        {/* Login Form */}
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Ready to get back to work? Let's sign you in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="developer@inventerdesign.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Let's Go
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Quick Demo Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setEmail('admin@inventerdesign.com');
                  setPassword('admin123');
                }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left group"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">👑 Administrator</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Full system access</div>
              </button>
              <button
                onClick={() => {
                  setEmail('manager@inventerdesign.com');
                  setPassword('manager123');
                }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left group"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">📊 Project Manager</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Team & project oversight</div>
              </button>
              <button
                onClick={() => {
                  setEmail('engineer@inventerdesign.com');
                  setPassword('engineer123');
                }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left group"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">⚙️ Engineer</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Technical access</div>
              </button>
              <button
                onClick={() => {
                  setEmail('client@inventerdesign.com');
                  setPassword('client123');
                }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left group"
              >
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">👤 Client</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Project visibility</div>
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 text-center">
              Click any role above to auto-fill credentials
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New to the team?{" "}
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Get in touch with us
              </button>
            </p>
          </div>
        </div>

          {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Team Management</h3>
            <p className="text-xs text-muted-foreground">Manage your development team</p>
          </div>
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Code className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Code Repository</h3>
            <p className="text-xs text-muted-foreground">Track and manage code</p>
          </div>
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Live Analytics</h3>
            <p className="text-xs text-muted-foreground">Real-time project insights</p>
          </div>
        </div>
      </div>

      {/* Contact Admin Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Contact Admin</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>admin@inventerdesign.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Software Development House</span>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={contactForm.company}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="Tell us about your project requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmittingContact ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Request
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                We'll review your request and create an account for you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
