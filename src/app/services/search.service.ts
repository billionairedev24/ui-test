import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import axios from 'axios';
import {SearchSuggestion} from "@/types/types";

// Mock data for demonstration
const MOCK_PRODUCT_SUGGESTIONS = [
  { text: 'iPhone 13', category: 'Electronics', count: 150 },
  { text: 'iPhone 13 Pro', category: 'Electronics', count: 100 },
  { text: 'iPhone 13 Pro Max', category: 'Electronics', count: 75 },
  { text: 'iPhone 13 Mini', category: 'Electronics', count: 50 },
  { text: 'iPhone Cases', category: 'Accessories', count: 200 },
];

const MOCK_ADDRESS_SUGGESTIONS = [
  { text: '123 Main St, New York, NY 10001', category: 'Residential', count: 1 },
  { text: '123 Broadway, New York, NY 10002', category: 'Commercial', count: 1 },
  { text: '123 Park Ave, New York, NY 10003', category: 'Residential', count: 1 },
];

export const searchService = {
  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      return MOCK_PRODUCT_SUGGESTIONS.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      return [];
    }
  },

  async getAddressSuggestions(query: string): Promise<SearchSuggestion[]> {
    try {
      // In a real app, this would call an address validation API
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
      
      return MOCK_ADDRESS_SUGGESTIONS.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      return [];
    }
  }
};