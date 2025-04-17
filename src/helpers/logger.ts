type LogParams = any[];

class Logger {
  private static readonly isDev = __DEV__;

  private static getTimestamp(): string {
    return new Date().toISOString(); // Standard format
  }

  private static formatMessage(level: string, message: string): string {
    const timestamp = Logger.getTimestamp();
    return `[${level.toUpperCase()}] ${timestamp} :: ${message}`;
  }

  static debug(message: string, ...optionalParams: LogParams): void {
    if (Logger.isDev) {
      console.debug(
        `🐛 ${Logger.formatMessage('debug', message)}`,
        ...optionalParams
      );
    }
  }

  static log(message: string, ...optionalParams: LogParams): void {
    if (Logger.isDev) {
      console.log(
        `🌟 ${Logger.formatMessage('log', message)}`,
        ...optionalParams
      );
    }
  }

  static info(message: string, ...optionalParams: LogParams): void {
    if (Logger.isDev) {
      console.info(
        `ℹ️ ${Logger.formatMessage('info', message)}`,
        ...optionalParams
      );
    }
  }

  static warn(message: string, ...optionalParams: LogParams): void {
    console.warn(
      `⚠️ ${Logger.formatMessage('warn', message)}`,
      ...optionalParams
    );
  }

  static error(message: string, ...optionalParams: LogParams): void {
    console.error(
      `❌ ${Logger.formatMessage('error', message)}`,
      ...optionalParams
    );
  }
}

export default Logger;
