
import { supabase } from '@/lib/supabase';
import { Order, OrderItem } from '@/lib/supabase';
import { isDevelopmentMode } from '@/lib/supabase';

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
  if (isDevelopmentMode && id.startsWith('order-')) {
    // Mock data for development mode
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      return orderData;
    }
    return null;
  }

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
  if (isDevelopmentMode && id.startsWith('order-')) {
    // For development mode, update local storage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      orderData.status = status;
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      return orderData;
    }
    return { id, status };
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    throw error;
  }

  return data;
};

export const cancelOrder = async (id: string) => {
  console.log("Cancelling order:", id);
  return updateOrderStatus(id, 'cancelled');
};

// Calculate order total from items
export const calculateOrderTotal = (items: any[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 4.99;
  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping
  };
};
