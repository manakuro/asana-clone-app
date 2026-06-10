import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import shortid from 'shortid';
import { uniqBy } from '@/shared/utils';

type Portal = {
  Component: FC;
  container: HTMLElement;
  key: string;
};

const ReactNodeViewPortalsContext = createContext<Portal[]>([]);

export type PortalHandlers = {
  createPortal: (portal: { Component: FC; container: HTMLElement }) => void;
  removePortal: (container: HTMLElement) => void;
  setPortals: (portals: Portal[]) => void;
};

const ReactNodeViewCreatePortalContext = createContext<PortalHandlers>({
  createPortal: () => {},
  removePortal: () => {},
  setPortals: () => {},
});

type PortalsProviderProps = PropsWithChildren;

export function ReactNodeViewPortalsProvider({
  children,
}: PortalsProviderProps) {
  const [portals, setPortals] = useState<Portal[]>([]);
  const portalsRef = useRef(portals);
  portalsRef.current = portals;

  const createPortal = useCallback(
    ({ container, Component }: { Component: FC; container: HTMLElement }) => {
      setPortals((prev) => {
        const existing = prev.find((p) => p.container === container);

        if (existing?.Component === Component) return prev;

        const newVal: Portal = {
          container,
          Component,
          key: existing?.key ?? shortid(),
        };
        const next = uniqBy([...prev, newVal], 'container').map((p) =>
          p.container === newVal.container ? { ...p, ...newVal } : p,
        );
        portalsRef.current = next;
        return next;
      });
    },
    [],
  );

  const removePortal = useCallback((container: HTMLElement) => {
    setPortals((prev) => prev.filter((p) => p.container !== container));
  }, []);

  const handlers = useMemo(
    () => ({ createPortal, removePortal, setPortals }),
    [createPortal, removePortal],
  );

  return (
    <ReactNodeViewPortalsContext.Provider value={portals}>
      <ReactNodeViewCreatePortalContext.Provider value={handlers}>
        {children}
      </ReactNodeViewCreatePortalContext.Provider>
    </ReactNodeViewPortalsContext.Provider>
  );
}

export const useReactNodeViewPortals = () =>
  useContext(ReactNodeViewPortalsContext);
export const useReactNodeViewCreatePortal = () =>
  useContext(ReactNodeViewCreatePortalContext);
