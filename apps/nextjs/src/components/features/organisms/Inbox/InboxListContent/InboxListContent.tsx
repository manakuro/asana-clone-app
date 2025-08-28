import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useInboxListContentRef } from './useInboxListContentRef';
import { useInboxListContentVerticalScroll } from './useInboxListContentVerticalScroll';

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
