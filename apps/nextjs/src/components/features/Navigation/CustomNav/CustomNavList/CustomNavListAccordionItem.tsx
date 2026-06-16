import { Accordion, type AccordionItemProps } from '@/components/ui/Accordion';

export function CustomNavListAccordionItem(props: AccordionItemProps) {
  return <Accordion.Item border="none" {...props} />;
}
