
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Download, Clock, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderSummary from '@/components/orders/OrderSummary';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample order data - in a real app, this would come from an API
  const order = {
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
  };

  // Order progress steps
  const orderProgress = [
    { id: 1, name: 'Confirmed', icon: CheckCircle, completed: true, date: 'May 15, 2023' },
    { id: 2, name: 'Processing', icon: Printer, completed: true, date: 'May 16, 2023' },
    { id: 3, name: 'Ready', icon: Clock, completed: false },
    { id: 4, name: 'Shipped', icon: Truck, completed: false },
    { id: 5, name: 'Delivered', icon: CheckCircle, completed: false },
  ];

  // Calculate progress percentage
  const completedSteps = orderProgress.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / orderProgress.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center text-primary hover:underline mr-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Orders
              </Link>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Order Status</h2>
                        <p className="text-gray-500">Placed on {order.date}</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Order Progress</span>
                        <span className="text-sm text-gray-500">{completedSteps} of {orderProgress.length} steps completed</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    
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
                  </CardContent>
                </Card>
                
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                        <div className="space-y-1">
                          <p className="font-medium">John Doe</p>
                          <p>123 Main Street</p>
                          <p>Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
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
                          <p className="font-medium">John Doe</p>
                          <p>123 Main Street</p>
                          <p>Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <OrderSummary 
                  orderItems={order.items}
                  subtotal={order.subtotal}
                  tax={order.tax}
                  shipping={order.shipping}
                  total={order.total}
                />
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
