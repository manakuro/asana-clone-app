import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
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
};
const ReactNodeViewCreatePortalContext = createContext<PortalHandlers>({
  createPortal: () => {},
  removePortal: () => {},
});

export function ReactNodeViewPortalsProvider(props: PropsWithChildren) {
  const [portals, setPortals] = useState<Portal[]>([]);

  const findPortal = useCallback(
    (container: HTMLElement) => portals.find((p) => p.container === container),
    [portals],
  );

  const createPortal = useCallback(
    ({ container, Component }: { Component: FC; container: HTMLElement }) => {
      const newVal: Portal = {
        container,
        Component,
        key: findPortal(container)?.key ?? shortid(),
      };
      setPortals((prev) => {
        return uniqBy([...prev, newVal], 'container').map((p) => {
          if (p.container === newVal.container) {
            return {
              ...p,
              ...newVal,
            };
          }
          return p;
        });
      });
    },
    [findPortal],
  );

  const removePortal = useCallback((container: HTMLElement) => {
    setPortals((prev) => {
      return prev.filter((p) => p.container !== container);
    });
  }, []);

  return (
    <ReactNodeViewPortalsContext.Provider value={portals}>
      <ReactNodeViewCreatePortalContext.Provider
        value={{
          createPortal,
          removePortal,
        }}
      >
        {props.children}
      </ReactNodeViewCreatePortalContext.Provider>
    </ReactNodeViewPortalsContext.Provider>
  );
}

export const useReactNodeViewPortals = () =>
  useContext(ReactNodeViewPortalsContext);
export const useReactNodeViewCreatePortal = () =>
  useContext(ReactNodeViewCreatePortalContext);
