// Real-time data service with WebSocket integration
import { wsService } from './realApi';

export interface RealTimeData {
  type: 'project_update' | 'user_activity' | 'notification' | 'collaboration' | 'system_status';
  payload: any;
  timestamp: string;
  userId?: string;
  projectId?: string;
  organizationId?: string;
}

export interface ProjectUpdate {
  projectId: string;
  field: string;
  oldValue: any;
  newValue: any;
  updatedBy: string;
  timestamp: string;
}

export interface UserActivity {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  metadata?: any;
}

export interface CollaborationEvent {
  sessionId: string;
  type: 'user_joined' | 'user_left' | 'message' | 'cursor_move' | 'selection_change';
  userId: string;
  data: any;
  timestamp: string;
}

export interface SystemStatus {
  status: 'online' | 'maintenance' | 'error';
  message?: string;
  services: {
    database: 'online' | 'offline' | 'slow';
    api: 'online' | 'offline' | 'slow';
    websocket: 'online' | 'offline' | 'slow';
    storage: 'online' | 'offline' | 'slow';
  };
  uptime: number;
  lastUpdate: string;
}

class RealTimeService {
  private listeners: Map<string, Set<Function>> = new Map();
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection() {
    // Connect to WebSocket
    wsService.connect();
    
    // Listen for connection events
    wsService.on('connected', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Real-time service connected');
      this.emit('connection_status', { connected: true });
    });

    wsService.on('disconnected', () => {
      this.isConnected = false;
      console.log('Real-time service disconnected');
      this.emit('connection_status', { connected: false });
      this.handleReconnect();
    });

    // In development mode, simulate immediate connection
    if (import.meta.env.DEV) {
      setTimeout(() => {
        this.isConnected = true;
        console.log('Real-time service connected (development mode)');
        this.emit('connection_status', { connected: true });
      }, 200);
    }

    // Listen for real-time data
    wsService.on('realtime_data', (data: RealTimeData) => {
      this.handleRealTimeData(data);
    });

    // Listen for specific event types
    wsService.on('project_update', (data: ProjectUpdate) => {
      this.emit('project_update', data);
    });

    wsService.on('user_activity', (data: UserActivity) => {
      this.emit('user_activity', data);
    });

    wsService.on('notification', (data: any) => {
      this.emit('notification', data);
    });

    wsService.on('collaboration', (data: CollaborationEvent) => {
      this.emit('collaboration', data);
    });

    wsService.on('system_status', (data: SystemStatus) => {
      this.emit('system_status', data);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        wsService.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('connection_error', { message: 'Unable to reconnect to real-time service' });
    }
  }

  private handleRealTimeData(data: RealTimeData) {
    // Emit the specific event type
    this.emit(data.type, data.payload);
    
    // Also emit a general realtime_data event
    this.emit('realtime_data', data);
  }

  // Subscribe to real-time events
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  // Emit events to listeners
  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in real-time event listener for ${event}:`, error);
        }
      });
    }
  }

  // Send data to server
  send(type: string, payload: any) {
    if (this.isConnected || import.meta.env.DEV) {
      wsService.send(type, payload);
    } else {
      console.warn('Real-time service not connected. Data not sent:', { type, payload });
    }
  }

  // Project-specific real-time methods
  subscribeToProject(projectId: string) {
    this.send('subscribe_project', { projectId });
  }

  unsubscribeFromProject(projectId: string) {
    this.send('unsubscribe_project', { projectId });
  }

  updateProjectField(projectId: string, field: string, value: any) {
    this.send('update_project_field', {
      projectId,
      field,
      value,
      timestamp: new Date().toISOString()
    });
  }

  // User activity tracking
  trackUserActivity(action: string, resource: string, resourceId: string, metadata?: any) {
    this.send('user_activity', {
      action,
      resource,
      resourceId,
      metadata,
      timestamp: new Date().toISOString()
    });
  }

  // Collaboration methods
  joinCollaborationSession(sessionId: string) {
    this.send('join_collaboration', { sessionId });
  }

  leaveCollaborationSession(sessionId: string) {
    this.send('leave_collaboration', { sessionId });
  }

  sendCollaborationMessage(sessionId: string, message: string) {
    this.send('collaboration_message', {
      sessionId,
      message,
      timestamp: new Date().toISOString()
    });
  }

  updateCursorPosition(sessionId: string, x: number, y: number) {
    this.send('cursor_position', {
      sessionId,
      x,
      y,
      timestamp: new Date().toISOString()
    });
  }

  updateSelection(sessionId: string, selection: any) {
    this.send('selection_update', {
      sessionId,
      selection,
      timestamp: new Date().toISOString()
    });
  }

  // Notification methods
  subscribeToNotifications() {
    this.send('subscribe_notifications', {});
  }

  unsubscribeFromNotifications() {
    this.send('unsubscribe_notifications', {});
  }

  markNotificationAsRead(notificationId: string) {
    this.send('mark_notification_read', { notificationId });
  }

  // System status
  getSystemStatus() {
    this.send('get_system_status', {});
  }

  // Connection status
  isServiceConnected() {
    return this.isConnected;
  }

  // Cleanup
  disconnect() {
    wsService.disconnect();
    this.listeners.clear();
    this.isConnected = false;
  }
}

// Export singleton instance
export const realTimeService = new RealTimeService();

// React hook for real-time data
export const useRealTime = (event: string, callback: Function, deps: any[] = []) => {
  // This hook should be used in React components that import useEffect
  // We'll handle the subscription directly in the component
  return {
    subscribe: () => realTimeService.on(event, callback),
    unsubscribe: () => realTimeService.off(event, callback)
  };
};

// React hook for project updates
export const useProjectUpdates = (projectId: string, callback: (update: ProjectUpdate) => void) => {
  // This hook should be used in React components that import useEffect
  return {
    subscribe: () => {
      realTimeService.subscribeToProject(projectId);
      return realTimeService.on('project_update', (update: ProjectUpdate) => {
        if (update.projectId === projectId) {
          callback(update);
        }
      });
    },
    unsubscribe: () => {
      realTimeService.unsubscribeFromProject(projectId);
    }
  };
};

// React hook for user activity
export const useUserActivity = (callback: (activity: UserActivity) => void) => {
  return {
    subscribe: () => realTimeService.on('user_activity', callback),
    unsubscribe: () => realTimeService.off('user_activity', callback)
  };
};

// React hook for notifications
export const useNotifications = (callback: (notification: any) => void) => {
  return {
    subscribe: () => {
      realTimeService.subscribeToNotifications();
      return realTimeService.on('notification', callback);
    },
    unsubscribe: () => {
      realTimeService.unsubscribeFromNotifications();
    }
  };
};

// React hook for collaboration
export const useCollaboration = (sessionId: string, callback: (event: CollaborationEvent) => void) => {
  return {
    subscribe: () => {
      realTimeService.joinCollaborationSession(sessionId);
      return realTimeService.on('collaboration', (event: CollaborationEvent) => {
        if (event.sessionId === sessionId) {
          callback(event);
        }
      });
    },
    unsubscribe: () => {
      realTimeService.leaveCollaborationSession(sessionId);
    }
  };
};

// React hook for system status
export const useSystemStatus = (callback: (status: SystemStatus) => void) => {
  return {
    subscribe: () => {
      realTimeService.getSystemStatus();
      return realTimeService.on('system_status', callback);
    },
    unsubscribe: () => realTimeService.off('system_status', callback)
  };
};

export default realTimeService;
