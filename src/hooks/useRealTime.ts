import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';

export interface RealTimeEvent {
  id: string;
  type: 'user_online' | 'user_offline' | 'data_update' | 'notification' | 'collaboration';
  userId: string;
  userName: string;
  data: any;
  timestamp: Date;
  tenantId: string;
}

export interface OnlineUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastSeen: Date;
  isActive: boolean;
}

export const useRealTime = () => {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!user || !currentTenant) return;

    // Simulate connection
    setIsConnected(true);
    
    // Simulate online users
    const mockOnlineUsers: OnlineUser[] = [
      {
        id: '1',
        name: 'System Administrator',
        email: 'admin@inventerdesign.com',
        role: 'Admin',
        lastSeen: new Date(),
        isActive: true
      },
      {
        id: '2',
        name: 'Project Manager',
        email: 'manager@inventerdesign.com',
        role: 'Project Manager',
        lastSeen: new Date(),
        isActive: true
      },
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastSeen: new Date(),
        isActive: true
      }
    ];

    setOnlineUsers(mockOnlineUsers);

    // Simulate real-time events
    const eventInterval = setInterval(() => {
      const mockEvents: RealTimeEvent[] = [
        {
          id: `event-${Date.now()}`,
          type: 'data_update',
          userId: '1',
          userName: 'System Administrator',
          data: { message: 'Project data updated' },
          timestamp: new Date(),
          tenantId: currentTenant.id
        },
        {
          id: `event-${Date.now() + 1}`,
          type: 'notification',
          userId: '2',
          userName: 'Project Manager',
          data: { message: 'New work order created' },
          timestamp: new Date(),
          tenantId: currentTenant.id
        }
      ];

      setEvents(prev => [...prev, ...mockEvents].slice(-50)); // Keep last 50 events
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(eventInterval);
      setIsConnected(false);
    };
  }, [user, currentTenant]);

  const sendEvent = useCallback((type: RealTimeEvent['type'], data: any) => {
    if (!user || !currentTenant) return;

    const event: RealTimeEvent = {
      id: `event-${Date.now()}`,
      type,
      userId: user.id,
      userName: user.name,
      data,
      timestamp: new Date(),
      tenantId: currentTenant.id
    };

    setEvents(prev => [...prev, event].slice(-50));
  }, [user, currentTenant]);

  const broadcastUpdate = useCallback((entityType: string, entityId: string, changes: any) => {
    sendEvent('data_update', {
      entityType,
      entityId,
      changes,
      message: `${entityType} updated`
    });
  }, [sendEvent]);

  const sendNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    sendEvent('notification', {
      message,
      type
    });
  }, [sendEvent]);

  const startCollaboration = useCallback((documentId: string, documentType: string) => {
    sendEvent('collaboration', {
      documentId,
      documentType,
      action: 'start_editing'
    });
  }, [sendEvent]);

  const endCollaboration = useCallback((documentId: string) => {
    sendEvent('collaboration', {
      documentId,
      action: 'stop_editing'
    });
  }, [sendEvent]);

  return {
    onlineUsers,
    events,
    isConnected,
    sendEvent,
    broadcastUpdate,
    sendNotification,
    startCollaboration,
    endCollaboration
  };
};
