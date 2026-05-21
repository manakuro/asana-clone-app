import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { AssigneeChip } from '@/components/features/Chips';
import { InviteCollaboratorMenu } from '@/components/features/Menus';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { Flex } from '@/components/ui/Flex';
import { Input as AtomsInput } from '@/components/ui/Input';
import { Wrap, WrapItem } from '@/components/ui/Wrap';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import {
  useTaskCollaboratorCommand,
  useTeammateIdsByTaskId,
} from '@/store/entities/taskCollaborator';
import type { Teammate } from '@/store/entities/teammate';
import { useCollaboratorsContext } from '../Provider';

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
