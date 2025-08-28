import { ProjectChip } from '@/components/features/molecules/Chips';
import { ProjectMenu } from '@/components/features/organisms/Menus';
import {
  Input as AtomsInput,
  Flex,
  Wrap,
  WrapItem,
} from '@/components/ui/atoms';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import {
  useProjectIdsByTaskId,
  useProjectTaskCommand,
} from '@/store/entities/projectTask';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

type Props = {
  taskId: string;
  focused: boolean;
  onClose: () => void;
};

const HEIGHT = '37px';
export const Input = memo(function Input(props: Props) {
  const { taskId, onClose } = props;
  const popoverDisclosure = useDisclosure();
  const { projectIds } = useProjectIdsByTaskId(taskId);
  const { addProjectTaskByTaskId, deleteProjectTaskByTaskId } =
    useProjectTaskCommand();
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helper) => {
      if (helper.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const [value, setValue] = useState<string>('');

  const handleDelete = useCallback(async () => {
    await deleteProjectTaskByTaskId({ taskId });
  }, [deleteProjectTaskByTaskId, taskId]);

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
    async (projectId: string) => {
      console.log(projectId);
      onClose();
      await addProjectTaskByTaskId({ projectId, taskId });
    },
    [addProjectTaskByTaskId, onClose, taskId],
  );

  return (
    <ProjectMenu
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
        position="absolute"
        left="0"
        top="0"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap minH={HEIGHT} py={2} justifyItems="center" display="flex">
          {projectIds.map((id) => (
            <WrapItem key={id}>
              <ProjectChip
                variant="button"
                projectId={id}
                deletable
                onDelete={handleDelete}
              />
            </WrapItem>
          ))}
          <WrapItem>
            <AtomsInput
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
    </ProjectMenu>
  );
});
