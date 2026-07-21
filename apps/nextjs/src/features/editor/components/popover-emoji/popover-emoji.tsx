import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { ClientOnly } from '@/components/ui/client-only';
import { Flex } from '@/components/ui/flex';
import { Popover } from '@/components/ui/popover';
import { Context, usePopoverEmojiContext } from './context';

const LazyContent = dynamic(() =>
  import('./content').then((mod) => mod.Content),
);

export function PopoverEmoji(props: PropsWithChildren) {
  return (
    <Context>
      <Component {...props} />
    </Context>
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
        {open && <LazyContent />}
      </Popover.Root>
    </ClientOnly>
  );
}
