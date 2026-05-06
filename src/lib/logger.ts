/**
 * Structured logger with environment-aware output.
 * Dev  (`DEV === true`): styled `console.*` output with a color-coded level prefix.
 * Prod (`DEV === false`): JSON-serialized lines for `warn` and `error` only —
 *   `debug` and `info` are silenced to keep production logs signal-rich.
 * Test (`MODE === 'test'`): all output is suppressed to keep test runners clean.
 * Minimum log level is controlled by `VITE_LOG_LEVEL` env var (default: `'info'`).
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info:  1,
  warn:  2,
  error: 3,
};

const DEV_COLORS: Record<LogLevel, string> = {
  debug: 'color:#9ca3af;font-weight:bold',
  info:  'color:#3b82f6;font-weight:bold',
  warn:  'color:#f59e0b;font-weight:bold',
  error: 'color:#ef4444;font-weight:bold',
};

const CONSOLE_FN: Record<LogLevel, (message: string, ...args: unknown[]) => void> = {
  debug: console.debug.bind(console),
  info:  console.info.bind(console),
  warn:  console.warn.bind(console),
  error: console.error.bind(console),
};

/** Rejects any VITE_LOG_LEVEL value that isn't a valid LogLevel so MIN_LEVEL falls back to 'info' on misconfiguration. */
function isLogLevel(value: string | undefined): value is LogLevel {
  return value === 'debug' || value === 'info' || value === 'warn' || value === 'error';
}

const MIN_LEVEL: LogLevel = (() => {
  const raw = import.meta.env.VITE_LOG_LEVEL;
  return isLogLevel(raw) ? raw : 'info';
})();

function isEnabled(level: LogLevel): boolean {
  if (import.meta.env.MODE === 'test') return false;
  return LEVEL_ORDER[level] >= LEVEL_ORDER[MIN_LEVEL];
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  if (!isEnabled(level)) return;

  const timestamp = new Date().toISOString();

  if (import.meta.env.DEV) {
    const styled = `%c[${level.toUpperCase()}] ${message}`;
    if (context !== undefined) {
      CONSOLE_FN[level](styled, DEV_COLORS[level], context);
    } else {
      CONSOLE_FN[level](styled, DEV_COLORS[level]);
    }
    return;
  }

  if (level === 'warn' || level === 'error') {
    CONSOLE_FN[level](
      JSON.stringify({
        level,
        message,
        timestamp,
        ...(context !== undefined ? { context } : {}),
      }),
    );
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),
  info:  (message: string, context?: Record<string, unknown>) => log('info',  message, context),
  warn:  (message: string, context?: Record<string, unknown>) => log('warn',  message, context),
  error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
} as const;
