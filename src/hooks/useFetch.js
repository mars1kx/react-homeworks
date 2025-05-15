import { useState, useEffect } from "react";

// Выделяю функцию логирования, чтобы её можно было использовать вне хука
export const logApiCall = (url, options = {}, status, responseBody) => {
  try {
    const logEntry = {
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

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

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

        const log = {
          url,
          method: options.method || "GET",
          payload: options.body ? JSON.parse(options.body) : null,
          status: response.status,
          timestamp: new Date().toISOString(),
        };

        const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
        localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));
      } catch (err) {
        setError(err);
        setStatus("error");

        const errorLog = {
          url,
          method: options.method || "GET",
          payload: options.body ? JSON.parse(options.body) : null,
          status: "error",
          error: err.message,
          timestamp: new Date().toISOString(),
        };

        const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
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
