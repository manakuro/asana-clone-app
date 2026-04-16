import { useMenuSelectContext } from '../useMenuSelect';
import { Component, type ComponentProps } from './Component';

type Props = ComponentProps;

export function MenuSelectList(props: Props) {
  const { open } = useMenuSelectContext();
  if (!open) return null;

  return <Component {...props} />;
}
