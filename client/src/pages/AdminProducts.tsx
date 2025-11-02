import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");

  // Redirect if not admin
  if (user?.role !== "admin") {
    navigate("/");
    return null;
  }

  const { data: products, isLoading } = trpc.products.products.list.useQuery({
    limit: 50,
    offset: 0,
    search: search || undefined,
  });

  const { data: categories } = trpc.products.categories.list.useQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
        </div>
        <Button onClick={() => toast.info("Criar novo produto - em desenvolvimento")}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : products && products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Categoria: {product.categoryId}
                      </p>
                    </div>
                  </div>

                  <div className="text-right mr-6">
                    <p className="font-semibold">
                      R$ {(product.price / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Estoque: {product.stock}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        toast.info("Editar produto - em desenvolvimento")
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() =>
                        toast.info("Deletar produto - em desenvolvimento")
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      )}

      {/* Categories Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center">
                <span>{cat.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info("Editar categoria - em desenvolvimento")}
                >
                  Editar
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => toast.info("Criar categoria - em desenvolvimento")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Categoria
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
