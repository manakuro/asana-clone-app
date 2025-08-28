import { useInboxListItemContext } from '@/components/features/organisms/Inbox/InboxListItem/Provider';
import {
  Flex,
  type FlexProps,
  Icon,
  Text,
  type TextProps,
} from '@/components/ui/atoms';
import { useWorkspace } from '@/store/entities/workspace';
import { transitions } from '@/styles';
import { memo, useMemo } from 'react';

type Props = FlexProps & {
  workspaceId: string;
};

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
        <Icon icon="group" size="xs" color="text.muted" />
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
