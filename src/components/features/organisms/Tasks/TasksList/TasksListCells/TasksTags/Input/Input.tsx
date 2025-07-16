import type React from 'react'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { TagChip } from 'src/components/features/molecules/Chips'
import { TagMenu } from 'src/components/features/organisms/Menus'
import {
  Input as AtomsInput,
  Flex,
  Wrap,
  WrapItem,
} from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import type { Tag } from 'src/store/entities/tag'
import {
  useTaskTagCommand,
  useTaskTagIdsByTaskId,
} from 'src/store/entities/taskTag'

type Props = {
  taskId: string
  focused: boolean
  onClose: () => void
}

const HEIGHT = '37px'
export const Input: React.FC<Props> = memo((props) => {
  const { taskId, onClose } = props
  const popoverDisclosure = useDisclosure()
  const { taskTagIds } = useTaskTagIdsByTaskId(taskId)
  const { addTaskTag, deleteTaskTag } = useTaskTagCommand()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helper) => {
      if (helper.isContainInPopoverContent(e)) return false
      return true
    },
  })
  const [value, setValue] = useState<string>('')
  const hasMultipleTags = useMemo<boolean>(
    () => taskTagIds.length > 1,
    [taskTagIds.length],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      if (val) {
        popoverDisclosure.onOpen()
        return
      }
      popoverDisclosure.onClose()
    },
    [popoverDisclosure],
  )

  const handleSelect = useCallback(
    async (tag: Tag) => {
      onClose()
      await addTaskTag({ taskId, tag })
    },
    [addTaskTag, onClose, taskId],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteTaskTag({ id })

      if (!inputRef.current) return
      inputRef.current?.focus()
    },
    [deleteTaskTag],
  )

  return (
    <TagMenu
      isOpen={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      placement="top-start"
      queryText={value}
    >
      <Flex
        ref={ref}
        border={1}
        borderColor="teal.400"
        borderStyle="solid"
        alignItems="center"
        px={2}
        minH={HEIGHT}
        maxH={hasMultipleTags ? 'auto' : HEIGHT}
        position="absolute"
        right="0"
        top="0"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap minH={HEIGHT} py={2} justifyItems="center" display="flex">
          {taskTagIds.map((id) => (
            <WrapItem key={id}>
              <TagChip
                taskTagId={id}
                deletable
                variant="button"
                onDelete={handleDelete}
              />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
              ref={inputRef}
              autoFocus
              fontSize="sm"
              size="sm"
              variant="unstyled"
              color="text.base"
              value={value}
              onChange={handleChange}
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </TagMenu>
  )
})
Input.displayName = 'Input'
