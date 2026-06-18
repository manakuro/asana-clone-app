import type { PropsWithChildren } from 'react';
import { HoverCard, type HoverCardRootProps } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { Separator } from '@/components/ui/separator';
import type { Project } from '@/store/entities/project';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { Setting } from './Setting';

type Props = {
  project: Project;
} & HoverCardRootProps;

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
    <HoverCard.Root
      lazyMount
      positioning={props.positioning}
      openDelay={200}
      closeDelay={50}
    >
      <HoverCard.Trigger asChild>{props.children}</HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content w={WIDTH} ml="5px" pointerEvents="auto" p={0}>
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
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
}
