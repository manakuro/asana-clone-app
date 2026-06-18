import { memo, useMemo } from 'react';
import { useInboxListItemContext } from '@/components/features/Inbox/InboxListItem/Provider';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text, type TextProps } from '@/components/ui/text';
import { useWorkspace } from '@/store/entities/workspace';
import { transitions } from '@/styles/transitions';

export const Workspace = memo(function Workspace() {
  const { workspace } = useWorkspace();
  const { isHovering } = useInboxListItemContext();
  const textStyle = useMemo(
    (): TextProps => ({
      ...(isHovering ? { opacity: 1 } : { opacity: 0.6 }),
    }),
    [isHovering],
  );

  return (
    <Flex flex={1}>
      <Flex alignItems="center" ml="2px">
        <Icon icon="group" size="xs" color="fg.muted" />
        <Text
          fontSize="xs"
          ml={1}
          transition={transitions.base()}
          {...textStyle}
        >
          {workspace.name}
        </Text>
      </Flex>
    </Flex>
  );
});
