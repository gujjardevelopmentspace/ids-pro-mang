import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Code, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Demo credentials
    const demoCredentials = [
      { email: "admin@inventerdesign.com", password: "admin123", role: "Admin" },
      { email: "developer@inventerdesign.com", password: "dev123", role: "Developer" },
      { email: "manager@inventerdesign.com", password: "manager123", role: "Project Manager" },
      { email: "client@inventerdesign.com", password: "client123", role: "Client" }
    ];

    // Simulate API call
    setTimeout(() => {
      const user = demoCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (user) {
        // Store user session
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/";
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Code className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Inventer Design Studio</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Software Development House</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-card">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Sign in to your developer account</p>
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
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-3">Demo Credentials</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span>admin@inventerdesign.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>Developer:</span>
                <span>developer@inventerdesign.com / dev123</span>
              </div>
              <div className="flex justify-between">
                <span>Manager:</span>
                <span>manager@inventerdesign.com / manager123</span>
              </div>
              <div className="flex justify-between">
                <span>Client:</span>
                <span>client@inventerdesign.com / client123</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
                Contact Admin
              </Link>
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
    </div>
  );
};

export default Login;
