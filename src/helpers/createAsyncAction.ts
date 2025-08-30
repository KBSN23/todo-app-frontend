export type Mutate<State> = (recipe: (state: State) => void) => void;

export type AsyncAction<State, A extends unknown[] = []> = (
  ...args: A
) => (set: Mutate<State>) => Promise<void>;

type Hooks<State, A extends unknown[]> = {
  onStart?: (set: Mutate<State>, args: A) => void;
  onError?: (set: Mutate<State>, error: unknown, args: A) => void;
  onFinally?: (set: Mutate<State>, args: A) => void;
};

export function createAsyncAction<State, A extends unknown[] = []>(
  impl: (ctx: { args: A; set: Mutate<State> }) => Promise<void>,
  hooks?: Hooks<State, A>,
): AsyncAction<State, A> {
  return (...args: A) =>
    async (set: Mutate<State>) => {
      hooks?.onStart?.(set, args);
      try {
        await impl({ args, set });
      } catch (err) {
        hooks?.onError?.(set, err, args);
        throw err;
      } finally {
        hooks?.onFinally?.(set, args);
      }
    };
}

export function withPhase<State, A extends unknown[] = []>(phases: {
  start?: (state: State, args: A) => void;
  error?: (state: State, err: unknown, args: A) => void;
  finally?: (state: State, args: A) => void;
}) {
  return (action: AsyncAction<State, A>): AsyncAction<State, A> =>
    (...args: A) =>
    async (set: Mutate<State>) => {
      if (phases.start) set((s) => phases.start!(s, args));
      try {
        await action(...args)(set);
      } catch (err) {
        if (phases.error) set((s) => phases.error!(s, err, args));
        throw err;
      } finally {
        if (phases.finally) set((s) => phases.finally!(s, args));
      }
    };
}
