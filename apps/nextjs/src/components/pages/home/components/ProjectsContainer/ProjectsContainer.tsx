import { memo, useState } from 'react';
import {
  PROJECT_LIST_MENU_VIEW_AS_TILES,
  ProjectListItem,
  ProjectListItemNew,
  ProjectListMenu,
  type ProjectListStatus,
  ProjectTileItem,
  ProjectTileItemNew,
} from '@/components/features/Projects';
import { Accordion } from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Grid } from '@/components/ui/grid';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';

type Props = {
  projectIds: string[];
  showNewOrder: boolean;
  title: string;
  projectTileItemProps?: FlexProps;
  projectListItemProps?: FlexProps;
};

export const PADDING_X = 2;
export const ProjectsContainer = memo(function ProjectsContainer(props: Props) {
  const [listStatus, setListStatus] = useState<ProjectListStatus>(
    PROJECT_LIST_MENU_VIEW_AS_TILES,
  );

  return (
    <Accordion.Root collapsible defaultValue={['0']}>
      <Accordion.Item border="none" value="0">
        <Accordion.ItemContext>
          {({ expanded }) => (
            <>
              <Flex
                py={1}
                px={PADDING_X}
                borderBottom="1px"
                borderColor="border"
                borderStyle="solid"
              >
                <Accordion.ItemTrigger p={0} _hover={{ bg: 'none' }} w="auto">
                  {expanded ? (
                    <Icon icon="chevronDown" mt="1px" />
                  ) : (
                    <Icon icon="chevronRight" mt="1px" />
                  )}
                  <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                    {props.title}
                  </Heading>
                </Accordion.ItemTrigger>
                <Flex ml="auto">
                  <ProjectListMenu
                    listStatus={listStatus}
                    onChange={setListStatus}
                  />
                </Flex>
              </Flex>
              <Accordion.ItemContent>
                <Accordion.ItemBody p={0}>
                  {listStatus === PROJECT_LIST_MENU_VIEW_AS_TILES ? (
                    <Box py={4}>
                      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                        {props.projectIds.map((id) => (
                          <ProjectTileItem
                            projectId={id}
                            key={id}
                            containerStyle={props.projectTileItemProps}
                          />
                        ))}
                        {props.showNewOrder && <ProjectTileItemNew />}
                      </Grid>
                    </Box>
                  ) : (
                    <>
                      {props.projectIds.map((id) => (
                        <ProjectListItem
                          projectId={id}
                          key={id}
                          containerStyle={props.projectListItemProps}
                        />
                      ))}
                      {props.showNewOrder && <ProjectListItemNew />}
                    </>
                  )}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </>
          )}
        </Accordion.ItemContext>
      </Accordion.Item>
    </Accordion.Root>
  );
});
