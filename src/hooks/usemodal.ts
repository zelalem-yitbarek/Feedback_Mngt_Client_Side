/**
 * Reusable modal state management hook
 * Provides consistent modal open/close logic with optional data
 */

import { useState, useCallback } from "react";

interface UseModalOptions<T = any> {
  onOpen?: (data?: T) => void;
  onClose?: (data?: T) => void;
}

export function useModal<T = any>(options?: UseModalOptions<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback(
    (modalData?: T) => {
      setData(modalData ?? null);
      setIsOpen(true);
      options?.onOpen?.(modalData);
    },
    [options]
  );

  const close = useCallback(() => {
    const currentData = data;
    setIsOpen(false);
    setData(null);
    options?.onClose?.(currentData ?? undefined);
  }, [data, options]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  };
}

/**
 * Hook for managing multiple modals
 */
export function useModals<T extends Record<string, any>>(
  modalKeys: (keyof T)[]
) {
  const modals = modalKeys.reduce(
    (acc, key) => {
      acc[key] = useModal<T[keyof T]>();
      return acc;
    },
    {} as Record<keyof T, ReturnType<typeof useModal>>
  );

  const closeAll = useCallback(() => {
    Object.values(modals).forEach((modal) => modal.close());
  }, [modals]);

  return {
    ...modals,
    closeAll,
  };
}

