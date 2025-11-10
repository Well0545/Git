import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, AlertCircle, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const [, navigate] = useLocation();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const { data: cartItems, isLoading, refetch } = trpc.cart.list.useQuery();

  const { mutate: removeItem, isPending: isRemoving } = trpc.cart.remove.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Produto removido do carrinho");
      setShowRemoveConfirm(null);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao remover produto");
    },
  });

  const { mutate: updateItem, isPending: isUpdating } = trpc.cart.update.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao atualizar quantidade");
    },
  });

  const { mutate: validateCoupon, isPending: isApplyingCoupon } = trpc.coupons.validate.useMutation({
    onSuccess: (result) => {
      setAppliedCoupon({
        code: result.couponCode,
        discount: result.discountAmount,
      });
      toast.success(result.message);
      setCouponCode("");
    },
    onError: (error) => {
      toast.error(error.message || "Cupom inválido");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;
  const frete = subtotal > 0 ? 1500 : 0;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal + frete - discount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Digite um código de cupom");
      return;
    }

    validateCoupon({
      couponCode: couponCode.trim(),
      subtotal: subtotal,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Cupom removido");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center mx-auto">
            <ShoppingCart className="w-10 h-10 text-purple-600 dark:text-pink-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Carrinho Vazio</h2>
            <p className="text-muted-foreground mb-6">Comece a adicionar produtos ao seu carrinho</p>
          </div>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <span>Explorar Produtos</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Seu Carrinho</h1>
          <p className="text-muted-foreground">{cartItems.length} item(ns) no carrinho</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/50 overflow-hidden shadow-sm">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 flex gap-4 hover:bg-muted/50 dark:hover:bg-slate-800 transition-colors duration-200 ${
                    index !== cartItems.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  {/* Product Image */}
                  <Link href={`/products/${item.product?.slug || ""}`}>
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
                      {item.product?.imageUrl && (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product?.slug || ""}`}>
                      <h3 className="font-bold text-lg hover:text-purple-600 dark:hover:text-pink-500 transition-colors duration-200 line-clamp-2 cursor-pointer">
                        {item.product?.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-purple-600 dark:text-pink-500 mt-2">
                      R$ {((item.product?.price || 0) / 100).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateItem({
                            cartItemId: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        disabled={isUpdating}
                        className="h-8 w-8 p-0 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateItem({
                            cartItemId: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        disabled={isUpdating}
                        className="h-8 w-8 p-0 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="text-xl font-bold">
                        R$ {(((item.product?.price || 0) * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowRemoveConfirm(item.id)}
                        disabled={isRemoving}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      {/* Remove Confirmation */}
                      {showRemoveConfirm === item.id && (
                        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-border/50 rounded-lg shadow-lg p-3 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                          <p className="text-sm font-medium mb-2 whitespace-nowrap">Remover item?</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowRemoveConfirm(null)}
                              className="text-xs"
                            >
                              Cancelar
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => removeItem({ cartItemId: item.id })}
                              disabled={isRemoving}
                              className="text-xs bg-red-600 hover:bg-red-700 text-white"
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/50 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 space-y-6">
                {/* Summary Header */}
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>

                {/* Items Summary */}
                <div className="space-y-3 pb-6 border-b border-border/50">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product?.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        R$ {(((item.product?.price || 0) * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="space-y-3 pb-6 border-b border-border/50">
                  <label className="block text-sm font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Cupom de Desconto
                  </label>

                  {appliedCoupon ? (
                    <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Cupom aplicado: {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          Desconto: R$ {(appliedCoupon.discount / 100).toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
                        placeholder="Digite o código"
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                      />
                      <Button
                        size="sm"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isApplyingCoupon ? "..." : "Aplicar"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">R$ {(frete / 100).toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span className="text-muted-foreground">Desconto</span>
                      <span className="font-medium">-R$ {(discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-border/50">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-pink-500">
                      R$ {(total / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={() => navigate("/checkout")}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <span>Ir para Checkout</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Continue Shopping */}
                <Link href="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors duration-200"
                  >
                    Continuar Comprando
                  </Button>
                </Link>

                {/* Info Box */}
                <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 text-sm text-purple-900 dark:text-purple-100">
                  <p className="font-medium mb-1">✓ Compra Segura</p>
                  <p>Seus dados estão protegidos com criptografia de ponta a ponta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
