import { memo, type PropsWithChildren } from 'react';
import { Context as InputContext } from './input-context';
import { Context as ListItemContext } from './list-item-context';

type Props = PropsWithChildren<{
  taskId: string;
}>;

export const Context = memo(function Context(props: Props) {
  return (
    <ListItemContext {...props}>
      <InputContext {...props}>{props.children}</InputContext>
    </ListItemContext>
  );
});
