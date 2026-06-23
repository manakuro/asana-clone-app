import { memo, type PropsWithChildren } from 'react';
import { Provider as InputProvider } from './input-provider';
import { Provider as ListItemProvider } from './list-item-provider';

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
