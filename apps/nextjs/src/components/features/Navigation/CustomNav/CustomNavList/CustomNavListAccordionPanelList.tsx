import type { PropsWithChildren } from 'react';
import { List } from '@/components/ui/List';

export function CustomNavListAccordionPanelList(props: PropsWithChildren) {
  return <List mb={2} {...props} />;
}
