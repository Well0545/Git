import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrderDetail() {
  const params = useParams();
  const [, navigate] = useLocation();
  const orderId = parseInt(params.id as string);

  const { data: order, isLoading, refetch } = trpc.orders.getById.useQuery({
    id: orderId,
  });

  const { mutate: cancelOrder, isPending } = trpc.orders.cancel.useMutation({
    onSuccess: () => {
      toast.success("Pedido cancelado com sucesso");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao cancelar pedido");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <p className="text-center text-muted-foreground">Pedido não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/orders")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para pedidos
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pedido #{order.orderNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    statusColors[order.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </span>
              </div>
            </CardHeader>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Itens do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-semibold">Produto ID: {item.productId}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    R$ {(item.price / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingState} {order.shippingZipCode}
              </p>
              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Código de Rastreamento:</p>
                  <p className="font-mono font-semibold">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  R$ {(
                    (order.totalAmount + (order.discount || 0) - (order.shippingCost || 0)) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
              {(order.shippingCost || 0) > 0 && (
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>R$ {((order.shippingCost || 0) / 100).toFixed(2)}</span>
                </div>
              )}
              {(order.discount || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>-R$ {((order.discount || 0) / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>R$ {(order.totalAmount / 100).toFixed(2)}</span>
              </div>

              {order.status === "pending" && (
                <Button
                  variant="destructive"
                  onClick={() => cancelOrder({ orderId: order.id })}
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cancelando...
                    </>
                  ) : (
                    "Cancelar Pedido"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
