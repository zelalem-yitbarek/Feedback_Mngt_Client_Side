import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';

type DateRange = { from?: string; to?: string };

type FilterValue =
  | string
  | number
  | boolean
  | DateRange
  | string[]
  | undefined;

type FilterValues = Record<string, FilterValue>;

export interface FilterConfig {
  name: string;
  label: string;
  type: 'text' | 'select' | 'multi-select' | 'date-range' | 'switch';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface UseFiltersOptions {
  filterKey?: string;
  debounceTime?: number;
  onFilterChange?: (filters: FilterValues) => void;
}

export function useFilters(config: FilterConfig[], options: UseFiltersOptions = {}) {
  const { filterKey = 'filters', debounceTime = 300, onFilterChange } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isInitialized, setIsInitialized] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterValues>({});

  // FIX: Browser-compatible timeout type
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize filters from URL on mount
  React.useEffect(() => {
    if (isInitialized) return;

    const params = new URLSearchParams(searchParams);
    const filtersParam = params.get(filterKey);

    if (filtersParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(filtersParam));
        setFilters(parsed);
      } catch (error) {
        console.error('Failed to parse filters from URL', error);
      }
    }

    setIsInitialized(true);
  }, [searchParams, filterKey, isInitialized]);

  // Update URL when filters change
  const updateUrl = React.useCallback(
    (newFilters: FilterValues) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);

        // Remove empty filters
        const nonEmptyFilters = Object.entries(newFilters).reduce<FilterValues>(
          (acc, [key, value]) => {
            if (value === undefined || value === null || value === '') return acc;

            if (Array.isArray(value) && value.length === 0) return acc;

            if (typeof value === 'object' && !Array.isArray(value)) {
              const hasValue = Object.values(value).some(v => v !== undefined && v !== '');
              if (!hasValue) return acc;
            }

            acc[key] = value;
            return acc;
          },
        {});

        if (Object.keys(nonEmptyFilters).length > 0) {
          params.set(filterKey, encodeURIComponent(JSON.stringify(nonEmptyFilters)));
        } else {
          params.delete(filterKey);
        }

        // Reset page on filter change
        if (params.has('page')) {
          params.set('page', '1');
        }

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(url, { scroll: false });
        onFilterChange?.(nonEmptyFilters);
      }, debounceTime);
    },
    [searchParams, pathname, router, filterKey, debounceTime, onFilterChange]
  );

  // Update single filter
  const setFilterValue = React.useCallback(
    (name: string, value: FilterValue) => {
      setFilters(prev => {
        const updated = { ...prev, [name]: value };
        updateUrl(updated);
        return updated;
      });
    },
    [updateUrl]
  );

  // Update multiple filters
  const setMultipleFilters = React.useCallback(
    (newValues: FilterValues) => {
      setFilters(prev => {
        const merged = { ...prev, ...newValues };
        updateUrl(merged);
        return merged;
      });
    },
    [updateUrl]
  );

  // Clear a single filter
  const clearFilter = React.useCallback(
    (name: string) => {
      setFilters(prev => {
        const updated = { ...prev };
        delete updated[name];
        updateUrl(updated);
        return updated;
      });
    },
    [updateUrl]
  );

  // Clear all
  const clearAllFilters = React.useCallback(() => {
    setFilters({});
    updateUrl({});
  }, [updateUrl]);

  // Typed getter
  const getFilterValue = React.useCallback(
    <T extends FilterValue>(name: string, defaultValue: T): T => {
      const value = filters[name];
      return (value !== undefined ? value : defaultValue) as T;
    },
    [filters]
  );

  // Build API query params
  const buildQueryParams = React.useCallback(() => {
    const params: Record<string, string> = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined || value === null || value === '') continue;

      if (Array.isArray(value)) {
        if (value.length > 0) params[key] = value.join(',');
      } else if (typeof value === 'object') {
        const range = value as DateRange;
        if (range.from) params[`${key}_from`] = range.from;
        if (range.to) params[`${key}_to`] = range.to;
      } else if (typeof value === 'boolean') {
        params[key] = value ? 'true' : 'false';
      } else {
        params[key] = String(value);
      }
    }

    return params;
  }, [filters]);

  return {
    filters,
    setFilterValue,
    setMultipleFilters,
    clearFilter,
    clearAllFilters,
    getFilterValue,
    buildQueryParams,
    isInitialized,
  };
}

// -------------------------------
// Filtered data helper
// -------------------------------

export function useFilteredData<T>(
  data: T[],
  filterFn: (item: T, filters: FilterValues) => boolean
) {
  const [filteredData, setFilteredData] = React.useState<T[]>(data);
  const [isFiltering, setIsFiltering] = React.useState(false);

  const prevDataRef = React.useRef<T[]>(data);
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const applyFilters = React.useCallback(
    (filters: FilterValues) => {
      if (Object.keys(filters).length === 0) {
        setFilteredData(data);
        return;
      }

      setIsFiltering(true);

      const rafId = requestAnimationFrame(() => {
        const result = data.filter(item => filterFn(item, filters));
        if (isMounted.current) {
          setFilteredData(result);
          setIsFiltering(false);
        }
      });

      return () => cancelAnimationFrame(rafId);
    },
    [data, filterFn]
  );

  // Re-apply filters when data changes
  React.useEffect(() => {
    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
      prevDataRef.current = data;
      applyFilters({});
    }
  }, [data, applyFilters]);

  return {
    filteredData,
    isFiltering,
    applyFilters,
  };
}
