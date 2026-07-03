import { useMenuSelectContext } from '../use-menu-select';
import { Component, type ComponentProps } from './component';

type Props = ComponentProps;

export function MenuSelectList(props: Props) {
  const { open } = useMenuSelectContext();
  if (!open) return null;

  return <Component {...props} />;
}
