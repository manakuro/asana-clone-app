import { Label, Portal } from '@/components/ui/atoms';
import { PopoverBody, PopoverContent } from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks';
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from '@/store/entities/projectTeammate';
import { useTeammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo, useCallback } from 'react';
import { Form } from './Form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTeammateId: string;
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
};

export const Content = memo(function Content(props: Props) {
  const { projectTeammateId, initialFocusRef, onClose } = props;
  const { projectTeammate, role } = useProjectTeammate(projectTeammateId);
  const { setProjectTeammateById } = useProjectTeammatesCommand();
  const { teammate } = useTeammate(projectTeammate.teammateId);

  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  const handleChangeRole = useCallback(
    async (value: string) => {
      await setProjectTeammateById({ role: value, id: projectTeammate.id });
      onClose();
    },
    [projectTeammate.id, setProjectTeammateById, onClose],
  );

  return (
    <Portal>
      <PopoverContent ref={ref}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Label fontSize="xs" fontWeight="medium" color="text.muted">
            What is {teammate.name}'s role on this project?
          </Label>
          <Form
            onChange={handleChangeRole}
            defaultValue={role}
            initialFocusRef={initialFocusRef}
          />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
});
