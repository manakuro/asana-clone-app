import type { PropsWithChildren } from 'react';
import { ConditionalRender } from '@/components/ui/ConditionalRender';
import { Flex } from '@/components/ui/Flex';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';
import { Content } from './Content';
import { Provider, usePopoverEmojiContext } from './Provider';

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
