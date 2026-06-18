import type { ComponentProps } from 'react';
import { chakra } from '@/shared/chakra';

type Props = ComponentProps<typeof chakra.label>;
export type LabelProps = Props;

export function Label(props: Props) {
  // biome-ignore lint/a11y/noLabelWithoutControl: label is associated with a form control
  return <chakra.label display="flex" fontSize="sm" w="full" {...props} />;
}
