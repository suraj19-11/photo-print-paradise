
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string;
  name: string;
  size: string;
  paper: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  type: 'photo' | 'document';
}

// Custom event to notify components when cart changes
const dispatchCartUpdatedEvent = () => {
  window.dispatchEvent(new Event('cartUpdated'));
};

// Get all items in the cart
export const getCartItems = (): CartItem[] => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

// Add an item to the cart
export const addToCart = (item: Omit<CartItem, 'id'>): CartItem => {
  try {
    const cartItems = getCartItems();
    const newItem = { ...item, id: uuidv4() };
    cartItems.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Notify listeners that cart has been updated
    dispatchCartUpdatedEvent();
    return newItem;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = (itemId: string): void => {
  try {
    const cartItems = getCartItems();
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    // Notify listeners that cart has been updated
    dispatchCartUpdatedEvent();
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Update item quantity
export const updateCartItemQuantity = (itemId: string, quantity: number): void => {
  try {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }

    const cartItems = getCartItems();
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    // Notify listeners that cart has been updated
    dispatchCartUpdatedEvent();
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

// Clear the entire cart
export const clearCart = (): void => {
  localStorage.setItem('cartItems', JSON.stringify([]));
  // Notify listeners that cart has been updated
  dispatchCartUpdatedEvent();
};

// Get cart count
export const getCartCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

// Get cart subtotal
export const getCartSubtotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};
