import type { PropsWithChildren } from 'react';
import { AccordionPanel } from '@/components/ui/Accordion';

export function CustomNavListAccordionPanel(props: PropsWithChildren) {
  return <AccordionPanel p={0} {...props} />;
}
