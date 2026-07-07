import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Input as AtomsInput } from '@/components/ui/input';
import { AssignTaskMenu } from '@/features/task/components/assign-task-menu';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDisclosure } from '@/lib/chakra-ui';
import type { Teammate } from '@/store/entities/teammate';

type Props = {
  onSelect: (val: Teammate) => void;
  onClose: () => void;
};

export const Input = memo(function Input(props: Props) {
  const { onSelect, onClose } = props;
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
      onSelect(val);
      setValue('');
      onClose();
    },
    [onSelect, onClose],
  );

  return (
    <AssignTaskMenu
      open={popoverDisclosure.open}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      positioning={{ placement: 'bottom-start' }}
      queryText={value}
      contentStyle={{
        ml: '-16px',
      }}
    >
      <AtomsInput
        ref={ref}
        autoFocus
        unstyled
        fontSize="xs"
        placeholder="Name or email"
        onChange={handleChange}
        ml={2}
      />
    </AssignTaskMenu>
  );
});
