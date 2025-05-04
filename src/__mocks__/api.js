export const fetchMeals = async () => {
  try {
    const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * @param {number} mealId - ID блюда
 * @param {number} count - Количество
 */
export const saveOrder = async (mealId, count) => {
  try {
    const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders');
    if (!response.ok) {
      throw new Error('Ошибка при получении заказов');
    }
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    throw error;
  }
};


export const fetchOrders = async () => {
  try {
    const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders');
    if (!response.ok) {
      throw new Error('Ошибка при получении заказов');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error);
    throw error;
  }
}; 