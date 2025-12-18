import type { PropsWithChildren } from 'react';
import { AccordionItem } from '@/components/ui/Accordion';

export function CustomNavListAccordionItem(props: PropsWithChildren) {
  return <AccordionItem border="none" {...props} />;
}
