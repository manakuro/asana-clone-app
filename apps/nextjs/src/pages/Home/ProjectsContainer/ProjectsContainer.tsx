import {
  PROJECT_LIST_MENU_VIEW_AS_TILES,
  ProjectListItem,
  ProjectListItemNew,
  ProjectListMenu,
  type ProjectListStatus,
  ProjectTileItem,
  ProjectTileItemNew,
} from '@/components/features/organisms/Projects';
import {
  Box,
  Flex,
  type FlexProps,
  Grid,
  Heading,
  Icon,
} from '@/components/ui/atoms';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@/components/ui/organisms/Accordion';
import { memo, useState } from 'react';

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
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <Flex
              py={1}
              px={PADDING_X}
              borderBottom="1px"
              borderColor="gray.200"
            >
              <AccordionButton p={0} _hover={{ bg: 'none' }} w="auto">
                {isExpanded ? (
                  <Icon icon="chevronDown" mt="1px" />
                ) : (
                  <Icon icon="chevronRight" mt="1px" />
                )}
                <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                  {props.title}
                </Heading>
              </AccordionButton>
              <Flex ml="auto">
                <ProjectListMenu
                  listStatus={listStatus}
                  onChange={setListStatus}
                />
              </Flex>
            </Flex>
            <AccordionPanel p={0}>
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
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
});
