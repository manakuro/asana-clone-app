import { useMenuSelectContext } from '../useMenuSelect';
import { Component, type ComponentProps } from './Component';

type Props = ComponentProps;

export function MenuSelectList(props: Props) {
  const { isOpen } = useMenuSelectContext();
  if (!isOpen) return null;

  return <Component {...props} />;
}
