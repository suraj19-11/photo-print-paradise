
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import OrderItemsList from './OrderItemsList';
import OrderTotals from './OrderTotals';
import DeliveryEstimate from './DeliveryEstimate';
import OrderSummaryActions from './OrderSummaryActions';
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
}: OrderSummaryProps) => {
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

        <OrderItemsList 
          items={itemsToShow}
          isEditable={isEditable}
          onRemoveItem={onRemoveItem}
        />

        <OrderTotals
          subtotal={calculatedSubtotal}
          tax={calculatedTax}
          shipping={calculatedShipping}
          total={calculatedTotal}
        />

        <DeliveryEstimate />

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
