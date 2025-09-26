import { Accordion } from '@/components/ui/Accordion';
import type { PropsWithChildren } from 'react';

export function CustomNavListAccordion(props: PropsWithChildren) {
  return <Accordion allowToggle {...props} />;
}
