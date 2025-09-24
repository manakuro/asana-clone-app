import { type PropsWithChildren, memo } from 'react';
import { Provider as InputProvider } from './InputProvider';
import { Provider as ListItemProvider } from './ListItemProvider';

type Props = PropsWithChildren<{
  taskId: string;
}>;

export const Provider = memo(function Provider(props: Props) {
  return (
    <ListItemProvider {...props}>
      <InputProvider {...props}>{props.children}</InputProvider>
    </ListItemProvider>
  );
});
