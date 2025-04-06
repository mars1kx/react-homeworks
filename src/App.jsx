import './App.css'
import Header from './components/Header'
import MenuSection from './components/MenuSection'
import BackgroundWrapper from './components/BackgroundWrapper'
import Footer from './components/Footer'
import burgers from './__mocks__/products'

function App() {
  return (
    <div className="app">
      <Header />
      
      <BackgroundWrapper>
        <main>
          <MenuSection products={burgers} />
        </main>
      </BackgroundWrapper>
      
      <Footer />
    </div>
  )
}

export default App
