import type { FC, PropsWithChildren } from 'react';
import {
  createContext,
  forwardRef,
  memo,
  useContext as useContextReact,
} from 'react';

/**
 * Creates a provider component for a given context.
 *
 * @param {function} useValue - A function that takes props and returns the context value.
 *
 * @param providerName - A provider name that is used when thrown the error.
 * @return An object containing the provider component, the context object, and a hook to consume the context.
 */
export function createProvider<
  ContextProps extends object,
  Props extends object,
>(useValue: (props: Props) => ContextProps, providerName: string) {
  const Context = createContext<ContextProps>({} as ContextProps);
  const useContext = () => {
    const context = useContextReact(Context);
    if (!Object.keys(context).length) {
      throw new Error(`Context needs to be consumed in ${providerName}.`);
    }

    return context;
  };

  const Provider = memo<PropsWithChildren<Props>>(
    forwardRef(function Provider(props, ref) {
      return (
        <Component
          {...(props as Props)}
          ref={ref}
          {...useValue(props as Props)}
        />
      );
    }) as unknown as FC<PropsWithChildren<Props>>,
  );

  const Component = memo<Props & ContextProps>(
    forwardRef<
      FC<Props & ContextProps>,
      PropsWithChildren<Props & ContextProps>
    >(function Component({ children, ...rest }, ref) {
      return (
        <Context.Provider value={{ ...(rest as unknown as ContextProps), ref }}>
          {children}
        </Context.Provider>
      );
    }) as unknown as FC<Props & ContextProps>,
  );

  return {
    Provider,
    Context,
    useContext,
  };
}
