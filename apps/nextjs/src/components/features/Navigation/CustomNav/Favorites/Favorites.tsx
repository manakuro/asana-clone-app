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
                <Projects />
                <Workspace />
                <List.Root>
                  {listItems.map((listItem) => (
                    <NavListItem
                      item={listItem}
                      key={listItem.name}
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
