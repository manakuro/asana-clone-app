import type { PropsWithChildren } from 'react';
import { ClientOnly } from '@/components/ui/client-only';
import { Flex } from '@/components/ui/flex';
import { Popover } from '@/components/ui/popover';
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
  const { open } = usePopoverEmojiContext();

  return (
    <ClientOnly>
      <Popover.Root
        open={open}
        positioning={{ placement: 'top-end' }}
        closeOnInteractOutside={false}
      >
        <Popover.Trigger asChild>
          <Flex>{props.children}</Flex>
        </Popover.Trigger>
        {open && <Content />}
      </Popover.Root>
    </ClientOnly>
  );
}
