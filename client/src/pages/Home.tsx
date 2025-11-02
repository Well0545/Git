import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, ShoppingCart, Zap, Shield, Truck } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Home() {
  const { data: products, isLoading } = trpc.products.products.list.useQuery({
    limit: 8,
    offset: 0,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bem-vindo à {APP_TITLE}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Descubra uma ampla seleção de eletrônicos de alta qualidade com os melhores preços do mercado.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="text-blue-600">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Começar a Comprar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher {APP_TITLE}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Entrega Rápida</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Receba seus produtos em até 5 dias úteis com rastreamento em tempo real.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Compra Segura</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Seus dados são protegidos com criptografia de ponta a ponta.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Suporte 24/7</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Nossa equipe está sempre pronta para ajudar com suas dúvidas.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Produtos em Destaque</h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {product.imageUrl && (
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-end">
                          <p className="text-2xl font-bold">
                            R$ {(product.price / 100).toFixed(2)}
                          </p>
                          <span
                            className={`text-sm font-semibold ${
                              product.stock > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {product.stock > 0 ? "Em estoque" : "Fora de estoque"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link href="/products">
                  <Button size="lg" variant="outline">
                    Ver Todos os Produtos
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum produto disponível no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Navegue pelo nosso catálogo e encontre exatamente o que você procura.
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
