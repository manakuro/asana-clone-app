import { InvitedTeammateChip } from '@/components/features/molecules/Chips';
import { InviteProjectTeammateMenu } from '@/components/features/organisms/Menus';
import {
  Input as AtomsInput,
  Flex,
  Textarea,
  Wrap,
  WrapItem,
} from '@/components/ui/atoms';
import { useDisclosure } from '@/shared/chakra';
import type { Teammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { PermissionMenu } from '../PermissionMenu';

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
        isOpen={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
        onSelect={handleSelect}
        placement="bottom-start"
        queryText={value}
      >
        <Flex
          border={1}
          borderColor="gray.300"
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
                variant="unstyled"
                color="text.base"
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
