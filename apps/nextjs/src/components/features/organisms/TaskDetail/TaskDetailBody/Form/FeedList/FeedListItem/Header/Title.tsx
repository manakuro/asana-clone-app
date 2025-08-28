import { Flex, Icon, Text, type TextProps } from '@/components/ui/atoms';
import type { TaskFeed } from '@/store/entities/taskFeed';
import type { Teammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../Provider';

type Props = TextProps;

const generateTitle = (
  {
    teammate,
    taskFeed,
  }: {
    teammate: Teammate;
    taskFeed: TaskFeed;
  },
  { hasTaskFile }: { hasTaskFile: boolean },
): React.ReactElement => {
  switch (true) {
    case taskFeed.isFirst:
      return <Text>{`${teammate.name} created this task.`}</Text>;
    case Boolean(hasTaskFile): {
      return (
        <Flex flex={1} alignItems="center">
          <Icon icon="attach" color="text.muted" />
          <Text ml={1}>attached</Text>
        </Flex>
      );
    }
    default:
      return <Text>{teammate.name}</Text>;
  }
};

export const Title = memo(function Title(props: Props) {
  const { teammate, taskFeed, hasTaskFile } = useTaskFeedListItemContext();
  const title = generateTitle({ teammate, taskFeed }, { hasTaskFile });

  return (
    <Flex fontSize="sm" fontWeight="medium" ml={2} {...props}>
      {title}
    </Flex>
  );
});
