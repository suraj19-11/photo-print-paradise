import { ShoppingBag, Truck, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
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
import { useMemo } from 'react';

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
  showCheckoutButton?: boolean;
  onRemoveItem?: (itemId: string) => void;
  isEditable?: boolean;
  userId?: string;
}

const OrderSummary = ({ 
  orderItems = [], 
  subtotal = 0, 
  tax = 0, 
  shipping = 0, 
  total = 0,
  showCheckoutButton = false,
  onRemoveItem,
  isEditable = false,
  userId
}: OrderSummaryProps & { userId?: string }) => {
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
  
  const calculations = useMemo(() => {
    if (orderItems.length === 0) {
      return {
        calculatedSubtotal: subtotal,
        calculatedTax: tax,
        calculatedShipping: shipping,
        calculatedTotal: total
      };
    }
    
    const calculatedSubtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculatedTax = calculatedSubtotal * 0.08;
    const calculatedShipping = 4.99;
    const calculatedTotal = calculatedSubtotal + calculatedTax + calculatedShipping;
    
    return {
      calculatedSubtotal,
      calculatedTax,
      calculatedShipping,
      calculatedTotal
    };
  }, [orderItems, subtotal, tax, shipping, total]);
  
  const { calculatedSubtotal, calculatedTax, calculatedShipping, calculatedTotal } = calculations;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>

        <div className="space-y-4 mb-6">
          {itemsToShow.map((item) => (
            <div key={item.id} className="flex items-start group">
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
              <div className="text-right flex flex-col items-end">
                <p className="font-medium">₹{item.price.toFixed(2)}</p>
                {isEditable && onRemoveItem && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="p-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this item from your order?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onRemoveItem(item.id)}>
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{calculatedSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{calculatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>₹{calculatedShipping.toFixed(2)}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{calculatedTotal.toFixed(2)}</span>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-md flex items-center">
          <Truck className="h-5 w-5 text-primary mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Estimated Delivery</p>
            <p className="text-xs text-gray-500">3-5 business days</p>
          </div>
        </div>

        {showCheckoutButton && userId && (
          <OrderSummaryActions 
            items={orderItems.length > 0 ? orderItems : demoItems}
            total={calculatedTotal}
            userId={userId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
