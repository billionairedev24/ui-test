import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, TrendingUp, ChevronDown } from 'lucide-react';
import { useDebounce } from "@/app/hooks/useDebounce";

interface SearchSuggestion {
  type: 'trending' | 'recent' | 'product' | 'category';
  text: string;
  category?: string;
  count?: number;
}

interface SearchBarProps {
  selectedCategory: string;
  onCategoryChange?: (category: string) => void;
}

const TRENDING_SEARCHES: SearchSuggestion[] = [
  { type: 'trending', text: 'iPhone 15 Pro', category: 'Electronics', count: 15000 },
  { type: 'trending', text: 'PS5 Console', category: 'Gaming', count: 12000 },
  { type: 'trending', text: 'Air Jordan 1', category: 'Fashion', count: 9000 },
];

const CATEGORIES = [
  { name: 'All', count: '300K+ products' },
  { name: 'Electronics', count: '50K+ products' },
  { name: 'Fashion', count: '100K+ products' },
  { name: 'Home & Garden', count: '30K+ products' },
  { name: 'Sports', count: '25K+ products' },
  { name: 'Books', count: '40K+ products' },
  { name: 'Toys', count: '20K+ products' },
  { name: 'Health & Beauty', count: '35K+ products' },
  { name: 'Automotive', count: '15K+ products' }
];

export const SearchBar: React.FC<SearchBarProps> = ({ selectedCategory = 'All', onCategoryChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions(TRENDING_SEARCHES);
        return;
      }

      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        setSuggestions(
            TRENDING_SEARCHES.filter(suggestion =>
                suggestion.text.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleCategorySelect = (category: string) => {
    onCategoryChange?.(category);
    setShowCategories(false);
  };

  return (
      <div className="flex-1 flex">
        {/* Category Selector */}
        <div ref={categoryRef} className="relative">
          <button
              onClick={() => setShowCategories(!showCategories)}
              className="h-11 px-4 bg-yellow-400 text-black font-medium rounded-l-full flex items-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            <span className="truncate max-w-[120px]">{selectedCategory}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} />
          </button>

          {/* Category Dropdown */}
          {showCategories && (
              <>
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setShowCategories(false)}
                />
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  {CATEGORIES.map((category) => (
                      <button
                          key={category.name}
                          onClick={() => handleCategorySelect(category.name)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex justify-between items-center group"
                      >
                        <span className="text-gray-900">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </button>
                  ))}
                </div>
              </>
          )}
        </div>

        {/* Search Input and Suggestions */}
        <div ref={wrapperRef} className="relative flex-1">
          <div className="relative flex">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full h-11 pl-10 pr-4 text-gray-900 bg-white border-0 focus:ring-2 focus:ring-yellow-400 focus:z-10"
                placeholder="Search products, brands, and categories..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {loading ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              ) : (
                  <Search className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <button className="px-8 bg-yellow-400 text-black font-medium hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-r-full transition-all duration-200">
              Search
            </button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {query === '' ? (
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Trending Searches</h3>
                      {TRENDING_SEARCHES.map((suggestion, index) => (
                          <button
                              key={index}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between rounded-md group"
                              onClick={() => setQuery(suggestion.text)}
                          >
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 text-red-500 mr-2 transition-transform duration-200 group-hover:scale-110" />
                              <span className="text-gray-900">{suggestion.text}</span>
                            </div>
                            <span className="text-xs text-gray-500">{suggestion.count?.toLocaleString()} searches</span>
                          </button>
                      ))}
                    </div>
                ) : (
                    suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between group"
                            onClick={() => setQuery(suggestion.text)}
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 text-gray-400 mr-2 transition-transform duration-200 group-hover:scale-110" />
                            <span className="text-gray-900">{suggestion.text}</span>
                          </div>
                          {suggestion.category && (
                              <span className="text-sm text-gray-500">in {suggestion.category}</span>
                          )}
                        </button>
                    ))
                )}
              </div>
          )}
        </div>
      </div>
  );
};