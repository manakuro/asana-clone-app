import { AssigneeMenu } from '@/components/features/organisms/Menus';
import {
  Input as AtomsInput,
  Flex,
  Icon,
  InputGroup,
  InputRightElement,
} from '@/components/ui/atoms';
import type { PopoverProps } from '@/components/ui/organisms/Popover';
import { useClickableHoverStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { type Teammate, useTeammate } from '@/store/entities/teammate';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  taskId: string;
  onClose: () => void;
} & PopoverProps;

export function Input(props: Props) {
  const { onClose, taskId } = props;
  const { task } = useTask(taskId);
  const { unassignTask, assignTask } = useTaskCommand();
  const hasAssigned = useMemo(() => !!task.assigneeId, [task.assigneeId]);
  const { teammate } = useTeammate(task.assigneeId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const popoverDisclosure = useDisclosure({ defaultIsOpen: true });
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

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
    async (val: Teammate) => {
      setValue('');
      console.log('val: ', val);
      await assignTask({ id: taskId, assigneeId: val.id });
      onClose();
    },
    [assignTask, onClose, taskId],
  );

  const handleDelete = useCallback(async () => {
    onClose();
    await unassignTask({ id: taskId });
  }, [onClose, taskId, unassignTask]);

  return (
    <AssigneeMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="bottom-start"
      queryText={value}
    >
      <Flex flex={1} alignItems="center">
        <InputGroup>
          <AtomsInput
            autoFocus
            size="sm"
            placeholder="Name or email"
            onChange={handleChange}
            defaultValue={teammate.name}
          />
          {hasAssigned && (
            <InputRightElement h="full">
              <Icon
                icon="x"
                color="text.muted"
                size="sm"
                {...clickableHoverLightStyle}
                onClick={handleDelete}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
    </AssigneeMenu>
  );
}
