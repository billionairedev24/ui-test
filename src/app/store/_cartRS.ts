import { Product } from '@/types/types';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';



export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode?: string;
  taxRate: number;
}

const initialState: CartState = {
  items: [],
  taxRate: 0.08, // 8% tax rate
};

class CartStore {
  private state$ = new BehaviorSubject<CartState>(initialState);

  // Selectors
  getState$ = () => this.state$.asObservable();

  getItems$ = () => this.state$.pipe(
      map(state => state.items)
  );

  getSubtotal$ = () => this.state$.pipe(
      map(state => state.items.reduce(
          (sum, item) => sum + (item.price * (1 - item.discount / 100) * item.quantity),
          0
      ))
  );

  getTax$ = () => this.getSubtotal$().pipe(
      map(subtotal => subtotal * this.state$.value.taxRate)
  );

  getTotal$ = () => this.getSubtotal$().pipe(
      map(subtotal => subtotal + (subtotal * this.state$.value.taxRate))
  );

  // Actions
  addToCart(product: Product) {
    const currentState = this.state$.value;
    const existingItem = currentState.items.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = currentState.items.map(item =>
          item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
      );
      this.state$.next({ ...currentState, items: updatedItems });
    } else {
      this.state$.next({
        ...currentState,
        items: [...currentState.items, { ...product, quantity: 1 }],
      });
    }
  }

  removeFromCart(productId: number) {
    const currentState = this.state$.value;
    this.state$.next({
      ...currentState,
      items: currentState.items.filter(item => item.id !== productId),
    });
  }

  updateQuantity(productId: number, quantity: number) {
    const currentState = this.state$.value;
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = currentState.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
    );
    this.state$.next({ ...currentState, items: updatedItems });
  }

  applyCoupon(code: string) {
    // Mock coupon validation
    const validCoupons = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
    };

    const discount = validCoupons[code as keyof typeof validCoupons];
    if (discount) {
      this.state$.next({
        ...this.state$.value,
        couponCode: code,
      });
      return true;
    }
    return false;
  }

  clearCart() {
    this.state$.next(initialState);
  }
}

export const cartStore = new CartStore();