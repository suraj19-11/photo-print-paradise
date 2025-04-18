
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Download, Clock, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
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
import { createOrder, cancelOrder, getOrderById } from '@/services/orderService';
import { v4 as uuidv4 } from 'uuid';
import { 
  initializeRazorpay, 
  createRazorpayOrder, 
  initiateRazorpayPayment,
  RazorpayResponse
} from '@/services/paymentService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  
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

  useEffect(() => {
    const initRazorpay = async () => {
      try {
        console.log("Initializing Razorpay...");
        const ready = await initializeRazorpay();
        setIsRazorpayReady(ready);
        
        if (ready) {
          console.log("Razorpay initialized successfully");
        } else {
          console.error("Failed to initialize Razorpay");
          toast({
            title: "Payment service unavailable",
            description: "Unable to load payment service. Please try again later.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error initializing Razorpay:", error);
        setIsRazorpayReady(false);
        toast({
          title: "Payment service unavailable",
          description: "Unable to load payment service. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    initRazorpay();
  }, [toast]);

  // Initialize form with default values
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      phone: '',
    },
  });

  const initiatePayment = async (shippingData: ShippingFormValues) => {
    if (!isRazorpayReady) {
      toast({
        title: "Payment service unavailable",
        description: "Please try again later.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const totalAmount = order.total;
      
      const orderResponse = await createRazorpayOrder(
        totalAmount, 
        `PRINT-${Date.now()}`
      );
      
      console.log("Order created:", orderResponse);
      
      localStorage.setItem('pendingOrderShipping', JSON.stringify(shippingData));
      localStorage.setItem('pendingOrderId', orderResponse.id);
      
      initiateRazorpayPayment({
        amount: orderResponse.amount,
        name: "PrintPoint",
        description: `Print order (${order.items.length} items)`,
        order_id: orderResponse.id,
        prefill: {
          name: shippingData.fullName,
          email: user?.email || undefined,
          contact: shippingData.phone
        },
        handler: (response: RazorpayResponse) => {
          handlePaymentSuccess(response, orderResponse.id, shippingData);
        },
        theme: {
          color: "#7c3aed" // Primary color for Tailwind's purple-600
        }
      });
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: error.message || "Could not process payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (
    response: RazorpayResponse, 
    orderId: string, 
    shippingData: ShippingFormValues
  ) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shipping = 4.99;
      const total = subtotal + tax + shipping;
      
      const formattedAddress = `${shippingData.fullName}, ${shippingData.addressLine1}, ${shippingData.addressLine2 ? shippingData.addressLine2 + ', ' : ''}${shippingData.city}, ${shippingData.state}, ${shippingData.zipCode}, ${shippingData.country}`;
      
      const orderData = {
        user_id: user!.id,
        status: 'confirmed' as const,
        total_amount: total,
        shipping_address: formattedAddress,
        shipping_method: 'Standard',
        payment_method: 'Razorpay',
        items_count: cartItems.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const orderItems = cartItems.map((item: any) => ({
        product_id: item.id || uuidv4(),
        quantity: item.quantity,
        price: item.price,
        print_options: {
          size: item.size,
          paper: item.paper,
          finish: item.finish,
          docOption: item.docOption,
          colorOption: item.colorOption,
          sideOption: item.sideOption
        }
      }));
      
      let newOrderId;
      if (isDevelopmentMode) {
        newOrderId = `order-${uuidv4().substring(0, 8)}`;
        
        localStorage.setItem('lastOrderShipping', JSON.stringify(shippingData));
        localStorage.setItem('lastOrder', JSON.stringify({
          ...orderData,
          id: newOrderId,
          items: cartItems
        }));
        
        toast({
          title: "Payment successful",
          description: "Your order has been placed successfully."
        });
      } else {
        const orderResult = await createOrder(orderData, orderItems);
        newOrderId = orderResult.id;
      }
      
      localStorage.removeItem('cartItems');
      localStorage.removeItem('pendingOrderShipping');
      localStorage.removeItem('pendingOrderId');
      
      navigate(`/order/${newOrderId}`);
      
    } catch (error: any) {
      console.error('Error processing order after payment:', error);
      toast({
        variant: "destructive",
        title: "Order processing failed",
        description: error.message || "Your payment was successful but we couldn't process your order. Please contact support."
      });
      setIsProcessing(false);
    }
  };

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
      form.handleSubmit((data) => initiatePayment(data))();
      return;
    }

    if (shippingData) {
      initiatePayment(shippingData);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id!);
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
      });
      setOrder({
        ...order,
        status: 'cancelled'
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not cancel order. Please try again."
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = order.items.filter(item => item.id !== itemId);
    const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newTax = newSubtotal * 0.08;
    const newTotal = newSubtotal + newTax + order.shipping;
    
    setOrder({
      ...order,
      items: updatedItems,
      subtotal: newSubtotal,
      tax: newTax,
      total: newTotal
    });
    
    // Update cart items in localStorage if we're on the cart page
    if (id === 'cart123') {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const loadOrderData = useCallback(async () => {
    if (id === 'cart123') {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (cartItems.length > 0) {
        const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
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
      setShowShippingForm(id === 'cart123'); // Auto-show shipping form for cart
      setIsLoading(false);
      return;
    }

    if (!id || !user) {
      setIsLoading(false);
      return;
    }
    
    try {
      if (isDevelopmentMode) {
        const savedOrder = localStorage.getItem('lastOrder');
        const savedShippingAddress = localStorage.getItem('lastOrderShipping');
        
        if (savedOrder) {
          const orderData = JSON.parse(savedOrder);
          const shippingAddress = savedShippingAddress ? JSON.parse(savedShippingAddress) : {
            fullName: 'John Doe',
            addressLine1: '123 Main Street',
            addressLine2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'India',
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
              items: orderData.items || order.items,
              subtotal: orderData.subtotal || order.subtotal,
              tax: orderData.tax || order.tax,
              shipping: orderData.shipping || order.shipping,
              total: orderData.total_amount || order.total,
              shippingAddress
            });
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(false);
        }
      } else {
        const orderData = await getOrderById(id);
        
        if (orderData) {
          const orderItems = orderData.order_items.map((item: any) => ({
            id: item.id,
            name: item.product_name || 'Print Item',
            size: item.print_options?.size || 'Standard',
            paper: item.print_options?.paper || 'Standard',
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.image_url
          }));
          
          setOrder({
            id: orderData.id,
            date: new Date(orderData.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            status: orderData.status,
            items: orderItems,
            subtotal: orderData.total_amount - (orderData.tax || 0) - (orderData.shipping_fee || 4.99),
            tax: orderData.tax || 0,
            shipping: orderData.shipping_fee || 4.99,
            total: orderData.total_amount,
            estimatedDelivery: '3-5 business days from order date',
            shippingAddress: orderData.shipping_details || {
              fullName: 'John Doe',
              addressLine1: '123 Main Street',
              addressLine2: 'Apt 4B',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'India',
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
  }, [id, user, toast, order.shipping]);

  useEffect(() => {
    loadOrderData();
  }, [loadOrderData]);

  const orderProgress = [
    { id: 1, name: 'Confirmed', icon: CheckCircle, completed: order.status !== 'pending' && order.status !== 'cancelled', date: order.status !== 'pending' ? order.date : undefined },
    { id: 2, name: 'Processing', icon: Printer, completed: ['processing', 'ready', 'shipped', 'delivered', 'completed'].includes(order.status), date: ['processing', 'ready', 'shipped', 'delivered', 'completed'].includes(order.status) ? 'Processing' : undefined },
    { id: 3, name: 'Ready', icon: Clock, completed: ['ready', 'shipped', 'delivered', 'completed'].includes(order.status) },
    { id: 4, name: 'Shipped', icon: Truck, completed: ['shipped', 'delivered', 'completed'].includes(order.status) },
    { id: 5, name: 'Delivered', icon: CheckCircle, completed: ['delivered', 'completed'].includes(order.status) },
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
                        <div className="flex gap-2">
                          {id !== 'cart123' && order.status !== 'cancelled' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                  Cancel Order
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this order? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>No, keep order</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleCancelOrder}>
                                    Yes, cancel order
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          {id !== 'cart123' && (
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {order.status === 'cancelled' ? (
                        <Alert variant="destructive" className="mb-6">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Order Cancelled</AlertTitle>
                          <AlertDescription>
                            This order has been cancelled and will not be processed.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="mb-8">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Order Progress</span>
                            <span className="text-sm text-gray-500">{completedSteps} of {orderProgress.length} steps completed</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}
                      
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
                          <p className="font-medium">Razorpay</p>
                          <p className="text-gray-600 mt-1">Payment completed</p>
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
                  isEditable={id === 'cart123'}
                  onRemoveItem={id === 'cart123' ? handleRemoveItem : undefined}
                />
                
                {id === 'cart123' && !showShippingForm && (
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setShowShippingForm(true)}
                    disabled={order.items.length === 0}
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
