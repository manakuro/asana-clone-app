import { Flex } from '@/components/ui/atoms';
import { useProjectTeammateIdsByProjectIdSortedByCreatedAt } from '@/store/entities/projectTeammate';
import { memo } from 'react';
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
