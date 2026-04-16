import { CloseButton } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Flex } from '@/components/ui/Flex';
import { Portal } from '@/components/ui/Portal';
import { RadioGroup } from '@/components/ui/Radio';
import { Separator } from '@/components/ui/Separator';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { useDeleteTaskSectionModal } from './useDeleteTaskSectionModal';

export function DeleteTaskSectionModal() {
  const { open } = useDeleteTaskSectionModal();

  if (!open) return null;

  return <Component />;
}

export function Component() {
  const {
    open,
    onClose,
    taskSection,
    onDeleteAndDeleteTask,
    onDeleteAndKeepTask,
    incompleteTaskSize,
    completedTaskSize,
    taskSize,
  } = useDeleteTaskSectionModal();
  const [value, setValue] = React.useState('1');

  const handleDelete = useCallback(async () => {
    if (value === '1') {
      await onDeleteAndKeepTask();
      return;
    }

    await onDeleteAndDeleteTask();
  }, [onDeleteAndDeleteTask, onDeleteAndKeepTask, value]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              Are you sure you want to delete this section?
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={6}>
                <Text>
                  This section{' '}
                  <Text as="span" fontWeight="bold">
                    {taskSection.name}
                  </Text>{' '}
                  includes {completedTaskSize} completed tasks and{' '}
                  {incompleteTaskSize} incomplete tasks.
                </Text>
                <Flex flexDirection="column">
                  <RadioGroup.Root
                    onValueChange={(e) => setValue(e.value as string)}
                    value={value}
                  >
                    <Stack>
                      <RadioGroup.Item value="1">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>
                          Delete this section and keep this {taskSize} task
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="2">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>
                          Delete this section and delete this {taskSize} task
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Stack>
                  </RadioGroup.Root>
                </Flex>
              </Stack>
            </Dialog.Body>
            <Separator />
            <Dialog.Footer>
              <Button onClick={onClose}>Cancel</Button>
              <Button ml={2} colorScheme="red" onClick={handleDelete}>
                Delete section
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
