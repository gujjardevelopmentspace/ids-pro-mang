// Security utilities for the multi-user dashboard
export interface SecurityConfig {
  enableAuditLogging: boolean;
  enableDataEncryption: boolean;
  enableRateLimiting: boolean;
  enableCSRFProtection: boolean;
  sessionTimeout: number; // in minutes
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: any;
}

export interface SecurityPolicy {
  passwordMinLength: number;
  passwordRequireSpecialChars: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireUppercase: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
}

class SecurityManager {
  private config: SecurityConfig;
  private auditLogs: AuditLog[] = [];
  private securityPolicy: SecurityPolicy;

  constructor(config: SecurityConfig) {
    this.config = config;
    this.securityPolicy = {
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15
    };
  }

  // Password validation
  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < this.securityPolicy.passwordMinLength) {
      errors.push(`Password must be at least ${this.securityPolicy.passwordMinLength} characters long`);
    }

    if (this.securityPolicy.passwordRequireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (this.securityPolicy.passwordRequireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (this.securityPolicy.passwordRequireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Data sanitization
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .replace(/[;]/g, '') // Remove semicolons
      .trim();
  }

  // XSS protection
  escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // CSRF token generation
  generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Rate limiting
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const key = identifier;
    const record = this.rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  // Audit logging
  logAuditEvent(
    userId: string,
    action: string,
    resource: string,
    details?: any,
    ipAddress?: string,
    userAgent?: string
  ): void {
    if (!this.config.enableAuditLogging) return;

    const auditLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      action,
      resource,
      timestamp: new Date(),
      ipAddress,
      userAgent,
      details
    };

    this.auditLogs.push(auditLog);
    
    // Keep only last 1000 logs to prevent memory issues
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(-1000);
    }

    // In production, send to logging service
    console.log('Audit Log:', auditLog);
  }

  getAuditLogs(userId?: string, action?: string): AuditLog[] {
    let filteredLogs = this.auditLogs;

    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === userId);
    }

    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action);
    }

    return filteredLogs;
  }

  // Session management
  createSession(userId: string): { sessionId: string; expiresAt: Date } {
    const sessionId = this.generateCSRFToken();
    const expiresAt = new Date(Date.now() + this.securityPolicy.sessionTimeout * 60 * 1000);
    
    this.logAuditEvent(userId, 'SESSION_CREATED', 'session', { sessionId });
    
    return { sessionId, expiresAt };
  }

  validateSession(sessionId: string, userId: string): boolean {
    // In production, validate against stored sessions
    this.logAuditEvent(userId, 'SESSION_VALIDATED', 'session', { sessionId });
    return true;
  }

  // Data encryption (basic implementation)
  encryptData(data: string, key: string): string {
    if (!this.config.enableDataEncryption) return data;
    
    // Simple XOR encryption (not secure for production)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(encrypted);
  }

  decryptData(encryptedData: string, key: string): string {
    if (!this.config.enableDataEncryption) return encryptedData;
    
    try {
      const data = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(
          data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }

  // Permission validation
  validatePermission(userPermissions: string[], requiredPermission: string): boolean {
    return userPermissions.includes(requiredPermission);
  }

  // Input validation
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  // Security headers
  getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    };
  }

  // Security recommendations
  getSecurityRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.config.enableDataEncryption) {
      recommendations.push('Enable data encryption for sensitive information');
    }

    if (!this.config.enableAuditLogging) {
      recommendations.push('Enable audit logging for security monitoring');
    }

    if (!this.config.enableRateLimiting) {
      recommendations.push('Enable rate limiting to prevent abuse');
    }

    if (!this.config.enableCSRFProtection) {
      recommendations.push('Enable CSRF protection for form submissions');
    }

    return recommendations;
  }
}

// Create singleton instance
export const securityManager = new SecurityManager({
  enableAuditLogging: true,
  enableDataEncryption: true,
  enableRateLimiting: true,
  enableCSRFProtection: true,
  sessionTimeout: 30
});

// Export types
export type { SecurityConfig, AuditLog, SecurityPolicy };
