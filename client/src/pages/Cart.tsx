import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const [, navigate] = useLocation();

  const { data: cartItems, isLoading, refetch } = trpc.cart.list.useQuery();

  const { mutate: removeItem, isPending: isRemoving } = trpc.cart.remove.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Produto removido do carrinho");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const total = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      {!cartItems || cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
          <Link href="/products">
            <Button>Continuar Comprando</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {item.product?.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.product?.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        R$ {((item.product?.price || 0) / 100).toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-input rounded-md">
                          <button
                            onClick={() =>
                              updateItem({
                                cartItemId: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                            disabled={isUpdating}
                            className="px-3 py-2 hover:bg-muted"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 border-l border-r border-input">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItem({
                                cartItemId: item.id,
                                quantity: item.quantity + 1,
                              })
                            }
                            disabled={isUpdating}
                            className="px-3 py-2 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem({ cartItemId: item.id })}
                          disabled={isRemoving}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        R$ {(((item.product?.price || 0) * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>A calcular</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>R$ {(total / 100).toFixed(2)}</span>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full"
                  size="lg"
                >
                  Ir para Checkout
                </Button>

                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
