import { InviteProjectTeammateMenu } from '@/components/features/organisms/Menus';
import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { AvatarGroup, Flex, Input, Text } from '@/components/ui/atoms';
import { useLinkStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useTeammateIdsByProjectId } from '@/store/entities/projectTeammate';
import { type Teammate, useTeammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

type Props = {
  projectId: string;
  onSetMembersTab: () => void;
  onSetInvitedTeammates: (val: Teammate) => void;
};

export const InviteForm = memo(function InviteForm(props: Props) {
  const { projectId, onSetMembersTab, onSetInvitedTeammates } = props;
  const popoverDisclosure = useDisclosure();
  const [value, setValue] = useState<string>('');
  const { teammateIds } = useTeammateIdsByProjectId(projectId);
  const { teammate: firstTeammate } = useTeammate(teammateIds[0]);
  const teammateText = useMemo(() => {
    const teammatesNames =
      teammateIds.length > 2
        ? [firstTeammate.name, `${teammateIds.length} others`]
        : [firstTeammate.name];

    return teammatesNames.join(' and ');
  }, [firstTeammate.name, teammateIds.length]);
  const { style } = useLinkStyle();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val) {
        popoverDisclosure.onOpen();
        return;
      }
      popoverDisclosure.onClose();
    },
    [popoverDisclosure],
  );

  const handleSelect = useCallback(
    (val: Teammate) => {
      console.log(val);
      onSetInvitedTeammates(val);
    },
    [onSetInvitedTeammates],
  );

  return (
    <>
      <InviteProjectTeammateMenu
        isOpen={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
        onSelect={handleSelect}
        placement="bottom-start"
        queryText={value}
      >
        <Flex>
          <Input
            autoFocus
            placeholder="Add project members by name or email..."
            fontSize="sm"
            color="text.base"
            value={value}
            onChange={handleChange}
          />
        </Flex>
      </InviteProjectTeammateMenu>
      <Flex alignItems="center">
        <AvatarGroup size="xs" max={3} spacing={1} fontSize="xs">
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} />
          ))}
        </AvatarGroup>
        <Text ml={2} mt={1} fontWeight="medium" fontSize="xs">
          {teammateText}
        </Text>

        <Text
          ml="auto"
          mt={1}
          {...style}
          fontWeight="medium"
          fontSize="xs"
          onClick={onSetMembersTab}
        >
          View all members
        </Text>
      </Flex>
    </>
  );
});
