
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Image, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Photos', href: '/admin/photos', icon: Image },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Help', href: '/admin/help', icon: HelpCircle },
  ];

  const handleSignOut = () => {
    // Add sign out logic here
    window.location.href = '/';
  };
  
  return (
    <div className="h-screen flex flex-col border-r bg-white">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 flex flex-col justify-between">
        <nav className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 mt-6">
          <Button variant="outline" className="w-full justify-start text-gray-700" onClick={handleSignOut}>
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
