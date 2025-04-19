
import { loadScript } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase, isDevelopmentMode } from '@/lib/supabase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;        // in paise (1 INR = 100 paise)
  currency?: string;     // Default is 'INR'
  name: string;         // Company/business name
  description?: string;  // Description of the purchase
  order_id: string;     // Order ID from your backend
  handler: (response: RazorpayResponse) => void;  // Success callback
  prefill?: {
    name?: string;      // Customer name
    email?: string;     // Customer email
    contact?: string;   // Customer phone
  };
  theme?: {
    color?: string;     // Color code for the payment screen
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

// Create a Razorpay order
export const createRazorpayOrder = async (amount: number, receipt: string): Promise<CreateOrderResponse> => {
  try {
    if (!isDevelopmentMode) {
      // In production, this would call a Supabase edge function
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { amount: amount * 100, receipt },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } else {
      // In development mode, mock the response
      return {
        id: 'order_' + Math.random().toString(36).substring(2, 15),
        amount: amount * 100, // convert to paise
        currency: 'INR',
        receipt: receipt
      };
    }
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
    key: "rzp_test_LkPzjKRe2votRG", // Use the test key provided
    amount: options.amount,
    currency: options.currency || 'INR',
    name: options.name,
    description: options.description || '',
    order_id: options.order_id,
    handler: options.handler,
    prefill: options.prefill || {},
    theme: options.theme || { color: '#7c3aed' }, // Using Tailwind's purple-600
    modal: {
      ondismiss: function() {
        console.log('Payment modal closed');
      }
    },
    retry: {
      enabled: true,
      max_count: 3
    },
    notes: {
      address: "PrintPoint Headquarters"
    },
    // Add test mode indicator
    _: {
      test_mode: true,
      test_card: '4111 1111 1111 1111', // For testing
      test_expiry: '12/25',
      test_cvv: '123'
    }
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay payment:', error);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
): Promise<boolean> => {
  try {
    if (!isDevelopmentMode) {
      // In production, this would call a Supabase edge function
      const { data, error } = await supabase.functions.invoke('verify-razorpay-payment', {
        body: { paymentId, orderId, signature },
      });
      
      if (error) throw new Error(error.message);
      return data.verified;
    } else {
      // In development mode, mock the response
      return true;
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

// Store payment details in Supabase
export const storePaymentDetails = async (
  orderId: string,
  paymentId: string,
  amount: number,
  userId: string,
  status: string
): Promise<boolean> => {
  try {
    if (!isDevelopmentMode) {
      // Store payment details in Supabase
      const { error } = await supabase
        .from('payments')
        .insert({
          order_id: orderId,
          payment_id: paymentId,
          amount,
          user_id: userId,
          status,
          payment_method: 'Razorpay',
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
    }
    return true;
  } catch (error) {
    console.error('Error storing payment details:', error);
    return false;
  }
};
