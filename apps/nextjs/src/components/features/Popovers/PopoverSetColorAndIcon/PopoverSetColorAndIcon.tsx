import type { PropsWithChildren } from 'react';
import { Link } from '@/components/ui/Link';
import { Popover, type PopoverRootProps } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { Separator } from '@/components/ui/Separator';
import type { Project } from '@/store/entities/project';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { Setting } from './Setting';

type Props = {
  project: Project;
} & PopoverRootProps;

const COLOR_BOX_WIDTH = 20;
const COLOR_BOX_PADDING = 4;
const COLOR_BOX_PER_COLUMN = 8;
const WIDTH = `${
  COLOR_BOX_WIDTH * COLOR_BOX_PER_COLUMN +
  COLOR_BOX_PADDING * COLOR_BOX_PER_COLUMN -
  1 +
  24 * 2
}px`;
export function PopoverSetColorAndIcon(props: PropsWithChildren<Props>) {
  return (
    <Popover.Root
      open={props.open}
      lazyMount
      positioning={props.positioning}
      closeOnInteractOutside={false}
    >
      <Popover.Trigger>
        <Link>{props.children}</Link>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w={WIDTH} ml="5px" pointerEvents="auto">
            <Popover.Body p={0}>
              <ColorPicker
                currentProjectBaseColorId={props.project.projectBaseColorId}
                projectId={props.project.id}
              />
              <Separator />
              <IconPicker
                projectId={props.project.id}
                currentProjectIconId={props.project.projectIconId}
                currentProjectLightColorId={props.project.projectLightColorId}
                currentProjectBaseColorId={props.project.projectBaseColorId}
              />
              <Separator />
              <Setting isSetForEveryone />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
