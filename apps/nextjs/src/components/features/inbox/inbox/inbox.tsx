import { forwardRef, memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Context, type InboxContextProps } from './context';

type Props = FlexProps & InboxContextProps;

export const Inbox = memo<Props>(function Inbox(props) {
  const { isActivity, isArchive, ...rest } = props;
  return (
    <Context isActivity={isActivity} isArchive={isArchive}>
      <Component {...rest} />
    </Context>
  );
});

const Component = forwardRef<HTMLDivElement, Props>(
  function Component(props, ref) {
    return <Flex flex={1} h="full" {...props} ref={ref} />;
  },
);
