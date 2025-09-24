import { useShareProjectModal } from '@/components/features/organisms/Modals';
import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { Flex, Text } from '@/components/ui/atoms';
import { useCallback } from 'react';
import { Button } from './Button';

type Props = {
  projectId: string;
};

export function ProjectRoleAddMember(props: Props) {
  const { projectId } = props;
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    setShareTab();
    onOpen();
  }, [setProjectId, projectId, setShareTab, onOpen]);

  return (
    <Flex flexDirection="column" cursor="pointer">
      <Button onClick={handleClick}>
        <TeammateAvatar teammateId="" size="sm" />
        <Flex
          flex={1}
          ml={2}
          flexDirection="column"
          justifyContent="center"
          minW="1px"
        >
          <Text fontSize="sm" fontWeight="medium" color="text.muted">
            Add member
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}
