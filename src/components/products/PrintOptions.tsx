
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShoppingBag } from 'lucide-react';
import { 
  initializeRazorpay, 
  createRazorpayOrder, 
  initiateRazorpayPayment,
  RazorpayResponse
} from '@/services/paymentService';
import { addToCart } from '@/services/cartService';

// Print size options
const sizes = [
  { id: 'size-1', name: '4×6″', price: 0.25 },
  { id: 'size-2', name: '5×7″', price: 0.50 },
  { id: 'size-3', name: '8×10″', price: 1.25 },
  { id: 'size-4', name: '11×14″', price: 3.50 },
  { id: 'size-5', name: '16×20″', price: 7.99 },
];

// Paper type options
const paperTypes = [
  { id: 'paper-1', name: 'Glossy', price: 0 },
  { id: 'paper-2', name: 'Matte', price: 0 },
  { id: 'paper-3', name: 'Luster', price: 0.25 },
  { id: 'paper-4', name: 'Metallic', price: 0.50 },
  { id: 'paper-5', name: 'Deep Matte', price: 0.35 },
];

const PrintOptions = () => {
  const [selectedSize, setSelectedSize] = useState(sizes[0].id);
  const [selectedPaper, setSelectedPaper] = useState(paperTypes[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    // Initialize Razorpay when the component mounts
    const initRazorpay = async () => {
      const ready = await initializeRazorpay();
      setIsRazorpayReady(ready);
      
      if (!ready) {
        toast({
          title: "Payment service unavailable",
          description: "Unable to load payment service. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    initRazorpay();
  }, []);

  const calculatePrice = () => {
    const sizePrice = sizes.find(size => size.id === selectedSize)?.price || 0;
    const paperPrice = paperTypes.find(paper => paper.id === selectedPaper)?.price || 0;
    return ((sizePrice + paperPrice) * quantity).toFixed(2);
  };

  const handlePayment = async () => {
    if (!isRazorpayReady) {
      toast({
        title: "Payment service unavailable",
        description: "Please try again later.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to proceed with payment.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Get print details
      const size = sizes.find(size => size.id === selectedSize)?.name;
      const paper = paperTypes.find(paper => paper.id === selectedPaper)?.name;
      const totalAmount = parseFloat(calculatePrice());
      
      // Create a Razorpay order
      const orderResponse = await createRazorpayOrder(
        totalAmount, 
        `PRINT-${Date.now()}`
      );
      
      // Initialize the payment
      initiateRazorpayPayment({
        amount: orderResponse.amount,
        name: "PrintPoint",
        description: `${quantity} ${size} ${paper} print(s)`,
        order_id: orderResponse.id,
        prefill: {
          name: profile ? `${profile.first_name} ${profile.last_name}` : undefined,
          email: user.email || undefined,
        },
        handler: (response: RazorpayResponse) => {
          handlePaymentSuccess(response, orderResponse.id);
        },
        theme: {
          color: "#7c3aed" // Primary color for Tailwind's purple-600
        }
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment failed",
        description: "Could not initialize payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = (response: RazorpayResponse, orderId: string) => {
    const size = sizes.find(size => size.id === selectedSize)?.name;
    const paper = paperTypes.find(paper => paper.id === selectedPaper)?.name;
    
    // Here you would typically call your backend to verify the payment
    // and create the order in your database
    
    toast({
      title: "Payment successful",
      description: `Your payment for ${quantity} ${size} ${paper} print(s) has been processed successfully.`,
    });
    
    // Simulate order creation and redirect to order details
    setTimeout(() => {
      navigate(`/order/${orderId}`);
    }, 1500);
  };

  const handleAddToCart = () => {
    try {
      const size = sizes.find(size => size.id === selectedSize);
      const paper = paperTypes.find(paper => paper.id === selectedPaper);
      
      if (!size || !paper) {
        throw new Error("Invalid selection");
      }
      
      const item = {
        name: 'Photo Print',
        size: size.name,
        paper: paper.name,
        quantity: quantity,
        price: parseFloat(`${(size.price + paper.price).toFixed(2)}`),
        imageUrl: '/placeholder.svg',
        type: 'photo' as const
      };
      
      addToCart(item);
      
      toast({
        title: "Added to cart",
        description: `${quantity} ${size.name} ${paper.name} print(s) added to your cart`,
      });
      
      // Navigate to the cart page after adding to cart
      navigate('/order/cart123');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6">Customize Your Print</h3>

        {/* Print Size Section */}
        <div className="mb-6">
          <h4 className="text-base font-medium mb-3">Print Size</h4>
          <RadioGroup 
            value={selectedSize} 
            onValueChange={setSelectedSize}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {sizes.map(size => (
              <div key={size.id} className="flex items-center space-x-2">
                <RadioGroupItem value={size.id} id={size.id} />
                <Label htmlFor={size.id} className="flex justify-between w-full">
                  <span>{size.name}</span>
                  <span className="text-gray-500">₹{size.price.toFixed(2)}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Paper Type Section */}
        <div className="mb-6">
          <h4 className="text-base font-medium mb-3">Paper Type</h4>
          <RadioGroup 
            value={selectedPaper} 
            onValueChange={setSelectedPaper}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {paperTypes.map(paper => (
              <div key={paper.id} className="flex items-center space-x-2">
                <RadioGroupItem value={paper.id} id={paper.id} />
                <Label htmlFor={paper.id} className="flex justify-between w-full">
                  <span>{paper.name}</span>
                  {paper.price > 0 && (
                    <span className="text-gray-500">+₹{paper.price.toFixed(2)}</span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Quantity Section */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h4 className="text-base font-medium">Quantity</h4>
            <span className="text-gray-600">{quantity}</span>
          </div>
          <Slider
            defaultValue={[1]}
            max={100}
            step={1}
            value={[quantity]}
            onValueChange={(value) => setQuantity(value[0])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Price per print:</span>
            <span className="font-medium">
              ₹{(Number(calculatePrice()) / quantity).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">₹{calculatePrice()}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={handlePayment}
            disabled={isProcessingPayment || !isRazorpayReady}
          >
            {isProcessingPayment ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </Button>
          
          <Button variant="outline" className="w-full" onClick={handleAddToCart}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintOptions;
