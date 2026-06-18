import type React from 'react';
import { memo, useCallback } from 'react';
import { useFileViewerModal } from '@/components/features/Modals';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Link } from '@/components/ui/link';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/Text';
import { useHover } from '@/hooks/useHover';
import { FileTypeCode } from '@/store/entities/fileType';
import { useTask } from '@/store/entities/task';
import {
  getTaskFileIcon,
  useTaskFile,
  useTaskFileIdsByTaskId,
} from '@/store/entities/taskFile';
import { transitions } from '@/styles/transitions';

type Props = {
  taskFileId: string;
} & FlexProps;

export const TasksFilesListItem = memo(function TasksFilesListItem(
  props: Props,
) {
  const { taskFileId, ...rest } = props;
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const { taskFile } = useTaskFile(taskFileId);
  const { task } = useTask(taskFile.taskId);
  const { taskFileIds } = useTaskFileIdsByTaskId(taskFile.taskId);
  const { onOpen, setState } = useFileViewerModal();
  const icon = getTaskFileIcon(taskFile.fileType.typeCode);
  const { navigateToTaskDetail } = useTasksRouter();

  const handleOpenTaskDetail = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      navigateToTaskDetail(task.id);
    },
    [navigateToTaskDetail, task.id],
  );

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskFileIds,
      currentTaskFileId: taskFileId,
    });
    onOpen();
  }, [taskFileId, taskFileIds, onOpen, setState]);

  return (
    <Flex
      ref={ref}
      border="1px"
      borderRadius="md"
      borderColor={isHovering ? 'gray.focusRing' : 'gray.muted'}
      borderStyle="solid"
      transition={transitions.base()}
      flexDirection="column"
      cursor="pointer"
      w="420px"
      maxW="420px"
      maxH="275px"
      bg="white"
      onClick={handleOpenFileViewer}
      {...rest}
    >
      <Flex p={4} alignItems="center">
        <Icon icon={icon} color="fg.muted" size="2xl" />
        <Flex ml={4} flexDirection="column" flex={1} minW={0}>
          <Text fontSize="sm" lineClamp={1}>
            {taskFile.name}
          </Text>
          <Flex>
            <Link
              fontSize="xs"
              color="fg.muted"
              hover
              onClick={handleOpenTaskDetail}
            >
              {task.name}
            </Link>
          </Flex>
        </Flex>
      </Flex>
      {taskFile.fileType.typeCode === FileTypeCode.Image && (
        <>
          <Separator />
          <Image
            width="auto"
            maxW="100%"
            src={taskFile.src}
            borderBottomRadius="md"
            objectFit="cover"
            overflow="hidden"
          />
        </>
      )}
    </Flex>
  );
});
