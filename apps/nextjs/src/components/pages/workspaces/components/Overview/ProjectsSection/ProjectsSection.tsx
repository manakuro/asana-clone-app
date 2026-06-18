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
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Grid } from '@/components/ui/grid';
import { useProjectIds } from '@/store/entities/project';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
  OverviewSectionHeaderRight,
} from '../OverviewSectionHeader';

export const ProjectsSection = memo(function ProjectsSection() {
  const { projectIds } = useProjectIds();
  const [listStatus, setListStatus] = useState<ProjectListStatus>(
    PROJECT_LIST_MENU_VIEW_AS_TILES,
  );

  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Projects</OverviewSectionHeaderHeading>
        <OverviewSectionHeaderRight>
          <ProjectListMenu listStatus={listStatus} onChange={setListStatus} />
        </OverviewSectionHeaderRight>
      </OverviewSectionHeader>
      <Flex flexDirection="column">
        {listStatus === PROJECT_LIST_MENU_VIEW_AS_TILES ? (
          <Box py={4}>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <ProjectTileItemNew containerStyle={{ width: 'auto' }} />
              {projectIds.map((id) => (
                <ProjectTileItem
                  key={id}
                  projectId={id}
                  containerStyle={{ width: 'auto' }}
                />
              ))}
            </Grid>
          </Box>
        ) : (
          <>
            <ProjectListItemNew />
            {projectIds.map((id) => (
              <ProjectListItem projectId={id} key={id} />
            ))}
          </>
        )}
      </Flex>
    </Flex>
  );
});
