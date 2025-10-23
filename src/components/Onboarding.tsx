import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Users, BarChart3, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to Your Dashboard! 🎉",
      description: `Hi ${user?.name}! Let's take a quick tour of your new workspace.`,
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-ids-cyan/10 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">What you'll discover:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Real-time project tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Team collaboration tools
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Smart notifications
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Your Role & Permissions 👑",
      description: `As a ${user?.role.replace('_', ' ').toLowerCase()}, you have access to:`,
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Your capabilities:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {user?.permissions.slice(0, 6).map((permission, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground">
                    {permission.replace('_', ' ').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
            {user?.permissions.length > 6 && (
              <div className="text-xs text-muted-foreground mt-2">
                +{user.permissions.length - 6} more permissions
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Navigation Made Easy 🧭",
      description: "Find everything you need with our intuitive sidebar",
      icon: <BarChart3 className="w-12 h-12 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Quick navigation tips:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Use the sidebar to access different sections
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Click on your profile to access settings
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Notifications keep you updated in real-time
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Search and filter options are available everywhere
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Team Collaboration 👥",
      description: "Work together seamlessly with your team",
      icon: <Users className="w-12 h-12 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Collaboration features:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                See who's online in real-time
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Share documents and updates instantly
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Get notified of important changes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Track project progress together
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set! 🚀",
      description: "Ready to start managing your projects like a pro",
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Pro tips to get started:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Explore the Enhanced Dashboard for advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Set up your profile and preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Check out the help section if you need assistance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                Start by creating your first project
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {steps[currentStep].icon}
              <div>
                <h2 className="text-xl font-bold text-foreground">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            {steps[currentStep].content}
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip Tour
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
