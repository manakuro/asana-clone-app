import { forwardRef, memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useProject } from '@/features/project/store/project';
import {
  useProjectBaseColor,
  useProjectBaseColorText,
} from '@/features/project/store/project-base-color';
import { useTask } from '@/features/task/store/task';
import { transitions } from '@/utils/transitions';

type Props = {
  taskId: string;
  projectId: string;
} & FlexProps;

export const Container = memo(
  forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { taskId, projectId, ...rest } = props;
    const { project } = useProject(projectId);
    const { projectBaseColor } = useProjectBaseColor(
      project.projectBaseColorId,
    );
    const { textColor } = useProjectBaseColorText(project.projectBaseColorId);
    const { task } = useTask(taskId);

    const colorStyle = useMemo((): FlexProps => {
      if (!project.id)
        return {
          bg: 'white',
          color: 'fg',
          borderColor: 'gray.300',
          _hover: { borderColor: 'cyan.400', boxShadow: 'md' },
        };

      return {
        color: textColor,
        bg: projectBaseColor.color.color,
        _hover: { boxShadow: 'md' },
      };
    }, [project.id, projectBaseColor.color.color, textColor]);

    const style = useMemo(
      () => ({
        ...(task.completed ? { opacity: 0.6 } : {}),
      }),
      [task.completed],
    );

    return (
      <Flex
        ref={ref}
        alignItems="center"
        flex={1}
        h={9}
        maxH={9}
        p={1}
        maxW="full"
        cursor="pointer"
        borderRadius="sm"
        border="1px"
        borderColor="transparent"
        transition={transitions.base()}
        boxShadow="sm"
        overflow="hidden"
        {...style}
        {...colorStyle}
        {...rest}
      />
    );
  }),
);
