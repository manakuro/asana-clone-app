import { Flex } from '@/components/ui/flex';
import { Grid } from '@/components/ui/grid';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProjectTeammateIdsByProjectIdSortedByOwner } from '@/store/entities/project-teammate';
import { OverviewContentHeading } from '../overview-content-heading';
import { ProjectRoleAddMember } from './project-role-add-member';
import { ProjectRoleListItem } from './project-role-list-item';

export function ProjectRolesSection() {
  const { projectId } = useProjectsProjectId();
  const { projectTeammateIds } =
    useProjectTeammateIdsByProjectIdSortedByOwner(projectId);

  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Project Roles</OverviewContentHeading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(181px, 1fr))"
        gap={2}
        mt={4}
      >
        <ProjectRoleAddMember projectId={projectId} />
        {projectTeammateIds.map((id) => (
          <ProjectRoleListItem
            projectTeammateId={id}
            key={id}
            projectId={projectId}
          />
        ))}
      </Grid>
    </Flex>
  );
}
