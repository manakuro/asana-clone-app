import type React from 'react';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Flex } from '@/components/ui/flex';
import { Input as AtomsInput } from '@/components/ui/input';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { TagChip } from '@/features/task/components/tag-chip';
import { TagMenu } from '@/features/task/components/tag-menu';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDisclosure } from '@/lib/chakra-ui';
import type { Tag } from '@/store/entities/tag';
import {
  useTaskTagCommand,
  useTaskTagIdsByTaskId,
} from '@/store/entities/task-tag';

type Props = {
  taskId: string;
  focused: boolean;
  onClose: () => void;
};

const HEIGHT = '37px';
export const Input = memo(function Input(props: Props) {
  const { taskId, onClose } = props;
  const popoverDisclosure = useDisclosure();
  const { taskTagIds } = useTaskTagIdsByTaskId(taskId);
  const { addTaskTag, deleteTaskTag } = useTaskTagCommand();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helper) => {
      if (helper.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const [value, setValue] = useState<string>('');
  const hasMultipleTags = useMemo<boolean>(
    () => taskTagIds.length > 1,
    [taskTagIds.length],
  );

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
    async (tag: Tag) => {
      onClose();
      await addTaskTag({ taskId, tag });
    },
    [addTaskTag, onClose, taskId],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteTaskTag({ id });

      if (!inputRef.current) return;
      inputRef.current?.focus();
    },
    [deleteTaskTag],
  );

  return (
    <TagMenu
      open={popoverDisclosure.open}
      onClose={popoverDisclosure.onClose}
      onSelect={handleSelect}
      positioning={{ placement: 'top-start' }}
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
              unstyled
              color="fg"
              value={value}
              onChange={handleChange}
            />
          </WrapItem>
        </Wrap>
      </Flex>
    </TagMenu>
  );
});
