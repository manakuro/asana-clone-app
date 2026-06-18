import {
  Bold,
  BulletList,
  DecreaseListIndent,
  IncreaseListIndent,
  Italic,
  Link,
  OrderedList,
  Strikethrough,
  Underline,
} from '@/components/ui/editor/tool-bar';
import { Popover } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { Stack } from '@/components/ui/stack';
import { useClickOutside } from '@/hooks';

type Props = {
  onClose?: () => void;
};

export function Content(props: Props) {
  const { ref } = useClickOutside<HTMLDivElement>(props.onClose);

  return (
    <Portal>
      <Popover.Positioner>
        <Popover.Content w="100%" ref={ref}>
          <Popover.Arrow />
          <Popover.Body px={1} py={1}>
            <Stack gap={1} direction="row" alignItems="center">
              <Bold size="xs" tooltip={{ disabled: true }} />
              <Italic size="xs" tooltip={{ disabled: true }} />
              <Underline size="xs" tooltip={{ disabled: true }} />
              <Strikethrough size="xs" tooltip={{ disabled: true }} />
              <BulletList size="xs" tooltip={{ disabled: true }} />
              <OrderedList size="xs" tooltip={{ disabled: true }} />
              <IncreaseListIndent size="xs" tooltip={{ disabled: true }} />
              <DecreaseListIndent size="xs" tooltip={{ disabled: true }} />
              <Link size="xs" tooltip={{ disabled: true }} />
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
}
