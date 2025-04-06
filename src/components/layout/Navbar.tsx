
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCartCount } from '@/services/cartService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const { user, profile, isAdmin, signOut } = useAuth();

  useEffect(() => {
    // Update cart count when component mounts
    updateCartCount();

    // Add event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    // Clean up
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    setCartCount(getCartCount());
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">PP</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PrintParadise</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-primary transition-colors">
              How It Works
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">
                Admin Dashboard
              </Link>
            )}
            {user && (
              <Link to="/upload" className="text-gray-700 hover:text-primary transition-colors">
                Upload Photos
              </Link>
            )}
            <Link to="/order/track" className="text-gray-700 hover:text-primary transition-colors">
              Track Order
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/order/cart123">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" className="flex items-center">
                  <span className="mr-2">
                    {profile?.first_name || user.email}
                  </span>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/order/cart123" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/services" className="text-gray-700 hover:text-primary py-2 transition-colors">
                Services
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary py-2 transition-colors">
                Pricing
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-primary py-2 transition-colors">
                How It Works
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-primary py-2 transition-colors">
                  Admin Dashboard
                </Link>
              )}
              {user && (
                <Link to="/upload" className="text-gray-700 hover:text-primary py-2 transition-colors">
                  Upload Photos
                </Link>
              )}
              <Link to="/order/track" className="text-gray-700 hover:text-primary py-2 transition-colors">
                Track Order
              </Link>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-700 hover:text-primary py-2 transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
