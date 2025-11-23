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
            className={`w-full px-4 py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
              isFocused
                ? 'border-blue-500 dark:border-blue-400 shadow-md'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
