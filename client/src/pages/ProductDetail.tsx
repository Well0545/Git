import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const params = useParams();
  const [, navigate] = useLocation();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = trpc.products.products.getBySlug.useQuery({
    slug,
  });

  const { mutate: addToCart, isPending } = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success("Produto adicionado ao carrinho!");
      setQuantity(1);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao adicionar ao carrinho");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <p className="text-center text-muted-foreground">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/products")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para produtos
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">
                R$ {(product.price / 100).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {(product.originalPrice / 100).toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} em estoque`
                  : "Fora de estoque"}
              </span>
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.sku && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  SKU: <span className="font-mono">{product.sku}</span>
                </p>
              </div>
            )}
          </div>

          {/* Add to Cart Section */}
          {product.stock > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Adicionar ao Carrinho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Quantidade:</label>
                  <div className="flex items-center border border-input rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-muted"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min="1"
                      max={product.stock}
                      className="w-12 text-center border-0 bg-transparent"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-3 py-2 hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    addToCart({
                      productId: product.id,
                      quantity,
                    })
                  }
                  disabled={isPending}
                  className="w-full"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
