import type { PropsWithChildren } from 'react';
import { Accordion } from '@/components/ui/accordion';

export function CustomNavListAccordionPanel(props: PropsWithChildren) {
  return (
    <Accordion.ItemContent>
      <Accordion.ItemBody p={0}>{props.children}</Accordion.ItemBody>
    </Accordion.ItemContent>
  );
}
