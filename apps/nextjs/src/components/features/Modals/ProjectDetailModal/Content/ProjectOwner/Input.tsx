import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { AssignProjectOwnerMenu } from '@/components/features/Menus';
import { Input as AtomsInput } from '@/components/ui/input';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { useProjectTeammatesCommand } from '@/store/entities/projectTeammate';
import type { Teammate } from '@/store/entities/teammate';

type Props = {
  projectId: string;
  onClose: () => void;
};

export const Input = memo(function Input(props: Props) {
  const { projectId, onClose } = props;
  const { ref } = useClickOutside<HTMLInputElement>(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const popoverDisclosure = useDisclosure({ defaultOpen: true });
  const [value, setValue] = useState<string>('');
  const { setOwnerByProjectIdAndTeammateId } = useProjectTeammatesCommand();

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
      await setOwnerByProjectIdAndTeammateId(projectId, val.id);
      setValue('');
      onClose();
    },
    [projectId, setOwnerByProjectIdAndTeammateId, onClose],
  );

  return (
    <AssignProjectOwnerMenu
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
        placeholder="Name or email"
        onChange={handleChange}
        ml={2}
      />
    </AssignProjectOwnerMenu>
  );
});
