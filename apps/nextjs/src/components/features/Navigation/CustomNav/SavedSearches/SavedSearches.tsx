import { memo, useMemo } from 'react';
import { useNavigation } from '@/components/features/Navigation';
import { NavListItem } from '@/components/features/Navigation/NavListItem';
import { Accordion } from '@/components/ui/accordion';
import { List } from '@/components/ui/list';
import { useDisabledStyle } from '@/hooks';
import { Separator } from '../../Separator';
import {
  CustomNavList,
  CustomNavListAccordion,
  CustomNavListAccordionButton,
  CustomNavListAccordionItem,
  CustomNavListAccordionPanel,
  CustomNavListAccordionPanelList,
  CustomNavListHeader,
} from '../CustomNavList';

export const SavedSearches = memo(function SavedSearches() {
  const { isExpanded } = useNavigation();
  const { disabledStyle } = useDisabledStyle();
  const title = useMemo(
    () => (isExpanded ? 'Saved searches' : 'Sav'),
    [isExpanded],
  );
  const listItems = useMemo(
    () =>
      [
        {
          name: "Tasks I've changed",
          href: '/',
          icon: 'idCard',
        },
      ] as const,
    [],
  );

  return (
    <>
      <Separator />
      <CustomNavList>
        <CustomNavListAccordion>
          <CustomNavListAccordionItem value="0">
            <CustomNavListAccordionButton>
              <CustomNavListHeader>{title}</CustomNavListHeader>
              <Accordion.ItemIndicator />
            </CustomNavListAccordionButton>
            <CustomNavListAccordionPanel>
              <CustomNavListAccordionPanelList>
                <List.Root>
                  {listItems.map((listItem) => (
                    <NavListItem
                      item={listItem}
                      key={listItem.href}
                      linkProps={{
                        css: disabledStyle,
                      }}
                    />
                  ))}
                </List.Root>
              </CustomNavListAccordionPanelList>
            </CustomNavListAccordionPanel>
          </CustomNavListAccordionItem>
        </CustomNavListAccordion>
      </CustomNavList>
    </>
  );
});
