import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, LogOut, LayoutGrid, Menu, X } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{APP_TITLE}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group">
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100">
                <LayoutGrid className="w-4 h-4" />
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/cart" className="relative group">
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/orders">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors duration-200">
                    Meus Pedidos
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => logout()}
                  title="Logout"
                  className="hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => (window.location.href = getLoginUrl())} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background border-b border-border/50 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="container mx-auto px-4 py-4 space-y-3">
                <Link href="/products" className="block text-sm font-medium hover:text-primary transition-colors duration-200">
                  Catálogo
                </Link>
                {isAuthenticated && user?.role === "admin" && (
                  <Link href="/admin" className="block text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center gap-1">
                    <LayoutGrid className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                {isAuthenticated && (
                  <>
                    <Link href="/orders" className="block text-sm font-medium hover:text-primary transition-colors duration-200">
                      Meus Pedidos
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout()}
                      className="w-full justify-start hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{APP_TITLE}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sua loja de eletrônicos de confiança.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-primary transition-colors duration-200">Início</Link></li>
                <li><Link href="/products" className="hover:text-primary transition-colors duration-200">Produtos</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:contato@jbeletronic.com" className="hover:text-primary transition-colors duration-200">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors duration-200">Termos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-200">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 {APP_TITLE}. Todos os direitos reservados.</p>
            <p className="mt-2">Powered by Manus</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
