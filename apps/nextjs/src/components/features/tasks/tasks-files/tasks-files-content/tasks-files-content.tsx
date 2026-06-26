import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMainStyle } from '@/hooks/styles/use-main-style';
import { transitions } from '@/styles/transitions';

type Props = FlexProps;

const maxH = 72;
export const TasksFilesContent = memo(function TasksFilesContent(props: Props) {
  const { maxW } = useMainStyle();

  return (
    <Flex
      flex={1}
      maxW={maxW}
      overflowY="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      p={8}
      pb={0}
      transition={transitions.base()}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  );
});
