
import { loadScript } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;        // in paise (1 INR = 100 paise)
  currency?: string;     // Default is 'INR'
  name: string;          // Company/business name
  description?: string;  // Description of the purchase
  order_id: string;      // Order ID from your backend
  handler: (response: RazorpayResponse) => void;  // Success callback
  prefill?: {
    name?: string;       // Customer name
    email?: string;      // Customer email
    contact?: string;    // Customer phone
  };
  theme?: {
    color?: string;      // Color code for the payment screen
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

// Initialize Razorpay
export const initializeRazorpay = async (): Promise<boolean> => {
  try {
    // First check if Razorpay is already loaded
    if (window.Razorpay) {
      return true;
    }
    
    // If not loaded, attempt to load the script
    return await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    return false;
  }
};

// Create a Razorpay order (typically this would be done server-side)
export const createRazorpayOrder = async (amount: number, receipt: string): Promise<CreateOrderResponse> => {
  try {
    // In a real application, this would be a server call
    // Since we're using the test mode, we'll mock the response
    return {
      id: 'order_' + Math.random().toString(36).substring(2, 15),
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: receipt
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = (options: PaymentOptions): void => {
  // Ensure Razorpay is available
  if (!window.Razorpay) {
    console.error('Razorpay not initialized. Call initializeRazorpay first.');
    throw new Error('Razorpay not initialized');
  }
  
  const razorpayOptions = {
    key: "rzp_test_LkPzjKRe2votRG", // Use the test key
    amount: options.amount,
    currency: options.currency || 'INR',
    name: options.name,
    description: options.description || '',
    order_id: options.order_id,
    handler: options.handler,
    prefill: options.prefill || {},
    theme: options.theme || { color: '#3399cc' },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay payment:', error);
    throw error;
  }
};

// Verify Razorpay payment (typically done server-side)
export const verifyRazorpayPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
): Promise<boolean> => {
  try {
    // In a real application, this would be a server call to verify the payment
    // Since we're using the test mode, we'll mock the response
    return true;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};
