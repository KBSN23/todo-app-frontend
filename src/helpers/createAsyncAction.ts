export type Mutate<State> = (recipe: (state: State) => void) => void;

export type AsyncAction<State, A> = (
  args: A,
) => (set: Mutate<State>) => Promise<void>;

type Hooks<State, A> = {
  onStart?: (set: Mutate<State>, args: A) => void;
  onError?: (set: Mutate<State>, error: unknown, args: A) => void;
  onFinally?: (set: Mutate<State>, args: A) => void;
};

export function createAsyncAction<State, A>(
  impl: (ctx: { args: A; set: Mutate<State> }) => Promise<void>,
  hooks?: Hooks<State, A>,
): AsyncAction<State, A> {
  return (args: A) => async (set: Mutate<State>) => {
    hooks?.onStart?.(set, args);
    try {
      await impl({ args, set });
    } catch (err) {
      hooks?.onError?.(set, err, args);
    } finally {
      hooks?.onFinally?.(set, args);
    }
  };
}
