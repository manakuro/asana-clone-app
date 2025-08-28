import { useTasksTaskSection } from '@/components/features/organisms/Tasks/hooks';
import { Box } from '@/components/ui/atoms';
import { memo, useCallback, useMemo } from 'react';
import { useTasksBoardListSectionContext } from '../../Provider';
import { Input } from './Input';

type Props = {
  taskSectionId: string;
};

export const TaskSectionName = memo(function TaskSectionName(props: Props) {
  const { taskSection, setSectionName } = useTasksTaskSection(
    props.taskSectionId,
  );
  const { focused, onFocusInput, onUnfocusInput } =
    useTasksBoardListSectionContext();

  const showInput = useMemo(() => {
    if (taskSection.isNew) return true;
    return focused;
  }, [focused, taskSection.isNew]);

  const handleClick = useCallback(() => {
    onFocusInput();
  }, [onFocusInput]);

  const handleClickOutside = useCallback(() => {
    onUnfocusInput();
  }, [onUnfocusInput]);

  const handleChange = useCallback(
    async (val: string) => {
      await setSectionName(val);
    },
    [setSectionName],
  );

  if (showInput) {
    return (
      <Input
        onClickOutside={handleClickOutside}
        onChange={handleChange}
        value={taskSection.name}
      />
    );
  }

  return (
    <Box
      px={2}
      maxW={80}
      noOfLines={1}
      fontWeight="semibold"
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
    >
      {taskSection.name}
    </Box>
  );
});
