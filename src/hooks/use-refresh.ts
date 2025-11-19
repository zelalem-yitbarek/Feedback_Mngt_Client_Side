import { useState, useCallback, useRef } from "react";
import { useTabVisibility } from "./use-tab-visiblity";
import { REFRESH_DEBOUNCE, ACTIVITY_THRESHOLDS } from "../lib/constants";

interface UseRefreshOptions {
  minimumInterval?: number;
  activityThreshold?: number;
  autoRefreshThreshold?: number;
  onRefresh?: () => Promise<void> | void;
}

export function useRefresh(options: UseRefreshOptions = {}) {
  const {
    minimumInterval = REFRESH_DEBOUNCE.DEFAULT,
    activityThreshold = ACTIVITY_THRESHOLDS.STALE_DATA,
    autoRefreshThreshold = ACTIVITY_THRESHOLDS.AUTO_REFRESH,
    onRefresh,
  } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);
  const { lastActivity } = useTabVisibility();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const refresh = useCallback(
    async (force = false) => {
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefresh;
      const timeSinceLastActivity = now - lastActivity;

      // Prevent too frequent refreshes
      if (!force && timeSinceLastRefresh < minimumInterval) {
        console.log("Refresh blocked: Too frequent");
        return;
      }

      // Smart refresh: only refresh if data is stale or user has been inactive
      const shouldRefresh =
        force ||
        timeSinceLastActivity > activityThreshold ||
        timeSinceLastRefresh > autoRefreshThreshold;

      if (!shouldRefresh && !force) {
        console.log("Refresh blocked: Data is fresh");
        return;
      }

      try {
        setIsRefreshing(true);
        setLastRefresh(now);

        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error("Refresh failed:", error);
        throw error;
      } finally {
        setIsRefreshing(false);
      }
    },
    [
      lastRefresh,
      lastActivity,
      minimumInterval,
      activityThreshold,
      autoRefreshThreshold,
      onRefresh,
    ]
  );

  const debouncedRefresh = useCallback(
    (delay = minimumInterval) => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      refreshTimeoutRef.current = setTimeout(() => {
        refresh();
      }, delay);
    },
    [refresh, minimumInterval]
  );

  return {
    isRefreshing,
    lastRefresh,
    refresh,
    debouncedRefresh,
    forceRefresh: () => refresh(true),
  };
}
