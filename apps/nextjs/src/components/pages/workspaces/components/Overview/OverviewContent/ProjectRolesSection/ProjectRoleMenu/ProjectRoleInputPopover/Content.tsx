import type { RefObject } from 'react';
import { memo, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Popover } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { useClickOutside } from '@/hooks';
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from '@/store/entities/projectTeammate';
import { useTeammate } from '@/store/entities/teammate';
import { Form } from './Form';

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectTeammateId: string;
  initialFocusRef: RefObject<HTMLInputElement | null>;
};

export const Content = memo<Props>(function Content(props) {
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
      <Popover.Positioner>
        <Popover.Content ref={ref}>
          <Popover.Body boxShadow="md" borderRadius="md">
            <Label fontSize="xs" fontWeight="medium" color="fg.muted">
              What is {teammate.name}'s role on this project?
            </Label>
            <Form
              onChange={handleChangeRole}
              defaultValue={role}
              initialFocusRef={initialFocusRef}
            />
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
});
