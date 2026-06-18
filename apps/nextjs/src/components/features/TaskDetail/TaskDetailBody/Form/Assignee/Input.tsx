import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { AssigneeMenu } from '@/components/features/Menus';
import { Input as AtomsInput } from '@/components/ui/input';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useTaskCommand } from '@/store/entities/task';
import type { Teammate } from '@/store/entities/teammate';

type Props = {
  taskId: string;
  onClose: () => void;
};

export const Input = memo(function Input(props: Props) {
  const { taskId, onClose } = props;
  const { assignTask } = useTaskCommand();
  const { ref } = useClickOutside<HTMLInputElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const popoverDisclosure = useDisclosure({ defaultOpen: true });
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
    async (val: Teammate) => {
      setValue('');
      onClose();
      await assignTask({ id: taskId, assigneeId: val.id });
    },
    [assignTask, onClose, taskId],
  );

  return (
    <AssigneeMenu
      open={popoverDisclosure.open}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      positioning={{ placement: 'bottom-start' }}
      queryText={value}
      contentStyle={{
        ml: '-45px',
      }}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        unstyled
        fontSize="sm"
        placeholder="mana"
        onChange={handleChange}
        ml={2}
        w={60}
      />
    </AssigneeMenu>
  );
});
