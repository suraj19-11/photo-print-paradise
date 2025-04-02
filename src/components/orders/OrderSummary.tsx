
import { ShoppingBag, Truck, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  orderItems?: { 
    id: string;
    name: string;
    size: string;
    paper: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
}

const OrderSummary = ({ 
  orderItems = [], 
  subtotal = 0, 
  tax = 0, 
  shipping = 0, 
  total = 0 
}: OrderSummaryProps) => {
  // Example data if none is provided
  const demoItems = [
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
  ];

  const itemsToShow = orderItems.length > 0 ? orderItems : demoItems;
  const calculatedSubtotal = orderItems.length > 0 ? subtotal : 5.75;
  const calculatedTax = orderItems.length > 0 ? tax : 0.46;
  const calculatedShipping = orderItems.length > 0 ? shipping : 4.99;
  const calculatedTotal = orderItems.length > 0 ? total : 11.20;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>

        <div className="space-y-4 mb-6">
          {itemsToShow.map((item) => (
            <div key={item.id} className="flex items-start">
              <div className="h-16 w-16 rounded bg-gray-100 mr-4 overflow-hidden flex-shrink-0">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <span className="text-xs text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.size} • {item.paper} • Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${calculatedSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${calculatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>${calculatedShipping.toFixed(2)}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${calculatedTotal.toFixed(2)}</span>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-md flex items-center">
          <Truck className="h-5 w-5 text-primary mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Estimated Delivery</p>
            <p className="text-xs text-gray-500">3-5 business days</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">
          Proceed to Checkout
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
