import { BehaviorSubject } from 'rxjs';
import { CartItem, ShippingOption } from '@/types/types';

const shippingOptionsSubject = new BehaviorSubject<ShippingOption[]>([]);
const selectedShippingSubject = new BehaviorSubject<ShippingOption | null>(null);

// Mock shipping calculation based on weight and dimensions
const calculateShippingCost = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const weight = item.weight!;
    return total + (weight * 0.1 * item.quantity); // $0.10 per gram
  }, 0);
};

export const shippingService = {
  shippingOptions: shippingOptionsSubject.asObservable(),
  selectedShipping: selectedShippingSubject.asObservable(),

  async calculateShippingOptions(items: CartItem[]): Promise<ShippingOption[]> {
    const baseRate = calculateShippingCost(items);
    
    const options: ShippingOption[] = [
      {
        id: 'economy',
        name: 'Economy',
        description: 'Delivery in 5-7 business days',
        price: baseRate,
        estimatedDays: '5-7',
      },
      {
        id: 'standard',
        name: 'Standard',
        description: 'Delivery in 3-5 business days',
        price: baseRate * 1.5,
        estimatedDays: '3-5',
      },
      {
        id: 'express',
        name: 'Express',
        description: 'Delivery in 1-2 business days',
        price: baseRate * 2.5,
        estimatedDays: '1-2',
      },
      {
        id: 'overnight',
        name: 'Overnight',
        description: 'Next day delivery',
        price: baseRate * 4,
        estimatedDays: '1',
      },
    ];

    shippingOptionsSubject.next(options);
    return options;
  },

  selectShippingOption(option: ShippingOption) {
    selectedShippingSubject.next(option);
  },

  clearShippingOption() {
    selectedShippingSubject.next(null);
  },
};