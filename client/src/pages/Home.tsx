import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, Shield, Truck, Star, ArrowRight, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { data: products, isLoading } = trpc.products.products.list.useQuery({
    limit: 6,
    offset: 0,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent leading-tight">
              Bem-vindo à JB Eletronic E-commerce
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Descubra uma ampla seleção de eletrônicos da alta qualidade com os melhores preços do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span>Começar a Comprar</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = getLoginUrl())}
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 transition-all duration-300"
                >
                  Fazer Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que escolher JB Eletronic E-commerce?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Entrega Rápida",
                description: "Receba seus produtos em até 5 dias úteis com rastreamento em tempo real.",
              },
              {
                icon: Shield,
                title: "Compra Segura",
                description: "Seus dados são protegidos com criptografia de ponta a ponta.",
              },
              {
                icon: Zap,
                title: "Suporte 24/7",
                description: "Nossa equipe está sempre pronta para ajudar com suas dúvidas.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-purple-400/50 dark:hover:border-pink-400/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Produtos em Destaque</h2>
            <Link href="/products">
              <Button variant="ghost" className="group">
                Ver Todos
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div
                    className="group h-full rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-purple-400/50 dark:hover:border-pink-400/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Sem imagem</p>
                          </div>
                        </div>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) / product.originalPrice) * 100
                          )}
                          %
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-pink-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description || "Produto de qualidade"}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-1">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-xs text-muted-foreground line-through">
                              R$ {(product.originalPrice / 100).toFixed(2)}
                            </p>
                          )}
                          <p className="text-xl font-bold text-purple-600 dark:text-pink-500">
                            R$ {(product.price / 100).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {product.stock > 0 ? (
                              <span className="text-green-600 font-semibold">Em Estoque</span>
                            ) : (
                              <span className="text-red-600 font-semibold">Indisponível</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum produto disponível no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center space-y-6 animate-in fade-in duration-700">
          <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar?</h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Navegue pelo nosso catálogo e encontre exatamente o que você procura.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
