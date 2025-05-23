import { useFetch } from "../hooks";

interface ApiResponse {
  url: string;
  options: {
    method: string;
    headers?: Record<string, string>;
    body?: string;
  };
}

interface Order {
  mealId: string;
  count: number;
  date: string;
  id?: string;
}

interface LogEntry {
  url: string;
  method: string;
  payload: any | null;
  status: number;
  timestamp: string;
}

interface Meal {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}

export const getMealsApi = (): ApiResponse => {
  const url = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
  return { url, options: { method: "GET" } };
};

export const saveOrderApi = (mealId: string, count: number): ApiResponse => {
  const url = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders";
  return {
    url,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealId, count, date: new Date().toISOString() }),
    },
  };
};

export const getOrdersApi = (): ApiResponse => {
  const url = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders";
  return { url, options: { method: "GET" } };
};

export const fetchMeals = async (): Promise<Meal[]> => {
  try {
    const response = await fetch(getMealsApi().url, getMealsApi().options);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data: Meal[] = await response.json();

    const log: LogEntry = {
      url: getMealsApi().url,
      method: "GET",
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs: LogEntry[] = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Сохранение заказа
 * @param {string} mealId - ID блюда
 * @param {number} count - Количество
 */
export const saveOrder = async (mealId: string, count: number): Promise<boolean> => {
  const { url, options } = saveOrderApi(mealId, count);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Ошибка при получении заказов");
    }

    const data: Order = await response.json();

    const log: LogEntry = {
      url,
      method: options.method || "GET",
      payload: options.body ? JSON.parse(options.body) : null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs: LogEntry[] = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return true;
  } catch (error) {
    console.error("Ошибка при сохранении заказа:", error);
    throw error;
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  const { url, options } = getOrdersApi();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Ошибка при получении заказов");
    }
    const data: Order[] = await response.json();

    const log: LogEntry = {
      url,
      method: options.method || "GET",
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs: LogEntry[] = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return data;
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
    throw error;
  }
}; 