import { useFetch } from "../hooks";

// Функция для получения блюд
export const getMealsApi = () => {
  const url = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
  return { url, options: { method: "GET" } };
};

// Функция для сохранения заказа
export const saveOrderApi = (mealId, count) => {
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

// Функция для получения заказов
export const getOrdersApi = () => {
  const url = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders";
  return { url, options: { method: "GET" } };
};

export const fetchMeals = async () => {
  try {
    const response = await fetch(getMealsApi().url, getMealsApi().options);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data = await response.json();

    const log = {
      url: getMealsApi().url,
      method: "GET",
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {number} mealId - ID блюда
 * @param {number} count - Количество
 */
export const saveOrder = async (mealId, count) => {
  const { url, options } = saveOrderApi(mealId, count);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Ошибка при получении заказов");
    }

    const data = await response.json();

    const log = {
      url,
      method: options.method || "GET",
      payload: options.body ? JSON.parse(options.body) : null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return true;
  } catch (error) {
    console.error("Ошибка при сохранении заказа:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  const { url, options } = getOrdersApi();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Ошибка при получении заказов");
    }
    const data = await response.json();

    const log = {
      url,
      method: options.method || "GET",
      payload: null,
      status: response.status,
      timestamp: new Date().toISOString(),
    };

    const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));

    return data;
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
    throw error;
  }
};
