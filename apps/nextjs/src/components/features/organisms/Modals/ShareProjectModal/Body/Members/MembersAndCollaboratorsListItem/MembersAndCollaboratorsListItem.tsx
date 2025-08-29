import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { Flex, Text } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useWorkspace } from '@/store/entities/workspace';
import { memo } from 'react';
import { PermissionMenu } from '../../PermissionMenu';

type Props = {
  projectId: string;
};

export const MembersAndCollaboratorsListItem = memo(
  function MembersAndCollaboratorsListItem(props: Props) {
    const { clickableHoverStyle } = useClickableHoverStyle();
    const { workspace } = useWorkspace();

    return (
      <Flex
        alignItems="center"
        h="50px"
        px={6}
        {...clickableHoverStyle}
        cursor="default"
      >
        <TeammateAvatar teammateId="" size="sm" />
        <Flex flexDirection="column" ml={2} flex={1}>
          <Text fontWeight="medium" fontSize="xs">
            {`Members of ${workspace.name} and task collaborators`}
          </Text>
        </Flex>
        <Flex>
          <PermissionMenu />
        </Flex>
      </Flex>
    );
  },
);
