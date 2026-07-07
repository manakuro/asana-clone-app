import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useWorkspaceActivityTaskIds } from '@/features/inbox/hooks';
import { useCreatedByIdsByTaskIds } from '@/features/task/store/task';
import { useTeammateNamesByTeammateIds } from '@/features/teammate/store/teammate';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const InfoText = memo(function InfoText(props: Props) {
  const { workspaceActivityId } = props;
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId);
  const { createdByIds } = useCreatedByIdsByTaskIds(taskIds);
  const { teammateNames } = useTeammateNamesByTeammateIds(createdByIds);
  const text = useMemo(() => {
    const names =
      teammateNames.length > 2
        ? [...teammateNames.slice(0, 2), 'others']
        : teammateNames;

    return `${names.join(' and ')} added new tasks`;
  }, [teammateNames]);

  return (
    <Flex flex={1} mt={2} fontSize="xs" fontWeight="medium">
      {text}
    </Flex>
  );
});
