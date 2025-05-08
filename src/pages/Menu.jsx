import React, { useState, useEffect } from 'react'
import MenuSection from '../components/MenuSection/MenuSection'
import BackgroundWrapper from '../components/BackgroundWrapperMenu/BackgroundWrapperMenu'
import { getMealsApi } from '../__mocks__/api'
import { useFetch } from '../hooks'

const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchMealsData();
  }, []);

  const fetchMealsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { url, options } = getMealsApi();
      const data = await fetchData(url, options);
      setMeals(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <BackgroundWrapper>
      <main>
        {loading && <div className="loading">Загрузка данных</div>}
        {error && (
          <div className="error">
            <div>Ошибка: {error}</div>
            <button onClick={fetchMealsData}>Попробовать снова</button>
          </div>
        )}
        {!loading && !error && <MenuSection products={meals} />}
      </main>
    </BackgroundWrapper>
  )
}

export default Menu 