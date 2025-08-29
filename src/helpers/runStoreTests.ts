/* eslint-disable @typescript-eslint/no-explicit-any */

import { act, renderHook } from "@testing-library/react";
import type { StoreApi, UseBoundStore } from "zustand";

export type StoreCase<
  A extends Record<string, (...args: any[]) => any>,
  S extends { actions: A },
> = {
  [K in keyof A]: {
    action: K;
    args: Parameters<A[K]>;
    state: Partial<Omit<S, "actions">>;
    expected: Partial<Omit<S, "actions">>;
    description?: string;
  };
}[keyof A];

type ActionsOf<S> = S extends { actions: infer A }
  ? A extends Record<string, (...args: any[]) => any>
    ? A
    : never
  : never;

export type ActionArgsOf<S> = {
  [K in keyof ActionsOf<S>]: Parameters<ActionsOf<S>[K]>;
}[keyof ActionsOf<S>];

type ActionArgsOfFor<S, K extends keyof ActionsOf<S>> = Parameters<
  ActionsOf<S>[K]
>;

type MinimalCase<S> = {
  [K in keyof ActionsOf<S>]: {
    action: K;
    args?: ActionArgsOfFor<S, K>;
    state?: Partial<Omit<S, "actions">>;
    expected?: Partial<Omit<S, "actions">>;
    description?: string;
  };
}[keyof ActionsOf<S>];

export function runStoreTests<S extends { actions: ActionsOf<S> }>(
  useStore: UseBoundStore<StoreApi<S>>,
  testCases: ReadonlyArray<MinimalCase<S>>,
) {
  testCases.forEach((tc) => {
    it(`${String(tc.action)} - ${tc.description || "works"}`, () => {
      (useStore as any).persist?.clearStorage?.();

      act(() => {
        useStore.setState((tc.state ?? {}) as any, false);
      });

      const { result } = renderHook(() => useStore());

      if (tc.args !== undefined) {
        act(() => {
          (result.current.actions as any)[tc.action](
            ...((tc.args as unknown[]) ?? []),
          );
        });
      }

      expect(result.current).toEqual(
        expect.objectContaining((tc.expected ?? {}) as any),
      );
    });
  });
}
