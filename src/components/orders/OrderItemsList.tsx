
import { Trash2 } from 'lucide-react';
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

interface OrderItem {
  id: string;
  name: string;
  size: string;
  paper: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
  isEditable?: boolean;
  onRemoveItem?: (itemId: string) => void;
}

const OrderItemsList = ({ items, isEditable, onRemoveItem }: OrderItemsListProps) => {
  return (
    <div className="space-y-4 mb-6">
      {items.map((item) => (
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
  );
};

export default OrderItemsList;
