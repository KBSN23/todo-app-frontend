/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react";
import type { StoreApi, UseBoundStore } from "zustand";

export const renderStore = <T extends StoreApi<object>>(
  useStore: UseBoundStore<T>,
) => {
  (useStore as any)?.persist?.clearStorage?.();
  useStore.setState(useStore.getInitialState());
  return renderHook(() => useStore());
};
