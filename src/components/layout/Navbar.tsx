
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic later
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // In a real app, this would check credentials
    setIsLoggedIn(true);
    navigate('/admin');
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
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            {isLoggedIn && (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">
                Admin Dashboard
              </Link>
            )}
            <Link to="/order/sample-order" className="text-gray-700 hover:text-primary transition-colors">
              Track Order
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/order/cart123">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </Button>
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
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
                <Button variant="link" onClick={handleAdminLogin}>
                  Admin Access
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/order/cart123" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
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
              <Link to="/contact" className="text-gray-700 hover:text-primary py-2 transition-colors">
                Contact
              </Link>
              {isLoggedIn && (
                <Link to="/admin" className="text-gray-700 hover:text-primary py-2 transition-colors">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/order/sample-order" className="text-gray-700 hover:text-primary py-2 transition-colors">
                Track Order
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link to="/account" className="text-gray-700 hover:text-primary py-2 transition-colors">
                    My Account
                  </Link>
                  <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
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
                  <Button variant="link" onClick={handleAdminLogin} className="w-full">
                    Admin Access
                  </Button>
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
