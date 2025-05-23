import { useState, useEffect } from "react";

interface LogEntry {
  url: string;
  method: string;
  requestBody: any | null;
  status: number | string;
  timestamp: string;
  response?: any;
  error?: string;
}

interface FetchOptions extends RequestInit {
  body?: string;
}

interface FetchResult<T> {
  data: T | null;
  status: number | string | null;
  error: Error | null;
}

export const logApiCall = (
  url: string, 
  options: FetchOptions = {}, 
  status: number | string, 
  responseBody: any
): void => {
  try {
    const logEntry: LogEntry = {
      url,
      method: options.method || "GET",
      requestBody: options.body ? JSON.parse(options.body) : null,
      status,
      timestamp: new Date().toISOString(),
      response: responseBody,
    };

    localStorage.setItem("lastApiResponse", JSON.stringify(logEntry));
    console.log("Logged API call:", logEntry);
  } catch (logError) {
    console.warn("Logging failed:", logError);
  }
};

export const useFetch = <T>(url: string, options: FetchOptions = {}): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setStatus(response.status);

        const log: LogEntry = {
          url,
          method: options.method || "GET",
          requestBody: options.body ? JSON.parse(options.body) : null,
          status: response.status,
          timestamp: new Date().toISOString(),
        };

        const prevLogs = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
        localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));
      } catch (err) {
        const error = err as Error;
        setError(error);
        setStatus("error");

        const errorLog: LogEntry = {
          url,
          method: options.method || "GET",
          requestBody: options.body ? JSON.parse(options.body) : null,
          status: "error",
          error: error.message,
          timestamp: new Date().toISOString(),
        };

        const prevLogs = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
        localStorage.setItem(
          "fetchLogs",
          JSON.stringify([...prevLogs, errorLog])
        );
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, status, error };
}; 