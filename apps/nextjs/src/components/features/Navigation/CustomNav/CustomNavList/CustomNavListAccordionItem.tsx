import { Accordion, type AccordionItemProps } from '@/components/ui/accordion';

export function CustomNavListAccordionItem(props: AccordionItemProps) {
  return <Accordion.Item border="none" {...props} />;
}
