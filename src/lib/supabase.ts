
import { createClient } from '@supabase/supabase-js';

// For development and testing purposes only
// In production, these should be environment variables
// These values allow the app to build but won't actually connect to a real backend
// Replace these with your actual Supabase credentials when ready for real authentication
const fallbackSupabaseUrl = 'https://example-project.supabase.co';
const fallbackSupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlc3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDY2Mjk0MCwiZXhwIjoxOTM2MjM4OTQwfQ.RCeT6EwokwBtuZ92dI8AJlR9as5dv-vJ6ZfAYAHvndY';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseKey;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Define the type for user profiles
export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

// Define the type for orders
export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  created_at: string;
  updated_at: string;
  shipping_address?: string;
  shipping_method?: string;
  payment_method?: string;
  items_count: number;
};

// Define the type for order items
export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  print_options: Record<string, any>;
};

// Define the type for photos
export type Photo = {
  id: string;
  user_id: string;
  file_path: string;
  file_name: string;
  created_at: string;
  file_size: number;
  dimensions?: string;
  status: 'uploaded' | 'processing' | 'ready' | 'error';
};
