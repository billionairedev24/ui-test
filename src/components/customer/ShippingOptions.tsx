import React from 'react';
import { Truck } from 'lucide-react';
import {ShippingOption} from "@/types/types";

interface ShippingOptionsProps {
  options: ShippingOption[];
  selectedOption: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
  className?: string;
}

const USD_CURRENCY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  options,
  selectedOption,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-base font-medium text-gray-900">Shipping Method</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedOption?.id === option.id
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-yellow-400'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={selectedOption?.id === option.id}
              onChange={() => onSelect(option)}
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{option.name}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {USD_CURRENCY.format(option.price)}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Truck size={16} className="mr-1" />
                <span>Estimated delivery: {option.estimatedDays} business days</span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};