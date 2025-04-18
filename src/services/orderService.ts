import { supabase } from '@/lib/supabase';
import { Order, OrderItem } from '@/lib/supabase';

export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const createOrder = async (order: Partial<Order>, items: Partial<OrderItem>[]) => {
  // Start a transaction by using supabase.rpc if available, or manage it manually
  // First, create the order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  // Now create the order items with the new order ID
  if (items.length > 0) {
    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);

    if (itemsError) {
      // In a real application, you would want to roll back the order creation
      throw itemsError;
    }
  }

  return orderData;
};

export const updateOrderStatus = async (id: string, status: Order['status']) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const cancelOrder = async (id: string) => {
  return updateOrderStatus(id, 'cancelled');
};
