import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, CreditCard, QrCode, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = "pix" | "card" | null;

export default function Checkout() {
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const { data: cartItems } = trpc.cart.list.useQuery();

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;
  const frete = subtotal > 0 ? 1500 : 0;
  const total = subtotal + frete;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2");
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error("Preencha todos os campos obrigatórios");
      return false;
    }
    return true;
  };

  const validateCard = () => {
    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
      toast.error("Preencha todos os dados do cartão");
      return false;
    }
    if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Número do cartão inválido");
      return false;
    }
    if (cardData.cvv.length !== 3) {
      toast.error("CVV inválido");
      return false;
    }
    return true;
  };

  const handlePaymentPix = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Simular processamento PIX
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Pedido criado! Escaneie o QR code para pagar com PIX");
      // Aqui você integraria com a API real do Stripe para gerar PIX
      setTimeout(() => navigate("/orders"), 3000);
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentCard = async () => {
    if (!validateForm() || !validateCard()) return;

    setIsProcessing(true);
    try {
      // Simular processamento de cartão
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Pagamento processado com sucesso!");
      // Aqui você integraria com a API real do Stripe para cartão
      setTimeout(() => navigate("/orders"), 3000);
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="mb-4 hover:bg-purple-50 dark:hover:bg-purple-950"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Carrinho
          </Button>
          <h1 className="text-4xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Delivery Address */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="João Silva"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="joao@example.com"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Endereço *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Rua das Flores"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Número *</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      placeholder="Apto 456"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="São Paulo"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Estado *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="SP"
                      maxLength={2}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CEP *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="01310-100"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Método de Pagamento</h2>

              <div className="space-y-4">
                {/* PIX Option */}
                <div
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "pix"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950"
                      : "border-border hover:border-purple-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "pix" ? "border-purple-600 bg-purple-600" : "border-border"
                    }`}>
                      {paymentMethod === "pix" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        PIX
                      </h3>
                      <p className="text-sm text-muted-foreground">Pague instantaneamente com PIX</p>
                    </div>
                  </div>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "card"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950"
                      : "border-border hover:border-purple-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "card" ? "border-purple-600 bg-purple-600" : "border-border"
                    }`}>
                      {paymentMethod === "card" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Cartão de Crédito
                      </h3>
                      <p className="text-sm text-muted-foreground">Parcelado em até 12x</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 pt-6 border-t border-border/50 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-sm font-medium mb-2">Número do Cartão *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nome no Cartão *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardChange}
                      placeholder="JOÃO SILVA"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700 uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Validade *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/50 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>

                {/* Items */}
                <div className="space-y-3 pb-6 border-b border-border/50 max-h-64 overflow-y-auto">
                  {cartItems?.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate">
                        {item.product?.name} x {item.quantity}
                      </span>
                      <span className="font-medium flex-shrink-0">
                        R$ {(((item.product?.price || 0) * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">R$ {(frete / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border/50">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-pink-500">
                      R$ {(total / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={() => paymentMethod === "pix" ? handlePaymentPix() : handlePaymentCard()}
                  disabled={!paymentMethod || isProcessing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      {paymentMethod === "pix" ? "Gerar QR Code PIX" : "Pagar com Cartão"}
                    </>
                  )}
                </Button>

                {/* Security Info */}
                <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 text-sm text-purple-900 dark:text-purple-100">
                  <p className="font-medium mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Pagamento Seguro
                  </p>
                  <p>Seus dados são protegidos com criptografia SSL de 256-bit.</p>
                </div>

                {/* Info */}
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
                  <p className="font-medium mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Integração Inicial
                  </p>
                  <p>Esta é uma integração inicial. Futuramente adicionaremos mais métodos de pagamento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
