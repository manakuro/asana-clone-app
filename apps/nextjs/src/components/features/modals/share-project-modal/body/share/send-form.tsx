import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { InvitedTeammateChip } from '@/components/features/chips/invited-teammate-chip';
import { InviteProjectTeammateMenu } from '@/components/features/menus/invite-project-teammate-menu';
import { Flex } from '@/components/ui/flex';
import { Input as AtomsInput } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useDisclosure } from '@/shared/chakra';
import type { Teammate } from '@/store/entities/teammate';
import { PermissionMenu } from '../permission-menu';

type Props = {
  projectId: string;
  invitedTeammates: Teammate[];
  onSetInvitedTeammates: (val: Teammate) => void;
  onDeleteInvitedTeammate: (teammateId: string) => void;
};

export const SendForm = memo(function SendForm(props: Props) {
  const { onSetInvitedTeammates, invitedTeammates, onDeleteInvitedTeammate } =
    props;
  const popoverDisclosure = useDisclosure();
  const [value, setValue] = useState<string>('');

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
      setValue('');
    },
    [onSetInvitedTeammates],
  );

  return (
    <>
      <InviteProjectTeammateMenu
        open={popoverDisclosure.open}
        onClose={popoverDisclosure.onClose}
        onSelect={handleSelect}
        positioning={{ placement: 'bottom-start' }}
        queryText={value}
      >
        <Flex
          border={1}
          borderColor="border"
          borderStyle="solid"
          px={2}
          bg="white"
          minH="40px"
          borderRadius="md"
        >
          <Wrap justifyItems="center" display="flex" alignItems="center" py={1}>
            {invitedTeammates.map((t) => (
              <WrapItem key={t.id}>
                <InvitedTeammateChip
                  variant="button"
                  teammate={t}
                  deletable
                  onDelete={onDeleteInvitedTeammate}
                />
              </WrapItem>
            ))}
            <WrapItem alignItems="center">
              <AtomsInput
                h="full"
                autoFocus
                fontSize="sm"
                unstyled
                value={value}
                onChange={handleChange}
              />
            </WrapItem>
          </Wrap>
          <Flex ml="auto" pt={1}>
            <PermissionMenu />
          </Flex>
        </Flex>
      </InviteProjectTeammateMenu>
      <Flex alignItems="center">
        <Textarea
          minH="120px"
          maxH="120px"
          placeholder="Add message (optional)"
          resize="none"
        />
      </Flex>
    </>
  );
});
