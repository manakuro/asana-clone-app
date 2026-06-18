import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useProjectTeammateIdsByProjectIdSortedByCreatedAt } from '@/store/entities/projectTeammate';
import { JoinedTeammate } from './JoinedTeammate';

type Props = {
  projectId: string;
};

export const JoinedTeammates = memo(function JoinedTeammates(props: Props) {
  const { projectId } = props;
  const { projectTeammateIds } =
    useProjectTeammateIdsByProjectIdSortedByCreatedAt(projectId);

  return (
    <Flex flexDirection="column">
      {projectTeammateIds.map((id) => (
        <JoinedTeammate projectTeammateId={id} key={id} projectId={projectId} />
      ))}
    </Flex>
  );
});
