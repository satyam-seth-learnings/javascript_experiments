type LogLevel = "error" | "warn" | "info" | "log";

class Logger {
  private static _instance?: Logger;

  private logLevels: Array<LogLevel> = ["log", "info", "warn", "error"];

  private logLevel: LogLevel = "log";

  private constructor() {}

  setLevel(logLevel: LogLevel) {
    // Set the log level
    this.logLevel = logLevel;
  }

  static get instance() {
    if (Logger._instance === undefined) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  // Helper method to get the current timestamp
  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  // Method to check if a message should be logged based on log level
  private shouldLog(level: LogLevel): boolean {
    const currentLevelIndex = this.logLevels.indexOf(this.logLevel);
    const messageLevelIndex = this.logLevels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  // Main log method that accepts multiple arguments
  public log(...args: unknown[]): void {
    if (this.shouldLog("log")) {
      console.log(
        "%cLOG:",
        "color: white; background-color: #405d27",
        `[${this.getTimestamp()}]`,
        ...args
      );
    }
  }

  // Method to log errors
  public error(...args: unknown[]): void {
    if (this.shouldLog("error")) {
      console.error(
        "%cERROR:",
        "color: white; background-color: #c94c4c",
        `[${this.getTimestamp()}]`,
        ...args
      );
    }
  }

  // Method to log warnings
  public warn(...args: unknown[]): void {
    if (this.shouldLog("warn")) {
      console.warn(
        "%cWARNING:",
        "color: black; background-color: #feb236",
        `[${this.getTimestamp()}]`,
        ...args
      );
    }
  }

  // Method to log info
  public info(...args: unknown[]): void {
    if (this.shouldLog("info")) {
      console.info(
        "%cINFO:",
        "color: white; background-color: #4040a1",
        `[${this.getTimestamp()}]`,
        ...args
      );
    }
  }
}

// Example usage of the Logger class
Logger.instance.log("Test value", 5);

// Set the log level to "info"
Logger.instance.setLevel("info");

// This will log a "log" message (will not appear because the log level is "info")
Logger.instance.log("This is a log message that won't be displayed.");

// This will log an "info" message
Logger.instance.info("This is an info message.");

// This will log a "warn" message
Logger.instance.warn("This is a warning message.");

// This will log an "error" message
Logger.instance.error("This is an error message.");

// Change log level to "warn"
Logger.instance.setLevel("warn");

// This will log a "warn" message (will be displayed)
Logger.instance.warn("Another warning message.");

// This will log an "error" message (will be displayed)
Logger.instance.error("Another error message.");

// This will not log an "info" message (will not be displayed)
Logger.instance.info(
  "This info message will not be displayed because the log level is set to warn."
);
