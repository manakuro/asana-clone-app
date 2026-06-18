import type React from 'react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { useEditorLinkModal } from './useEditorLinkModal';

const MARGIN = 30;
export function EditorLinkModal() {
  const { open, x, y, onClose, setInput, input } = useEditorLinkModal();

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
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e) onClose();
      }}
      size="xs"
      closeOnInteractOutside={false}
    >
      <Dialog.Positioner>
        <Dialog.Content
          position="fixed"
          top={x + MARGIN}
          left={y}
          mb={0}
          mt={0}
        >
          <Dialog.Body p={2}>
            <Stack gap={2} direction="row" alignItems="center">
              <Input
                value={input.url}
                onChange={(e) => handleInput(e, 'url')}
                placeholder="Add URL"
                size="sm"
              />
              <Button variant="outline" onClick={onClose} size="sm">
                Save
              </Button>
            </Stack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
