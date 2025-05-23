interface LogData {
  [key: string]: any;
}

const logger = {
  info: (message: string, data?: LogData): void => {
    console.log(`[INFO] ${message}`, data || '');
  },
  
  error: (message: string, error?: Error | LogData): void => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  
  warn: (message: string, data?: LogData): void => {
    console.warn(`[WARNING] ${message}`, data || '');
  },
  
  auth: (message: string, data?: LogData): void => {
    console.log(`[AUTH] ${message}`, data || '');
  }
};

export default logger; 