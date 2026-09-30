export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Structural subset of `expo-secure-store` / `AsyncStorage`, so either can be
 * passed as-is without an adapter.
 */
export type ColorModeStorage = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
};

export const isColorMode = (value: unknown): value is ColorMode =>
  value === 'light' || value === 'dark' || value === 'system';

/**
 * External store holding the uncontrolled color mode. One is created per
 * `createThemed()` call (never at module level) so independent instances
 * don't share state.
 */
export function createColorModeStore() {
  let mode: ColorMode | null = null;
  // Set once the user picks a mode, so a late rehydration can't override it.
  let userSet = false;
  let hydrationStarted = false;
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  return {
    /**
     * Seeds the mode on first use only. Called during render so the very
     * first render already sees `defaultMode`; later calls (e.g. a changed
     * `defaultColorMode` prop) are ignored rather than overwriting the
     * current mode.
     */
    init(defaultMode: ColorMode) {
      if (mode === null) mode = defaultMode;
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot(): ColorMode {
      return mode ?? 'system';
    },
    setMode(next: ColorMode) {
      userSet = true;
      if (next === mode) return;
      mode = next;
      emit();
    },
    /** Returns `false` if rehydration already ran for this store. */
    beginHydration(): boolean {
      if (hydrationStarted) return false;
      hydrationStarted = true;
      return true;
    },
    /** Applies a stored value unless it's malformed or the user already chose. */
    hydrate(saved: unknown) {
      if (userSet || !isColorMode(saved) || saved === mode) return;
      mode = saved;
      emit();
    },
  };
}

export type ColorModeStore = ReturnType<typeof createColorModeStore>;
