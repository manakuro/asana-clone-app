import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { AssigneeMenu } from '@/components/features/Menus';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Input as AtomsInput, InputGroup } from '@/components/ui/input';
import { useClickableHoverStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { type Teammate, useTeammate } from '@/store/entities/teammate';

type Props = {
  taskId: string;
  onClose: () => void;
};

export function Input(props: Props) {
  const { onClose, taskId } = props;
  const { task } = useTask(taskId);
  const { unassignTask, assignTask } = useTaskCommand();
  const hasAssigned = useMemo(() => !!task.assigneeId, [task.assigneeId]);
  const { teammate } = useTeammate(task.assigneeId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const popoverDisclosure = useDisclosure({ defaultOpen: true });
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
      open={popoverDisclosure.open}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      positioning={{ placement: 'bottom-start' }}
      queryText={value}
    >
      <Flex flex={1} alignItems="center">
        <InputGroup
          endElement={
            hasAssigned && (
              <Icon
                icon="x"
                color="fg.muted"
                size="sm"
                css={clickableHoverLightStyle}
                onClick={handleDelete}
              />
            )
          }
        >
          <AtomsInput
            autoFocus
            size="sm"
            placeholder="Name or email"
            onChange={handleChange}
            defaultValue={teammate.name}
          />
        </InputGroup>
      </Flex>
    </AssigneeMenu>
  );
}
