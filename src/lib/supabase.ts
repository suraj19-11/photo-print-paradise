
import { createClient } from '@supabase/supabase-js';

// For development and testing purposes only
// In production, these should be environment variables
const fallbackSupabaseUrl = 'https://your-supabase-project-url.supabase.co';
const fallbackSupabaseKey = 'your-supabase-anon-key';

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
