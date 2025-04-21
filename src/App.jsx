import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import MenuSection from './components/MenuSection'
import BackgroundWrapper from './components/BackgroundWrapper'
import Footer from './components/Footer'
import { fetchMeals } from './__mocks__/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchMealsData();
  }

  fetchMealsData = async () => {
    try {
      this.setState({ loading: true, error: null });
      const data = await fetchMeals();
      this.setState({ meals: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { meals, loading, error } = this.state;

    return (
      <div className="app">
        <Header />
        
        <BackgroundWrapper>
          <main>
            {loading && <div className="loading">Загрузка данных</div>}
            {error && (
              <div className="error">
                <div>Ошибка: {error}</div>
                <button onClick={this.fetchMealsData}>Попробовать снова</button>
              </div>
            )}
            {!loading && !error && <MenuSection products={meals} />}
          </main>
        </BackgroundWrapper>
        
        <Footer />
      </div>
    )
  }
}

export default App
