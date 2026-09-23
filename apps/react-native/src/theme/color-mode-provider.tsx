import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import {
  getSnapshot,
  type Mode,
  setMode as setStoreMode,
  subscribe,
} from './store/color-mode-store';

export type { Mode };

export type ModeStorage = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
};

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  scheme: 'light' | 'dark';
};

const ModeContext = createContext<ModeContextValue | null>(null);

const isMode = (value: unknown): value is Mode =>
  value === 'light' || value === 'dark' || value === 'system';

type Props = {
  children: ReactNode;
  storage?: ModeStorage;
  storageKey?: string;
  defaultMode?: Mode;
};

export const ModeProvider = ({
  children,
  storage,
  storageKey = 'bna-ui.mode',
  defaultMode = 'system',
}: Props) => {
  useEffect(() => {
    setStoreMode(defaultMode);
  }, [defaultMode]);

  const { mode, scheme } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );

  useEffect(() => {
    if (!storage) return;
    let cancelled = false;

    Promise.resolve()
      .then(() => storage.getItem(storageKey))
      .then((saved) => {
        if (cancelled || !isMode(saved)) return;
        setStoreMode(saved);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [storage, storageKey]);

  const setMode = useCallback(
    (next: Mode) => {
      setStoreMode(next);
      if (storage) {
        Promise.resolve()
          .then(() => storage.setItem(storageKey, next))
          .catch(() => {});
      }
    },
    [storage, storageKey],
  );

  const value = useMemo<ModeContextValue>(
    () => ({ mode, setMode, scheme }),
    [mode, setMode, scheme],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export function useModeContext(): ModeContextValue | null {
  return useContext(ModeContext);
}
