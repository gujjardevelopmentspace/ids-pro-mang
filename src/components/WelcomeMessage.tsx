import { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, TrendingUp, Users, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const WelcomeMessage = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Show welcome message for new users or first visit of the day
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (!lastVisit || lastVisit !== today) {
      setIsVisible(true);
      localStorage.setItem('lastVisit', today);
    }

    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to tackle today's challenges?",
      "Let's make today productive!",
      "Your projects are waiting for you.",
      "Time to create something amazing!",
      "Every great project starts with a single step."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getQuickStats = () => {
    return [
      { label: 'Active Projects', value: '12', icon: <TrendingUp className="w-4 h-4" />, color: 'text-blue-500' },
      { label: 'Team Members', value: '8', icon: <Users className="w-4 h-4" />, color: 'text-green-500' },
      { label: 'Tasks Today', value: '5', icon: <Calendar className="w-4 h-4" />, color: 'text-purple-500' }
    ];
  };

  if (!isVisible || !user) return null;

  return (
    <div className="bg-gradient-to-r from-primary/10 via-ids-cyan/10 to-primary/10 border border-primary/20 rounded-xl p-6 mb-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ids-cyan/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-0 right-0 p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-1">
              {getGreeting()}, {user.name}! 👋
            </h2>
            <p className="text-muted-foreground mb-4">
              {getMotivationalMessage()}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {getQuickStats().map((stat, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                View Dashboard
              </button>
              <button className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 text-foreground rounded-lg text-sm font-medium hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
                Check Notifications
              </button>
              <button className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 text-foreground rounded-lg text-sm font-medium hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
                Start New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
