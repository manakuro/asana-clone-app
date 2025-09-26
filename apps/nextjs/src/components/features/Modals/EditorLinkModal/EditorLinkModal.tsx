import { Input } from '@/components/ui/Input';
import { Modal, ModalBody, ModalContent } from '@/components/ui/Modal';
import { Stack } from '@/components/ui/Stack';
import type React from 'react';
import { useCallback } from 'react';
import { useEditorLinkModal } from './useEditorLinkModal';

const MARGIN = 30;
export function EditorLinkModal() {
  const { isOpen, x, y, onClose, setInput, input } = useEditorLinkModal();

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof input) => {
      setInput({
        ...input,
        [type]: e.target.value,
      });
    },
    [input, setInput],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalContent position="fixed" top={x + MARGIN} left={y} mb={0} mt={0}>
        <ModalBody>
          <Stack spacing={2}>
            <Input
              value={input.url}
              onChange={(e) => handleInput(e, 'url')}
              focusBorderColor="none"
              placeholder="Add URL"
              size="sm"
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
