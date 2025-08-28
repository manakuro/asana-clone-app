import { Divider, Link } from '@/components/ui/atoms';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  type PopoverProps,
  PopoverTrigger,
} from '@/components/ui/organisms/Popover';
import type { Project } from '@/store/entities/project';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { Setting } from './Setting';

type Props = {
  project: Project;
} & PopoverProps;

const COLOR_BOX_WIDTH = 20;
const COLOR_BOX_PADDING = 4;
const COLOR_BOX_PER_COLUMN = 8;
const WIDTH = `${
  COLOR_BOX_WIDTH * COLOR_BOX_PER_COLUMN +
  COLOR_BOX_PADDING * COLOR_BOX_PER_COLUMN -
  1 +
  24 * 2
}px`;
export function PopoverSetColorAndIcon(props: Props) {
  return (
    <Popover
      isOpen={props.isOpen}
      isLazy
      placement={props.placement}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Link>{props.children}</Link>
      </PopoverTrigger>
      <PopoverContent w={WIDTH} ml="5px" pointerEvents="auto">
        <PopoverBody p={0}>
          <ColorPicker
            currentProjectBaseColorId={props.project.projectBaseColorId}
            projectId={props.project.id}
          />
          <Divider />
          <IconPicker
            projectId={props.project.id}
            currentProjectIconId={props.project.projectIconId}
            currentProjectLightColorId={props.project.projectLightColorId}
            currentProjectBaseColorId={props.project.projectBaseColorId}
          />
          <Divider />
          <Setting isSetForEveryone />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
