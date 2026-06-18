import type React from 'react';
import {
  Accordion,
  type AccordionItemTriggerProps,
} from '@/components/ui/accordion';
import { PADDING_X } from '../../Navigation';

type Props = AccordionItemTriggerProps;

export const CustomNavListAccordionButton: React.FCWithChildren<Props> = (
  props,
) => {
  return <Accordion.ItemTrigger px={PADDING_X} py={4} {...props} />;
};
