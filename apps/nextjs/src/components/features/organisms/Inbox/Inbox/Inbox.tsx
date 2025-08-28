import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';
import { memo } from 'react';
import { type InboxProviderProps, Provider } from './Provider';

type Props = FlexProps & InboxProviderProps;

export const Inbox = memo<Props>(function Inbox(props) {
  const { isActivity, isArchive, ...rest } = props;
  return (
    <Provider isActivity={isActivity} isArchive={isArchive}>
      <Component {...rest} />
    </Provider>
  );
});

const Component = forwardRef<HTMLDivElement, Props>(
  function Component(props, ref) {
    return <Flex flex={1} h="full" {...props} ref={ref} />;
  },
);
