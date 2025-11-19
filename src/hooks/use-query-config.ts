/**
 * Reusable query configuration hook
 * Provides consistent query options across the application
 */

import { useTabVisibility } from "./use-tab-visiblity";
import { QUERY_STALE_TIMES, QUERY_GC_TIMES, API_CONFIG } from "@/lib/constants";
import type { UseQueryOptions } from "@tanstack/react-query";

interface UseQueryConfigOptions<TData = unknown, TError = Error> {
  staleTime?: number;
  gcTime?: number;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  refetchInterval?: number | false;
  retry?: number;
  retryDelay?: number | ((attemptIndex: number) => number);
  useTabVisibility?: boolean;
}

/**
 * Creates standardized query options with performance optimizations
 */
export function useQueryConfig<TData = unknown, TError = Error>(
  options: UseQueryConfigOptions<TData, TError> = {}
): Partial<UseQueryOptions<TData, TError>> {
  const { isVisible } = useTabVisibility();

  const {
    staleTime = QUERY_STALE_TIMES?.DEFAULT ?? 5 * 60 * 1000,
    gcTime = QUERY_GC_TIMES?.DEFAULT ?? 5 * 60 * 1000,
    enabled = true,
    refetchOnWindowFocus = false,
    refetchOnMount = false,
    refetchOnReconnect = true,
    refetchInterval = false,
    retry = API_CONFIG.RETRY_ATTEMPTS,
    retryDelay = (attemptIndex: number) =>
      Math.min(
        API_CONFIG.RETRY_DELAY_BASE * 2 ** attemptIndex,
        API_CONFIG.RETRY_DELAY_MAX
      ),
    useTabVisibility: useTabVisibilityOption = true,
  } = options;

  return {
    staleTime,
    gcTime,
    enabled: useTabVisibilityOption ? enabled && isVisible : enabled,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    refetchInterval,
    retry,
    retryDelay,
  };
}

/**
 * Pre-configured query options for common use cases
 */
export const queryConfigs = {
  dashboard: (enabled = true) =>
    useQueryConfig({
      staleTime: QUERY_STALE_TIMES?.DASHBOARD ?? 5 * 60 * 1000,
      gcTime: QUERY_GC_TIMES?.DASHBOARD ?? 5 * 60 * 1000,
      enabled,
    }),

  users: (enabled = true) =>
    useQueryConfig({
      staleTime: QUERY_STALE_TIMES?.USERS ?? 5 * 60 * 1000,
      gcTime: QUERY_GC_TIMES?.USERS ?? 5 * 60 * 1000,
      enabled,
    }),

  tenders: (enabled = true) =>
    useQueryConfig({
      staleTime: QUERY_STALE_TIMES?.TENDERS ?? 5 * 60 * 1000,
      enabled,
    }),

  bids: (enabled = true) =>
    useQueryConfig({
      staleTime: QUERY_STALE_TIMES?.BIDS ?? 5 * 60 * 1000,
      enabled,
    }),

  realtime: (enabled = true) =>
    useQueryConfig({
      staleTime: 0,
      refetchInterval: 30000,
      enabled,
    }),
};
