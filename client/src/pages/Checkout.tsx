import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCost: 0,
    discount: 0,
    notes: "",
  });

  const { data: cartItems } = trpc.cart.list.useQuery();

  const { mutate: createOrder, isPending } = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      toast.success("Pedido criado com sucesso!");
      navigate(`/orders/${data.orderId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar pedido");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.shippingAddress || !formData.shippingCity || !formData.shippingState || !formData.shippingZipCode) {
      toast.error("Preencha todos os campos de endereço");
      return;
    }

    createOrder({
      shippingAddress: formData.shippingAddress,
      shippingCity: formData.shippingCity,
      shippingState: formData.shippingState,
      shippingZipCode: formData.shippingZipCode,
      shippingCost: formData.shippingCost,
      discount: formData.discount,
      notes: formData.notes || undefined,
    });
  };

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;

  const total = subtotal - formData.discount + formData.shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Endereço
                  </label>
                  <Input
                    value={formData.shippingAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingAddress: e.target.value,
                      })
                    }
                    placeholder="Rua, número, complemento"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cidade
                    </label>
                    <Input
                      value={formData.shippingCity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingCity: e.target.value,
                        })
                      }
                      placeholder="Cidade"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estado
                    </label>
                    <Input
                      value={formData.shippingState}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingState: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="SP"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    CEP
                  </label>
                  <Input
                    value={formData.shippingZipCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingZipCode: e.target.value,
                      })
                    }
                    placeholder="00000-000"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Frete (R$)
                    </label>
                    <Input
                      type="number"
                      value={formData.shippingCost}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingCost: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Desconto (R$)
                    </label>
                    <Input
                      type="number"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discount: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Deixe uma mensagem..."
                    className="w-full px-3 py-2 border border-input rounded-md"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando pedido...
                    </>
                  ) : (
                    "Confirmar Pedido"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span>
                    R$ {(((item.product?.price || 0) * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {(subtotal / 100).toFixed(2)}</span>
                </div>
                {formData.shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>R$ {(formData.shippingCost / 100).toFixed(2)}</span>
                  </div>
                )}
                {formData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto:</span>
                    <span>-R$ {(formData.discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>R$ {(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
