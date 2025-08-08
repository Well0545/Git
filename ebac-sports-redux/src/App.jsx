import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductList />
      </main>
      <Cart />
    </div>
  )
}

export default App
