import { Flex, Text } from '@/components/ui/atoms';
import { useLinkStyle } from '@/hooks';
import { useTeammateIdsByProjectId } from '@/store/entities/projectTeammate';
import { memo, useMemo } from 'react';
import { BodyHeader } from '../BodyHeader';
import { BodyStack } from '../BodyStack';
import { MemberListItem } from './MemberListItem';
import { MembersAndCollaboratorsListItem } from './MembersAndCollaboratorsListItem';

type Props = {
  projectId: string;
  loading: boolean;
  onSetShareTab: () => void;
};

export const Members = memo(function Members(props: Props) {
  const { projectId, onSetShareTab } = props;
  const { teammateIds } = useTeammateIdsByProjectId(projectId);
  const headerText = useMemo(
    () => `${teammateIds.length} members`,
    [teammateIds.length],
  );
  const { style } = useLinkStyle();

  return (
    <BodyStack flex={1}>
      <Flex flex={1} px={6}>
        <BodyHeader>{headerText}</BodyHeader>
        <Text
          ml="auto"
          mt={1}
          {...style}
          fontWeight="medium"
          fontSize="xs"
          onClick={onSetShareTab}
        >
          Share project
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <MembersAndCollaboratorsListItem projectId={projectId} />
        {teammateIds.map((id) => (
          <MemberListItem teammateId={id} key={id} projectId={projectId} />
        ))}
      </Flex>
    </BodyStack>
  );
});
