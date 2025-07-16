import React, { useCallback } from 'react'
import {
  Button,
  Divider,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from 'src/components/ui/atoms'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from 'src/components/ui/organisms/Modal'
import { useDeleteTaskSectionModal } from './useDeleteTaskSectionModal'

export function DeleteTaskSectionModal() {
  const { isOpen } = useDeleteTaskSectionModal()

  if (!isOpen) return null

  return <Component />
}

export function Component() {
  const {
    isOpen,
    onClose,
    taskSection,
    onDeleteAndDeleteTask,
    onDeleteAndKeepTask,
    incompleteTaskSize,
    completedTaskSize,
    taskSize,
  } = useDeleteTaskSectionModal()
  const [value, setValue] = React.useState('1')

  const handleDelete = useCallback(async () => {
    if (value === '1') {
      await onDeleteAndKeepTask()
      return
    }

    await onDeleteAndDeleteTask()
  }, [onDeleteAndDeleteTask, onDeleteAndKeepTask, value])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this section?</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Stack spacing={6}>
            <Text>
              This section{' '}
              <Text as="span" fontWeight="bold">
                {taskSection.name}
              </Text>{' '}
              includes {completedTaskSize} completed tasks and{' '}
              {incompleteTaskSize} incomplete tasks.
            </Text>
            <Flex flexDirection="column">
              <RadioGroup onChange={setValue} value={value}>
                <Stack>
                  <Radio value="1">
                    Delete this section and keep this {taskSize} task
                  </Radio>
                  <Radio value="2">
                    Delete this section and delete this {taskSize} task
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Stack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button ml={2} colorScheme="red" onClick={handleDelete}>
            Delete section
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
