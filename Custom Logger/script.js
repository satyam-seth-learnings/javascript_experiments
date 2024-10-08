var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Logger = /** @class */ (function () {
    function Logger() {
        this.logLevels = ["log", "info", "warn", "error"];
        this.logLevel = "log";
    }
    Logger.prototype.setLevel = function (logLevel) {
        // Set the log level
        this.logLevel = logLevel;
    };
    Object.defineProperty(Logger, "instance", {
        get: function () {
            if (Logger._instance === undefined) {
                Logger._instance = new Logger();
            }
            return Logger._instance;
        },
        enumerable: false,
        configurable: true
    });
    // Helper method to get the current timestamp
    Logger.prototype.getTimestamp = function () {
        var now = new Date();
        return now.toISOString();
    };
    // Method to check if a message should be logged based on log level
    Logger.prototype.shouldLog = function (level) {
        var currentLevelIndex = this.logLevels.indexOf(this.logLevel);
        var messageLevelIndex = this.logLevels.indexOf(level);
        return messageLevelIndex >= currentLevelIndex;
    };
    // Main log method that accepts multiple arguments
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.shouldLog("log")) {
            console.log.apply(console, __spreadArray(["%cLOG:",
                "color: white; background-color: #405d27", "[".concat(this.getTimestamp(), "]")], args, false));
        }
    };
    // Method to log errors
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.shouldLog("error")) {
            console.error.apply(console, __spreadArray(["%cERROR:",
                "color: white; background-color: #c94c4c", "[".concat(this.getTimestamp(), "]")], args, false));
        }
    };
    // Method to log warnings
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.shouldLog("warn")) {
            console.warn.apply(console, __spreadArray(["%cWARNING:",
                "color: black; background-color: #feb236", "[".concat(this.getTimestamp(), "]")], args, false));
        }
    };
    // Method to log info
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.shouldLog("info")) {
            console.info.apply(console, __spreadArray(["%cINFO:",
                "color: white; background-color: #4040a1", "[".concat(this.getTimestamp(), "]")], args, false));
        }
    };
    return Logger;
}());
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
Logger.instance.info("This info message will not be displayed because the log level is set to warn.");
