import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import MenuSection from './components/MenuSection/MenuSection'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import Footer from './components/Footer/Footer'
import { fetchMeals } from './__mocks__/api'

const App = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealsData();
  }, []);

  const fetchMealsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMeals();
      setMeals(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />
      
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
      
      <Footer />
    </div>
  )
}

export default App
