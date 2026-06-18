import type { PropsWithChildren } from 'react';
import { Accordion } from '@/components/ui/accordion';

export function CustomNavListAccordion(props: PropsWithChildren) {
  return <Accordion.Root collapsible {...props} />;
}
