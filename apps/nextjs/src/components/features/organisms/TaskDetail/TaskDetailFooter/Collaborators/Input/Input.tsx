import { AssigneeChip } from '@/components/features/molecules/Chips';
import { InviteCollaboratorMenu } from '@/components/features/organisms/Menus';
import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import {
  Input as AtomsInput,
  Flex,
  Wrap,
  WrapItem,
} from '@/components/ui/atoms';
import { useClickOutside } from '@/hooks';
import {
  type ChakraProps,
  useDisclosure,
  useStyleConfig,
} from '@/shared/chakra';
import {
  useTaskCollaboratorCommand,
  useTeammateIdsByTaskId,
} from '@/store/entities/taskCollaborator';
import type { Teammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { useCollaboratorsContext } from '../Provider';

export const Input: React.FC = () => {
  const { isInputFocused } = useCollaboratorsContext();

  if (!isInputFocused) return null;

  return <Component />;
};

type InputStyle = {
  field: ChakraProps;
  addon: ChakraProps;
};

const Component: React.FC = memo(() => {
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
  const style = useStyleConfig('Input') as InputStyle;

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
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="top-start"
      queryText={value}
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="gray.200"
        borderStyle="solid"
        bg="white"
        ml={2}
        alignItems="center"
        {...style.field}
        h="auto"
        maxH="none"
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
              variant="unstyled"
              value={value}
              onChange={handleChange}
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </InviteCollaboratorMenu>
  );
});
