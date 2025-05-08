import { useCallback } from 'react';

// Выделяю функцию логирования, чтобы её можно было использовать вне хука
export const logApiCall = (url, options = {}, status, responseBody) => {
  try {
    const logEntry = {
      url,
      method: options.method || 'GET',
      requestBody: options.body ? JSON.parse(options.body) : null,
      status,
      timestamp: new Date().toISOString(),
      response: responseBody,
    };

    localStorage.setItem('lastApiResponse', JSON.stringify(logEntry));
    console.log('Logged API call:', logEntry);
  } catch (logError) {
    console.warn('Logging failed:', logError);
  }
};

export const useFetch = () => {
  const fetchData = useCallback(async (url, options = {}) => {
    const response = await fetch(url, options);
    const responseBody = await response.json();

    logApiCall(url, options, response.status, responseBody);

    if (!response.ok) {
      throw new Error("Can't establish connection with API.");
    }

    return responseBody;
  }, []);

  return { fetchData };
};