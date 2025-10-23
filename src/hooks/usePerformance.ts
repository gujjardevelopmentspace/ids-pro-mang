import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  renderTime: number;
  userInteractions: number;
}

export interface PerformanceConfig {
  enableMetrics: boolean;
  sampleRate: number; // 0-1, percentage of users to track
  maxMetricsHistory: number;
}

export const usePerformance = (config: PerformanceConfig = {
  enableMetrics: true,
  sampleRate: 0.1,
  maxMetricsHistory: 100
}) => {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  // Performance monitoring
  useEffect(() => {
    if (!config.enableMetrics || !user || !currentTenant) return;

    // Only track a percentage of users to reduce overhead
    if (Math.random() > config.sampleRate) return;

    setIsTracking(true);
    startPerformanceMonitoring();

    return () => {
      setIsTracking(false);
    };
  }, [user, currentTenant, config.enableMetrics, config.sampleRate]);

  const startPerformanceMonitoring = useCallback(() => {
    // Monitor page load time
    const pageLoadTime = performance.now();
    
    // Monitor memory usage
    const getMemoryUsage = () => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }
      return 0;
    };

    // Monitor API response times
    const originalFetch = window.fetch;
    let apiResponseTime = 0;
    let apiCallCount = 0;

    window.fetch = async (...args) => {
      const start = performance.now();
      const response = await originalFetch(...args);
      const end = performance.now();
      
      apiResponseTime += (end - start);
      apiCallCount++;
      
      return response;
    };

    // Monitor render times
    let renderStart = performance.now();
    const measureRender = () => {
      const renderTime = performance.now() - renderStart;
      recordMetric({
        pageLoadTime,
        apiResponseTime: apiCallCount > 0 ? apiResponseTime / apiCallCount : 0,
        memoryUsage: getMemoryUsage(),
        renderTime,
        userInteractions: 0
      });
      renderStart = performance.now();
    };

    // Monitor user interactions
    let interactionCount = 0;
    const trackInteraction = () => {
      interactionCount++;
    };

    // Add event listeners
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    document.addEventListener('scroll', trackInteraction);

    // Measure performance periodically
    const performanceInterval = setInterval(measureRender, 5000);

    // Cleanup function
    return () => {
      clearInterval(performanceInterval);
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
      document.removeEventListener('scroll', trackInteraction);
      window.fetch = originalFetch;
    };
  }, []);

  const recordMetric = useCallback((metric: PerformanceMetrics) => {
    setMetrics(prev => {
      const newMetrics = [...prev, metric];
      return newMetrics.slice(-config.maxMetricsHistory);
    });
  }, [config.maxMetricsHistory]);

  // Performance optimization utilities
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  }, []);

  const throttle = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }, []);

  // Memoization helper
  const memoize = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    dependencies: any[]
  ): T => {
    return useMemo(() => func, dependencies) as T;
  }, []);

  // Lazy loading helper
  const lazyLoad = useCallback((importFunc: () => Promise<any>) => {
    return React.lazy(importFunc);
  }, []);

  // Performance analytics
  const getPerformanceAnalytics = useMemo(() => {
    if (metrics.length === 0) return null;

    const avgPageLoadTime = metrics.reduce((sum, m) => sum + m.pageLoadTime, 0) / metrics.length;
    const avgApiResponseTime = metrics.reduce((sum, m) => sum + m.apiResponseTime, 0) / metrics.length;
    const avgMemoryUsage = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length;
    const avgRenderTime = metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length;
    const totalInteractions = metrics.reduce((sum, m) => sum + m.userInteractions, 0);

    return {
      avgPageLoadTime,
      avgApiResponseTime,
      avgMemoryUsage,
      avgRenderTime,
      totalInteractions,
      sampleSize: metrics.length,
      performanceScore: calculatePerformanceScore({
        avgPageLoadTime,
        avgApiResponseTime,
        avgMemoryUsage,
        avgRenderTime
      })
    };
  }, [metrics]);

  const calculatePerformanceScore = (metrics: {
    avgPageLoadTime: number;
    avgApiResponseTime: number;
    avgMemoryUsage: number;
    avgRenderTime: number;
  }) => {
    // Simple scoring algorithm (0-100)
    const pageLoadScore = Math.max(0, 100 - (metrics.avgPageLoadTime / 10));
    const apiScore = Math.max(0, 100 - (metrics.avgApiResponseTime / 5));
    const memoryScore = Math.max(0, 100 - (metrics.avgMemoryUsage / 2));
    const renderScore = Math.max(0, 100 - (metrics.avgRenderTime / 5));

    return Math.round((pageLoadScore + apiScore + memoryScore + renderScore) / 4);
  };

  // Performance recommendations
  const getRecommendations = useMemo(() => {
    const recommendations: string[] = [];
    
    if (getPerformanceAnalytics) {
      const { avgPageLoadTime, avgApiResponseTime, avgMemoryUsage, avgRenderTime } = getPerformanceAnalytics;
      
      if (avgPageLoadTime > 3000) {
        recommendations.push('Consider implementing code splitting to reduce initial bundle size');
      }
      
      if (avgApiResponseTime > 1000) {
        recommendations.push('API response times are slow. Consider implementing caching or optimizing backend queries');
      }
      
      if (avgMemoryUsage > 100) {
        recommendations.push('High memory usage detected. Consider implementing memory optimization techniques');
      }
      
      if (avgRenderTime > 16) {
        recommendations.push('Render times are slow. Consider implementing virtualization for large lists');
      }
    }
    
    return recommendations;
  }, [getPerformanceAnalytics]);

  return {
    metrics,
    isTracking,
    getPerformanceAnalytics,
    getRecommendations,
    debounce,
    throttle,
    memoize,
    lazyLoad,
    recordMetric
  };
};

// React import for lazy loading
import React from 'react';
