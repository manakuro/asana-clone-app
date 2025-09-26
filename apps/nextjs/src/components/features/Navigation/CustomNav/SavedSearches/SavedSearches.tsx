import { useNavigation } from '@/components/features/Navigation';
import { NavListItem } from '@/components/features/Navigation/NavListItem';
import { AccordionIcon } from '@/components/ui/Accordion';
import { useDisabledStyle } from '@/hooks';
import { memo, useMemo } from 'react';
import { Divider } from '../../Divider';
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
      <Divider />
      <CustomNavList>
        <CustomNavListAccordion>
          <CustomNavListAccordionItem>
            <CustomNavListAccordionButton>
              <CustomNavListHeader>{title}</CustomNavListHeader>
              <AccordionIcon />
            </CustomNavListAccordionButton>
            <CustomNavListAccordionPanel>
              <CustomNavListAccordionPanelList>
                {listItems.map((listItem) => (
                  <NavListItem
                    item={listItem}
                    key={listItem.href}
                    {...disabledStyle}
                  />
                ))}
              </CustomNavListAccordionPanelList>
            </CustomNavListAccordionPanel>
          </CustomNavListAccordionItem>
        </CustomNavListAccordion>
      </CustomNavList>
    </>
  );
});
