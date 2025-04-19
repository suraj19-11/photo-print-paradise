
import { Truck } from 'lucide-react';

const DeliveryEstimate = () => {
  return (
    <div className="mt-6 p-3 bg-gray-50 rounded-md flex items-center">
      <Truck className="h-5 w-5 text-primary mr-3" />
      <div className="flex-1">
        <p className="text-sm font-medium">Estimated Delivery</p>
        <p className="text-xs text-gray-500">3-5 business days</p>
      </div>
    </div>
  );
};

export default DeliveryEstimate;
