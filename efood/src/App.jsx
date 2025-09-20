import { useState } from 'react'
import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import RestaurantModal from './components/RestaurantModal'
import Cart from './components/Cart'
import CheckoutFlow from './components/CheckoutFlow'
import './App.css'

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant)
    setIsRestaurantModalOpen(true)
  }

  const handleCloseRestaurantModal = () => {
    setIsRestaurantModalOpen(false)
    setSelectedRestaurant(null)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        <RestaurantList onRestaurantSelect={handleRestaurantSelect} />
      </main>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-extrabold mb-4">eFood</h3>
          <p className="text-red-100 mb-6 text-lg max-w-2xl mx-auto">
            A plataforma para você saborear a diversidade de sabores que o mundo oferece
          </p>
          <div className="flex justify-center space-x-8 text-base font-medium">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Política de Privacidade</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Termos de Uso</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Contato</a>
          </div>
          <div className="mt-8 pt-8 border-t border-red-500">
            <p className="text-red-200 text-sm">
              © 2024 eFood. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={isRestaurantModalOpen}
        onClose={handleCloseRestaurantModal}
      />

      <Cart onCheckout={handleCheckout} />

      <CheckoutFlow
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />
    </div>
  )
}

export default App
