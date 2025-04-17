
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Download, Clock, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderSummary from '@/components/orders/OrderSummary';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase, isDevelopmentMode } from '@/lib/supabase';
import { createOrder } from '@/services/orderService';
import { v4 as uuidv4 } from 'uuid';

// Define the form schema
const shippingFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  addressLine1: z.string().min(5, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid zip code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
});

type ShippingFormValues = z.infer<typeof shippingFormSchema>;

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShippingForm, setShowShippingForm] = useState(id === 'cart123');
  
  const [order, setOrder] = useState({
    id: id || 'ORD-1234',
    date: 'May 15, 2023',
    status: 'processing',
    items: [
      { 
        id: '1', 
        name: 'Photo Print', 
        size: '4×6″', 
        paper: 'Glossy', 
        quantity: 3, 
        price: 0.75,
        imageUrl: '/placeholder.svg'
      },
      { 
        id: '2', 
        name: 'Document Print', 
        size: '8.5×11″', 
        paper: 'Matte', 
        quantity: 10, 
        price: 5.00 
      },
    ],
    subtotal: 5.75,
    tax: 0.46,
    shipping: 4.99,
    total: 11.20,
    estimatedDelivery: 'May 22 - May 24, 2023',
    shippingAddress: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    }
  });

  // Form definition
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
    },
  });

  const handleCompleteCheckout = async (shippingData?: ShippingFormValues) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to complete your order",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (showShippingForm && !shippingData) {
      form.handleSubmit(handleCompleteCheckout)();
      return;
    }

    setIsProcessing(true);
    
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      if (cartItems.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shipping = 4.99;
      const total = subtotal + tax + shipping;
      
      const shippingAddress = shippingData || order.shippingAddress;
      const formattedAddress = `${shippingAddress.fullName}, ${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 ? shippingAddress.addressLine2 + ', ' : ''}${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}, ${shippingAddress.country}`;
      
      const orderData = {
        user_id: user.id,
        status: 'pending' as const,
        amount: total,
        shipping_address: formattedAddress,
        shipping_fee: shipping,
        tax: tax,
        created_at: new Date().toISOString(),
        shipping_details: shippingAddress
      };
      
      const orderItems = cartItems.map((item: any) => ({
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: {
          size: item.size,
          paper: item.paper,
          finish: item.finish,
          docOption: item.docOption
        },
        image_url: item.imageUrl || null,
        file_url: item.fileUrl || null
      }));
      
      let newOrderId;
      if (isDevelopmentMode) {
        newOrderId = `order-${uuidv4().substring(0, 8)}`;
        
        // Store shipping address in local storage for development mode
        localStorage.setItem('lastOrderShipping', JSON.stringify(shippingAddress));
        
        toast({
          title: "Order placed successfully",
          description: "Your order has been confirmed."
        });
      } else {
        const orderResult = await createOrder(orderData, orderItems);
        newOrderId = orderResult.id;
      }
      
      localStorage.removeItem('cartItems');
      
      navigate(`/order/${newOrderId}`);
      
    } catch (err: any) {
      console.error('Error completing checkout:', err);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: err.message || "Failed to complete your order. Please try again."
      });
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (id === 'cart123') {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (cartItems.length > 0) {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const shipping = 4.99;
        const total = subtotal + tax + shipping;
        
        setOrder({
          id: 'CART-123',
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          status: 'pending',
          items: cartItems,
          subtotal,
          tax,
          shipping,
          total,
          estimatedDelivery: '3-5 business days from payment',
          shippingAddress: {
            fullName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: ''
          }
        });
      }
      setIsLoading(false);
      return;
    }

    const loadOrder = async () => {
      if (!id || !user) {
        setIsLoading(false);
        return;
      }
      
      try {
        if (isDevelopmentMode) {
          // Get shipping address from local storage in development mode
          const savedShippingAddress = localStorage.getItem('lastOrderShipping');
          const shippingAddress = savedShippingAddress ? JSON.parse(savedShippingAddress) : {
            fullName: 'John Doe',
            addressLine1: '123 Main Street',
            addressLine2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            phone: '555-1234'
          };
          
          setTimeout(() => {
            setOrder({
              ...order,
              id: id,
              status: 'confirmed',
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              shippingAddress
            });
            setIsLoading(false);
          }, 500);
        } else {
          const { data, error } = await supabase
            .from('orders')
            .select(`
              *,
              order_items(*)
            `)
            .eq('id', id)
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (data) {
            setOrder({
              ...data,
              shippingAddress: data.shipping_details || {
                fullName: 'John Doe',
                addressLine1: '123 Main Street',
                addressLine2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States',
                phone: '555-1234'
              }
            });
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Failed to load order details. Please try again later.');
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load order details."
        });
      }
    };
    
    loadOrder();
  }, [id, user, toast]);

  const orderProgress = [
    { id: 1, name: 'Confirmed', icon: CheckCircle, completed: true, date: order.date },
    { id: 2, name: 'Processing', icon: Printer, completed: order.status !== 'pending', date: order.status !== 'pending' ? 'May 16, 2023' : undefined },
    { id: 3, name: 'Ready', icon: Clock, completed: ['ready', 'shipped', 'delivered'].includes(order.status) },
    { id: 4, name: 'Shipped', icon: Truck, completed: ['shipped', 'delivered'].includes(order.status) },
    { id: 5, name: 'Delivered', icon: CheckCircle, completed: order.status === 'delivered' },
  ];

  const completedSteps = orderProgress.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / orderProgress.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading order details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <Alert variant="destructive" className="max-w-lg mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { shippingAddress } = order;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center text-primary hover:underline mr-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {id === 'cart123' && showShippingForm ? (
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCompleteCheckout)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(555) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="addressLine1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main Street" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="addressLine2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address Line 2 (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Apt 4B" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="New York" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input placeholder="NY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Zip Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="10001" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="United States" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button 
                              type="submit"
                              disabled={isProcessing || order.items.length === 0}
                            >
                              {isProcessing ? 'Processing...' : 'Continue to Payment'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Order Status</h2>
                          <p className="text-gray-500">Placed on {order.date}</p>
                        </div>
                        {id !== 'cart123' && (
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        )}
                      </div>
                      
                      <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Order Progress</span>
                          <span className="text-sm text-gray-500">{completedSteps} of {orderProgress.length} steps completed</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      
                      {id === 'cart123' ? (
                        <div className="text-center p-6 bg-yellow-50 rounded-lg mb-6">
                          <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                          <h3 className="text-lg font-medium text-yellow-700">This is your shopping cart</h3>
                          <p className="mt-2 text-yellow-600">Add your shipping address to proceed with your order</p>
                          <Button 
                            className="mt-4" 
                            onClick={() => setShowShippingForm(true)}
                          >
                            Add Shipping Address
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {orderProgress.map((step, index) => (
                            <div key={step.id} className="flex items-start">
                              <div className={`rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0 ${
                                step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <step.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{step.name}</h3>
                                  {step.date && <span className="text-sm text-gray-500">{step.date}</span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {index === 0 && 'Your order has been confirmed.'}
                                  {index === 1 && 'Your order is being processed and printed.'}
                                  {index === 2 && 'Your order will be ready for shipping soon.'}
                                  {index === 3 && `Expected delivery: ${order.estimatedDelivery}`}
                                  {index === 4 && 'Your order has been delivered.'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {id !== 'cart123' && (
                  <Card className="mt-8">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                          <div className="space-y-1">
                            <p className="font-medium">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.addressLine1}</p>
                            {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                            <p>{shippingAddress.country}</p>
                            <p className="mt-2">{shippingAddress.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Method</h3>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-gray-600 mt-1">Estimated delivery: {order.estimatedDelivery}</p>
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-gray-600 mt-1">Visa ending in 4242</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Billing Address</h3>
                          <div className="space-y-1">
                            <p className="font-medium">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.addressLine1}</p>
                            {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                            <p>{shippingAddress.country}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <OrderSummary 
                  orderItems={order.items}
                  subtotal={order.subtotal}
                  tax={order.tax}
                  shipping={order.shipping}
                  total={order.total}
                />
                
                {id === 'cart123' && !showShippingForm && (
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setShowShippingForm(true)}
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetails;
