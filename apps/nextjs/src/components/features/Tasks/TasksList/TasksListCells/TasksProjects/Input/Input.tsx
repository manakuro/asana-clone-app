import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { ProjectChip } from '@/components/features/Chips';
import { ProjectMenu } from '@/components/features/Menus';
import { Flex } from '@/components/ui/flex';
import { Input as AtomsInput } from '@/components/ui/input';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useClickOutside } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import {
  useGetProjectTask,
  useProjectTaskCommand,
  useProjectTaskIdsByTaskId,
} from '@/store/entities/projectTask';

type Props = {
  taskId: string;
  focused: boolean;
  onClose: () => void;
};

const HEIGHT = '37px';
export const Input = memo(function Input(props: Props) {
  const { taskId, onClose } = props;
  const popoverDisclosure = useDisclosure();
  const { projectTaskIds } = useProjectTaskIdsByTaskId(props.taskId);
  const { getProjectTask } = useGetProjectTask();
  const { addProjectTaskByTaskId, deleteProjectTask } = useProjectTaskCommand();
  const { ref } = useClickOutside<HTMLDivElement>(onClose, {
    hasClickedOutside: (e, helper) => {
      if (helper.isContainInPopoverContent(e)) return false;
      return true;
    },
  });
  const [value, setValue] = useState<string>('');

  const handleDelete = useCallback(
    async (projectTaskId: string) => {
      await deleteProjectTask({ id: projectTaskId });
    },
    [deleteProjectTask],
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
    async (projectId: string) => {
      console.log(projectId);
      onClose();
      await addProjectTaskByTaskId({ projectId, taskId });
    },
    [addProjectTaskByTaskId, onClose, taskId],
  );

  return (
    <ProjectMenu
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
        position="absolute"
        left="0"
        top="0"
        bg="white"
        borderRadius="none"
        w="300px"
      >
        <Wrap minH={HEIGHT} py={2} justifyItems="center" display="flex">
          {projectTaskIds.map((id) => {
            const projectTask = getProjectTask(id);

            return (
              <WrapItem key={id}>
                <ProjectChip
                  variant="button"
                  projectId={projectTask.projectId}
                  deletable
                  onDelete={() => handleDelete(projectTask.id)}
                />
              </WrapItem>
            );
          })}
          <WrapItem>
            <AtomsInput
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
    </ProjectMenu>
  );
});
