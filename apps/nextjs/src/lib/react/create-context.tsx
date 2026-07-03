'use client';

import type { PropsWithChildren } from 'react';
import {
  createContext as createContextRN,
  memo,
  useContext as useContextRN,
} from 'react';

/**
 * Creates a provider component for a given context.
 *
 * @param {function} useValue - A function that takes props and returns the context value.
 *
 * @param contextName - A context name that is used when thrown the error.
 * @return An object containing the context component, and a hook to consume the context.
 */
export function createContext<
  ContextProps extends object,
  Props extends object,
>(useValue: (props: Props) => ContextProps, contextName: string) {
  const RNContext = createContextRN<ContextProps>({} as ContextProps);
  const useContext = () => {
    const context = useContextRN(RNContext);
    if (!Object.keys(context).length) {
      throw new Error(`Context needs to be consumed in ${contextName}.`);
    }

    return context;
  };

  const Component = memo<PropsWithChildren<Props & ContextProps>>(
    function Component({ children, ...rest }) {
      return <RNContext value={rest as ContextProps}>{children}</RNContext>;
    },
  );

  const Context = memo<PropsWithChildren<Props>>(function Context(props) {
    return <Component {...props} {...useValue(props)} />;
  });

  return {
    Context,
    useContext,
  };
}
