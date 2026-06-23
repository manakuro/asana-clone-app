import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useInboxListContentRef } from './use-inbox-list-content-ref';
import { useInboxListContentVerticalScroll } from './use-inbox-list-content-vertical-scroll';

type Props = FlexProps;

const maxH = 72 + 57;
export const InboxListContent = memo(function InboxListContent(props: Props) {
  const { ref } = useInboxListContentRef<HTMLDivElement>();

  useInboxListContentVerticalScroll({ listenOnEvent: true });

  return (
    <Flex
      maxH={`calc(100vh - ${maxH}px)`}
      h="full"
      overflowY="scroll"
      flexDirection="column"
      {...props}
      ref={ref}
    />
  );
});
