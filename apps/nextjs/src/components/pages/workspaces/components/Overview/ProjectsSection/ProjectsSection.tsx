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
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { Grid } from '@/components/ui/Grid';
import { Link } from '@/components/ui/Link';
import { NextLink } from '@/components/ui/NextLink';
import { ROUTE_PROJECTS_LIST } from '@/router';
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
                <Link key={id} asChild>
                  <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(id)}>
                    <ProjectTileItem
                      projectId={id}
                      containerStyle={{ width: 'auto' }}
                    />
                  </NextLink>
                </Link>
              ))}
            </Grid>
          </Box>
        ) : (
          <>
            <ProjectListItemNew />
            {projectIds.map((id) => (
              <Link key={id}>
                <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(id)}>
                  <ProjectListItem projectId={id} />
                </NextLink>
              </Link>
            ))}
          </>
        )}
      </Flex>
    </Flex>
  );
});
