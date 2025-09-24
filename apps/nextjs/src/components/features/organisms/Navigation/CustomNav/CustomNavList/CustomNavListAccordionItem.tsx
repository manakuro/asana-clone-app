import { AccordionItem } from '@/components/ui/Accordion';
import type { PropsWithChildren } from 'react';

export function CustomNavListAccordionItem(props: PropsWithChildren) {
  return <AccordionItem border="none" {...props} />;
}
