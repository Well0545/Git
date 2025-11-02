/**
 * Structured logger for the application.
 * Provides consistent logging across the backend.
 */

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogContext {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
  userId?: string;
  requestId?: string;
  duration?: number;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatContext(context: LogContext): string {
    const baseInfo = `[${context.timestamp}] [${context.level}]`;
    const requestInfo = context.requestId ? ` [${context.requestId}]` : "";
    const userInfo = context.userId ? ` [User: ${context.userId}]` : "";

    return `${baseInfo}${requestInfo}${userInfo} ${context.message}`;
  }

  private log(context: LogContext): void {
    const formatted = this.formatContext(context);

    // Always log to console in development
    if (this.isDevelopment) {
      const logData = {
        ...context.data,
        ...(context.error && { error: context.error }),
        ...(context.duration && { duration: `${context.duration}ms` }),
      };

      if (Object.keys(logData).length > 0) {
        console.log(formatted, logData);
      } else {
        console.log(formatted);
      }
    } else {
      // In production, use structured JSON logging
      const logEntry = {
        timestamp: context.timestamp,
        level: context.level,
        message: context.message,
        ...context.data,
        ...(context.error && { error: context.error }),
        ...(context.userId && { userId: context.userId }),
        ...(context.requestId && { requestId: context.requestId }),
        ...(context.duration && { duration: context.duration }),
      };

      console.log(JSON.stringify(logEntry));
    }
  }

  debug(message: string, data?: Record<string, unknown>, requestId?: string): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      data,
      requestId,
    });
  }

  info(message: string, data?: Record<string, unknown>, requestId?: string): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      data,
      requestId,
    });
  }

  warn(message: string, data?: Record<string, unknown>, requestId?: string): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      data,
      requestId,
    });
  }

  error(
    message: string,
    error?: Error,
    data?: Record<string, unknown>,
    requestId?: string
  ): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      data,
      error: error
        ? {
            message: error.message,
            stack: error.stack,
            code: (error as any).code,
          }
        : undefined,
      requestId,
    });
  }

  /**
   * Log database operation
   */
  logDbOperation(
    operation: string,
    duration: number,
    success: boolean,
    data?: Record<string, unknown>
  ): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: success ? LogLevel.DEBUG : LogLevel.WARN,
      message: `DB: ${operation}`,
      data: {
        success,
        ...data,
      },
      duration,
    });
  }

  /**
   * Log API request
   */
  logApiRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: string,
    requestId?: string
  ): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO,
      message: `${method} ${path} - ${statusCode}`,
      data: {
        method,
        path,
        statusCode,
      },
      userId,
      requestId,
      duration,
    });
  }

  /**
   * Log authentication event
   */
  logAuthEvent(
    event: "login" | "logout" | "failed_login",
    userId: string,
    data?: Record<string, unknown>
  ): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: event === "failed_login" ? LogLevel.WARN : LogLevel.INFO,
      message: `Auth: ${event}`,
      data,
      userId,
    });
  }

  /**
   * Log business event
   */
  logBusinessEvent(
    event: string,
    userId: string,
    data?: Record<string, unknown>
  ): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message: `Event: ${event}`,
      data,
      userId,
    });
  }
}

export const logger = new Logger();
