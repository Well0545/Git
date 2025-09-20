import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Check, ArrowLeft, ArrowRight, MapPin, CreditCard, CheckCircle } from 'lucide-react'
import { selectCartItems, selectCartTotalAmount, clearCart } from '../store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const STEPS = [
  { id: 1, title: 'Entrega', icon: MapPin },
  { id: 2, title: 'Pagamento', icon: CreditCard },
  { id: 3, title: 'Confirmação', icon: CheckCircle }
]

export default function CheckoutFlow({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryData, setDeliveryData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleDeliverySubmit = (e) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simula processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setCurrentStep(3)
    setOrderCompleted(true)
  }

  const handleFinishOrder = () => {
    dispatch(clearCart())
    onClose()
    setCurrentStep(1)
    setOrderCompleted(false)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 space-x-4">
      {STEPS.map((step, index) => {
        const Icon = step.icon
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id
        
        return (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300
              ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                isActive ? 'bg-red-500 border-red-500 text-white' : 
                'border-gray-400 text-gray-500'}
            `}>
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>
            <span className={`ml-2 text-base font-semibold ${
              isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )

  const renderDeliveryStep = () => (
    <form onSubmit={handleDeliverySubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-600">
            <MapPin className="h-5 w-5" />
            Dados de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Nome completo *</Label>
              <Input
                id="fullName"
                value={deliveryData.fullName}
                onChange={(e) => setDeliveryData({...deliveryData, fullName: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">CEP *</Label>
              <Input
                id="zipCode"
                value={deliveryData.zipCode}
                onChange={(e) => setDeliveryData({...deliveryData, zipCode: e.target.value})}
                placeholder="00000-000"
                required
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              value={deliveryData.address}
              onChange={(e) => setDeliveryData({...deliveryData, address: e.target.value})}
              required
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={deliveryData.city}
                onChange={(e) => setDeliveryData({...deliveryData, city: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                value={deliveryData.number}
                onChange={(e) => setDeliveryData({...deliveryData, number: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={deliveryData.complement}
                onChange={(e) => setDeliveryData({...deliveryData, complement: e.target.value})}
                placeholder="Apto, bloco, etc."
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-red-500 hover:bg-red-600">
          Continuar para o pagamento
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  )

  const renderPaymentStep = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-600">
            <CreditCard className="h-5 w-5" />
            Pagamento - Cartão de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número do cartão *</Label>
            <Input
              id="cardNumber"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
              placeholder="0000 0000 0000 0000"
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="cardName">Nome no cartão *</Label>
            <Input
              id="cardName"
              value={paymentData.cardName}
              onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
              required
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Validade *</Label>
              <Input
                id="expiryDate"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                placeholder="MM/AA"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                placeholder="000"
                required
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do pedido */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.nome}</span>
                <span>{formatPrice(item.totalPrice)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-red-600">{formatPrice(totalAmount)}</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button 
          type="submit" 
          className="bg-red-500 hover:bg-red-600 text-white py-3 text-base font-semibold shadow-md hover:shadow-lg"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processando...' : `Finalizar pedido ${formatPrice(totalAmount)}`}
        </Button>
      </div>
    </form>
  )

  const renderConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pedido realizado com sucesso!
        </h2>
        <p className="text-gray-600">
          Seu pedido foi confirmado e está sendo preparado.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Número do pedido:</span>
              <span className="font-semibold">#EF{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tempo estimado:</span>
              <span className="font-semibold">30-45 minutos</span>
            </div>
            <div className="flex justify-between">
              <span>Total pago:</span>
              <span className="font-semibold text-red-600">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleFinishOrder}
        className="bg-red-500 hover:bg-red-600 w-full text-white py-3 text-base font-semibold shadow-md hover:shadow-lg"
        size="lg"
      >
        Fazer novo pedido
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-center text-red-600">
            Finalizar Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {renderStepIndicator()}
          
          {currentStep === 1 && renderDeliveryStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderConfirmationStep()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

