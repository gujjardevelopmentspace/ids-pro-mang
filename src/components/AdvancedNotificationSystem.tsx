import { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  Heart, 
  Zap, 
  Rocket, 
  Sparkles, 
  Crown, 
  Award, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Globe, 
  Building, 
  Users, 
  Settings, 
  Mail, 
  Phone, 
  MessageSquare, 
  Video, 
  Calendar, 
  FileText, 
  Download, 
  Upload, 
  Share2, 
  Lock, 
  Unlock, 
  Shield, 
  Key, 
  Eye, 
  EyeOff, 
  Plus, 
  Minus, 
  Edit, 
  Trash2, 
  Save, 
  RefreshCw, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Link,
  Bookmark,
  Flag,
  Archive,
  Trash,
  Restore,
  Pin,
  Unpin
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'system' | 'project' | 'team' | 'security' | 'update' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  action?: {
    label: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
  metadata?: {
    projectId?: string;
    userId?: string;
    organizationId?: string;
    departmentId?: string;
    taskId?: string;
    documentId?: string;
  };
  expiresAt?: string;
  tags: string[];
  source: string;
  avatar?: string;
  attachments?: {
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
  sound: boolean;
  categories: {
    [key: string]: boolean;
  };
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

const AdvancedNotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'project',
      title: 'Project Milestone Reached',
      message: 'Downtown Office Complex has reached 65% completion milestone. Great progress!',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'Project Updates',
      action: {
        label: 'View Project',
        url: '/projects/1',
        method: 'GET'
      },
      metadata: {
        projectId: '1'
      },
      tags: ['milestone', 'progress', 'celebration'],
      source: 'Project Management System',
      avatar: '/avatars/project.jpg'
    },
    {
      id: '2',
      type: 'team',
      title: 'New Team Member Added',
      message: 'Sarah Johnson has been added to the Residential Tower project team.',
      timestamp: '2024-01-20T09:15:00Z',
      read: false,
      priority: 'medium',
      category: 'Team Updates',
      action: {
        label: 'View Team',
        url: '/team',
        method: 'GET'
      },
      metadata: {
        projectId: '2',
        userId: '2'
      },
      tags: ['team', 'new-member', 'collaboration'],
      source: 'Team Management',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: '3',
      type: 'security',
      title: 'Security Alert',
      message: 'Unusual login activity detected from IP address 192.168.1.100. Please verify if this was you.',
      timestamp: '2024-01-20T08:45:00Z',
      read: false,
      priority: 'urgent',
      category: 'Security',
      action: {
        label: 'Review Activity',
        url: '/security/activity',
        method: 'GET'
      },
      metadata: {
        userId: '1'
      },
      tags: ['security', 'login', 'alert'],
      source: 'Security System',
      avatar: '/avatars/security.jpg'
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Meeting Reminder',
      message: 'Project Review Meeting starts in 15 minutes. Join the video call.',
      timestamp: '2024-01-20T08:30:00Z',
      read: true,
      priority: 'high',
      category: 'Calendar',
      action: {
        label: 'Join Meeting',
        url: '/meetings/1',
        method: 'GET'
      },
      metadata: {
        projectId: '1'
      },
      tags: ['meeting', 'reminder', 'video-call'],
      source: 'Calendar System',
      avatar: '/avatars/calendar.jpg'
    },
    {
      id: '5',
      type: 'update',
      title: 'System Update Available',
      message: 'New features and improvements are available. Update now to get the latest enhancements.',
      timestamp: '2024-01-20T07:00:00Z',
      read: true,
      priority: 'medium',
      category: 'System Updates',
      action: {
        label: 'Update Now',
        url: '/settings/updates',
        method: 'GET'
      },
      tags: ['update', 'features', 'improvements'],
      source: 'System Administration',
      avatar: '/avatars/system.jpg'
    },
    {
      id: '6',
      type: 'success',
      title: 'Document Approved',
      message: 'Building plans for Residential Tower have been approved by the city planning department.',
      timestamp: '2024-01-19T16:20:00Z',
      read: true,
      priority: 'high',
      category: 'Document Updates',
      action: {
        label: 'View Document',
        url: '/documents/123',
        method: 'GET'
      },
      metadata: {
        projectId: '2',
        documentId: '123'
      },
      tags: ['approval', 'document', 'planning'],
      source: 'Document Management',
      avatar: '/avatars/document.jpg'
    }
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications);
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    sound: true,
    categories: {
      'Project Updates': true,
      'Team Updates': true,
      'Security': true,
      'Calendar': true,
      'System Updates': true,
      'Document Updates': true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  // Filter notifications
  useEffect(() => {
    let filtered = notifications;

    if (showUnreadOnly) {
      filtered = filtered.filter(n => !n.read);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(n => n.priority === filterPriority);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(n => n.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, filterType, filterPriority, filterCategory, searchTerm, showUnreadOnly]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'system': return <Settings className="w-5 h-5 text-purple-500" />;
      case 'project': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'team': return <Users className="w-5 h-5 text-pink-500" />;
      case 'security': return <Shield className="w-5 h-5 text-red-500" />;
      case 'update': return <RefreshCw className="w-5 h-5 text-cyan-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/10';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
              <button 
                onClick={markAllAsRead}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Check className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Bell className="w-4 h-4" />
              <span>{unreadCount} unread notifications</span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="unread-only"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="unread-only" className="text-sm text-foreground">Unread only</label>
          </div>

          <div className="space-y-2">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Types</option>
              <option value="project">Project</option>
              <option value="team">Team</option>
              <option value="security">Security</option>
              <option value="reminder">Reminder</option>
              <option value="update">Update</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>

            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Project Updates">Project Updates</option>
              <option value="Team Updates">Team Updates</option>
              <option value="Security">Security</option>
              <option value="Calendar">Calendar</option>
              <option value="System Updates">System Updates</option>
              <option value="Document Updates">Document Updates</option>
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                !notification.read ? 'bg-primary/5' : ''
              } ${getPriorityColor(notification.priority)}`}
              onClick={() => {
                setSelectedNotification(notification);
                markAsRead(notification.id);
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <img 
                      src={notification.avatar} 
                      alt={notification.source}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    getNotificationIcon(notification.type)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.category}
                    </span>
                    <div className="flex gap-1">
                      {notification.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNotification ? (
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Notification Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {selectedNotification.avatar ? (
                    <img 
                      src={selectedNotification.avatar} 
                      alt={selectedNotification.source}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      {getNotificationIcon(selectedNotification.type)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{selectedNotification.title}</h1>
                    <p className="text-sm text-muted-foreground">
                      {selectedNotification.source} • {getTimeAgo(selectedNotification.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => setSelectedNotification(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notification Content */}
              <div className="bg-card rounded-xl p-6 mb-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground mb-4">{selectedNotification.message}</p>
                  
                  {selectedNotification.metadata && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {selectedNotification.metadata.projectId && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">Project ID: {selectedNotification.metadata.projectId}</span>
                        </div>
                      )}
                      {selectedNotification.metadata.userId && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">User ID: {selectedNotification.metadata.userId}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedNotification.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedNotification.action && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        {selectedNotification.action.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notification selected</h3>
              <p className="text-muted-foreground">Click on a notification to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Notification Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Delivery Methods */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Delivery Methods</h4>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email', icon: Mail },
                    { key: 'push', label: 'Push Notifications', icon: Bell },
                    { key: 'sms', label: 'SMS', icon: Phone },
                    { key: 'desktop', label: 'Desktop', icon: Settings },
                    { key: 'sound', label: 'Sound', icon: Bell }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings[key as keyof NotificationSettings] as boolean}
                        onChange={(e) => setSettings({
                          ...settings,
                          [key]: e.target.checked
                        })}
                        className="rounded border-border"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Categories</h4>
                <div className="space-y-3">
                  {Object.entries(settings.categories).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-foreground">{category}</span>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          categories: {
                            ...settings.categories,
                            [category]: e.target.checked
                          }
                        })}
                        className="rounded border-border"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Frequency</h4>
                <select 
                  value={settings.frequency}
                  onChange={(e) => setSettings({
                    ...settings,
                    frequency: e.target.value as 'immediate' | 'hourly' | 'daily' | 'weekly'
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              {/* Quiet Hours */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Quiet Hours</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Enable Quiet Hours</span>
                    <input
                      type="checkbox"
                      checked={settings.quietHours.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        quietHours: {
                          ...settings.quietHours,
                          enabled: e.target.checked
                        }
                      })}
                      className="rounded border-border"
                    />
                  </div>
                  {settings.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Start Time</label>
                        <input
                          type="time"
                          value={settings.quietHours.start}
                          onChange={(e) => setSettings({
                            ...settings,
                            quietHours: {
                              ...settings.quietHours,
                              start: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">End Time</label>
                        <input
                          type="time"
                          value={settings.quietHours.end}
                          onChange={(e) => setSettings({
                            ...settings,
                            quietHours: {
                              ...settings.quietHours,
                              end: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save Settings
                </button>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedNotificationSystem;
