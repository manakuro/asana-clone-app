import { memo, type PropsWithChildren } from 'react';
import {
  ProjectTeammateMenu,
  ProjectTeammateMenuContent,
  ProjectTeammateMenuTrigger,
} from '@/components/features/Menus/ProjectTeammateMenu';
import type {
  PopoverContentProps,
  PopoverRootProps,
} from '@/components/ui/popover';
import type { Teammate } from '@/store/entities/teammate';
import { Content } from './Content';

type Props = PopoverRootProps & {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  contentStyle?: PopoverContentProps;
};

export const InviteCollaboratorMenu = memo(function InviteCollaboratorMenu(
  props: PropsWithChildren<Props>,
) {
  const {
    onClosed,
    queryText,
    contentStyle,
    onSelect,
    onClose,
    open,
    ...rest
  } = props;

  return (
    <ProjectTeammateMenu open={open} {...rest}>
      <ProjectTeammateMenuTrigger>{props.children}</ProjectTeammateMenuTrigger>
      {open && (
        <ProjectTeammateMenuContent onClose={onClose} {...contentStyle}>
          <Content
            onSelect={onSelect}
            onClosed={onClosed}
            onClose={onClose}
            queryText={queryText}
          />
        </ProjectTeammateMenuContent>
      )}
    </ProjectTeammateMenu>
  );
});
