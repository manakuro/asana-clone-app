import type { ColorScheme } from '@react-native-themed/core';
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
  type ColorMode,
  getSnapshot,
  isColorMode,
  setColorMode as setStoreMode,
  subscribe,
} from './store/color-mode-store';

export type { ColorMode };

export type ColorModeStorage = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
};

type ColorModeContextValue = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  scheme: ColorScheme;
};

const ModeContext = createContext<ColorModeContextValue | null>(null);

type Props = {
  children: ReactNode;
  storage?: ColorModeStorage;
  storageKey?: string;
  defaultColorMode?: ColorMode;
};

export const ColorModeProvider = ({
  children,
  storage,
  storageKey = 'bna-ui.mode',
  defaultColorMode = 'system',
}: Props) => {
  useEffect(() => {
    setStoreMode(defaultColorMode);
  }, [defaultColorMode]);

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
        if (cancelled || !isColorMode(saved)) return;
        setStoreMode(saved);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [storage, storageKey]);

  const setColorMode = useCallback(
    (next: ColorMode) => {
      setStoreMode(next);
      if (storage) {
        Promise.resolve()
          .then(() => storage.setItem(storageKey, next))
          .catch(() => {});
      }
    },
    [storage, storageKey],
  );

  const value = useMemo<ColorModeContextValue>(
    () => ({ mode, setMode: setColorMode, scheme }),
    [mode, setColorMode, scheme],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export function useColorModeContext(): ColorModeContextValue | null {
  return useContext(ModeContext);
}
