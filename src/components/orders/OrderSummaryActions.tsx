
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { initializeRazorpay, createRazorpayOrder, initiateRazorpayPayment } from '@/services/paymentService';
import { createOrder, updateOrderStatus } from '@/services/orderService';
import { clearCart } from '@/services/cartService';

interface OrderSummaryActionsProps {
  items: any[];
  total: number;
  userId: string;
}

const OrderSummaryActions = ({ items, total, userId }: OrderSummaryActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      // Initialize Razorpay
      const isRazorpayReady = await initializeRazorpay();
      if (!isRazorpayReady) {
        toast({
          title: "Error",
          description: "Could not initialize payment system. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Create order in our system first
      const order = await createOrder(
        {
          user_id: userId,
          status: 'pending',
          total_amount: total,
          items_count: items.length,
        },
        items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          print_options: {
            size: item.size,
            paper: item.paper,
            type: item.type
          }
        }))
      );

      // Create Razorpay order
      const razorpayOrder = await createRazorpayOrder(total, order.id);

      // Initialize payment
      initiateRazorpayPayment({
        amount: total * 100, // Convert to paise
        currency: 'INR',
        name: 'PrintPoint',
        description: `Order #${order.id}`,
        order_id: razorpayOrder.id,
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
        handler: async (response: any) => {
          // Update order status
          await updateOrderStatus(order.id, 'confirmed');
          
          // Clear cart
          clearCart();
          
          // Show success message
          toast({
            title: "Payment Successful",
            description: "Your order has been placed successfully!",
          });
          
          // Redirect to order tracking
          navigate(`/order/${order.id}`);
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6">
      <Button 
        className="w-full" 
        size="lg"
        onClick={handlePayment}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default OrderSummaryActions;
