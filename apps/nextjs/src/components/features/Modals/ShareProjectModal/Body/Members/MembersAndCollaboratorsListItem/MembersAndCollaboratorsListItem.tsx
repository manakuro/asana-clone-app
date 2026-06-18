import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import { useWorkspace } from '@/store/entities/workspace';
import { PermissionMenu } from '../../PermissionMenu';

type Props = {
  projectId: string;
};

export const MembersAndCollaboratorsListItem = memo(
  function MembersAndCollaboratorsListItem(_props: Props) {
    const { clickableHoverStyle } = useClickableHoverStyle();
    const { workspace } = useWorkspace();

    return (
      <Flex
        alignItems="center"
        h="50px"
        px={6}
        css={clickableHoverStyle}
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
