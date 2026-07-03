import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Flex } from '@/components/ui/flex';
import { Input as AtomsInput } from '@/components/ui/input';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useTaskDetail } from '@/features/task-detail';
import { AssigneeChip } from '@/features/task-detail/components/assignee-chip';
import { InviteCollaboratorMenu } from '@/features/teammates/components/invite-collaborator-menu';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDisclosure } from '@/lib/chakra';
import {
  useTaskCollaboratorCommand,
  useTeammateIdsByTaskId,
} from '@/store/entities/task-collaborator';
import type { Teammate } from '@/store/entities/teammate';
import { useCollaboratorsContext } from '../context';

export const Input: React.FC = () => {
  const { isInputFocused } = useCollaboratorsContext();

  if (!isInputFocused) return null;

  return <Component />;
};

const Component = memo(function Component() {
  const { taskId } = useTaskDetail();
  const { teammateIds } = useTeammateIdsByTaskId(taskId);
  const { addTaskCollaboratorByTeammate, deleteTaskCollaboratorByTeammate } =
    useTaskCollaboratorCommand();
  const { onInputUnfocus } = useCollaboratorsContext();
  const { ref } = useClickOutside<HTMLDivElement>(onInputUnfocus, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });

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
    async (input: Teammate) => {
      setValue('');
      await addTaskCollaboratorByTeammate({
        taskId,
        teammate: input,
      });
    },
    [addTaskCollaboratorByTeammate, taskId],
  );

  const handleDelete = useCallback(
    async (teammateId: string) => {
      await deleteTaskCollaboratorByTeammate({
        taskId,
        teammateId,
      });
    },
    [deleteTaskCollaboratorByTeammate, taskId],
  );

  return (
    <InviteCollaboratorMenu
      open={popoverDisclosure.open}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      positioning={{ placement: 'top-start' }}
      queryText={value}
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="border"
        borderStyle="solid"
        borderRadius="md"
        bg="white"
        ml={2}
        alignItems="center"
        px={4}
        h="auto"
        maxH="none"
        flex={1}
      >
        <Wrap py={teammateIds.length ? 2 : 0}>
          {teammateIds.map((id) => (
            <WrapItem key={id}>
              <AssigneeChip teammateId={id} key={id} onDelete={handleDelete} />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
              minH={9}
              autoFocus
              fontSize="sm"
              size="sm"
              placeholder="Name or email"
              value={value}
              onChange={handleChange}
              unstyled
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </InviteCollaboratorMenu>
  );
});
