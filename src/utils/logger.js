const logger = {
  info: (message, data) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  
  warn: (message, data) => {
    console.warn(`[WARNING] ${message}`, data || '');
  },
  
  auth: (message, data) => {
    console.log(`[AUTH] ${message}`, data || '');
  }
};

export default logger; 