import type { PropsWithChildren } from 'react';
import { Accordion } from '@/components/ui/Accordion';

export function CustomNavListAccordion(props: PropsWithChildren) {
  return <Accordion allowToggle {...props} />;
}
