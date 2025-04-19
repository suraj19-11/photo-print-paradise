
import { Separator } from '@/components/ui/separator';

interface OrderTotalsProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const OrderTotals = ({ subtotal, tax, shipping, total }: OrderTotalsProps) => {
  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>₹{shipping.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </>
  );
};

export default OrderTotals;
