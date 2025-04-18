
import { useState } from 'react';
import { Image as ImageIcon, FileText, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PhotoUploader from '@/components/uploader/PhotoUploader';
import DocumentUploader from '@/components/uploader/DocumentUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCartItems } from '@/services/cartService';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const [activeTab, setActiveTab] = useState<string>("photos");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const cartItems = getCartItems();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login', { state: { from: '/upload' } });
    return null;
  }

  const handleViewCart = () => {
    if (cartCount === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart first",
        variant: "destructive"
      });
      return;
    }
    navigate('/order/cart123');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-6 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">Upload & Print</h1>
                <p className="text-base md:text-lg text-gray-600">
                  Upload your photos or documents and customize your order
                </p>
              </div>
              
              <div className="hidden md:block">
                <Button 
                  onClick={handleViewCart}
                  variant="outline"
                  className="flex items-center"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart
                  {cartCount > 0 && (
                    <Badge className="ml-2" variant="secondary">{cartCount}</Badge>
                  )}
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="photos"
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="w-full">
                <TabsTrigger value="photos" className="flex items-center justify-center w-full">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center justify-center w-full">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos" className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-3">
                    <PhotoUploader />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-3">
                    <DocumentUploader />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {cartCount > 0 && (
              <div className="mt-6 md:hidden">
                <Button 
                  onClick={handleViewCart} 
                  className="w-full flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart ({cartCount} items)
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
