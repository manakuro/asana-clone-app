import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { ConditionalRender } from '@/components/ui/atoms/ConditionalRender';
import { Flex } from '@/components/ui/atoms/Flex';
import { PortalManager } from '@/components/ui/atoms/PortalManager';
import type { PropsWithChildren } from 'react';
import { Content } from './Content';
import { usePopoverEmojiContext } from './Provider';
import { Provider } from './Provider';

export function PopoverEmoji(props: PropsWithChildren) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}

function Component(props: PropsWithChildren) {
  const { isOpen } = usePopoverEmojiContext();

  return (
    <ConditionalRender client>
      <PortalManager zIndex={1500}>
        <Popover isOpen={isOpen} placement="top-end" closeOnBlur={false}>
          <PopoverTrigger>
            {/*TODO: To fix an issue of duplicated trigger wrapper generated*/}
            <Flex>{props.children}</Flex>
          </PopoverTrigger>
          {isOpen && <Content />}
        </Popover>
      </PortalManager>
    </ConditionalRender>
  );
}
