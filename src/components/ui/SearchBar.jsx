import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../utils/helpers';

/**
 * Advanced SearchBar Component
 * Mendukung search & filter dengan berbagai opsi
 */
const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  onFilterChange,
  filters = [],
  searchTypes = [],
  defaultSearchType = 'all',
  className = '',
  showAdvanced = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState(defaultSearchType);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);

  const debouncedSearch = debounce((value, type) => {
    onSearch?.(value, type);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value, selectedSearchType);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  const handleSearchTypeChange = (e) => {
    const value = e.target.value;
    setSelectedSearchType(value);
    if (searchTerm) {
      debouncedSearch(searchTerm, value);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedFilter('');
    onSearch?.('', selectedSearchType);
    onFilterChange?.('');
    searchInputRef.current?.focus();
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Type Selector (if multiple types) */}
        {searchTypes.length > 0 && (
          <select
            value={selectedSearchType}
            onChange={handleSearchTypeChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm font-medium"
          >
            {searchTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        )}

        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-5 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isFocused ? 'border-blue-200 shadow-md' : 'border-gray-200 dark:border-gray-700'
            }`}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Selector */}
        {filters.length > 0 && (
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="">All Categories</option>
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Search Results Count / Info (optional) */}
      {showAdvanced && searchTerm && (
        <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
          Searching in: <span className="font-medium">{selectedSearchType === 'all' ? 'All' : searchTypes.find(t => t.value === selectedSearchType)?.label}</span>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onFilterChange: PropTypes.func,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  searchTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  defaultSearchType: PropTypes.string,
  className: PropTypes.string,
  showAdvanced: PropTypes.bool,
};

export default SearchBar;
