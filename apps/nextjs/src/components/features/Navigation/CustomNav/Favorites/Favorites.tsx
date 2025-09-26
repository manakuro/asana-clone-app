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
import { Projects } from './Projects';
import { Workspace } from './Workspace';

export const Favorites = memo(function Favorites() {
  const { isExpanded } = useNavigation();
  const { disabledStyle } = useDisabledStyle();
  const title = useMemo(() => (isExpanded ? 'Favorites' : 'Fav'), [isExpanded]);
  const listItems = useMemo(
    () =>
      [
        {
          name: 'All Items',
          href: '/',
          icon: 'gridAlt',
        },
        {
          name: 'Deleted Items',
          href: '/',
          icon: 'trashAlt',
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
                <Projects />
                <Workspace />
                {listItems.map((listItem) => (
                  <NavListItem
                    item={listItem}
                    key={listItem.name}
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
