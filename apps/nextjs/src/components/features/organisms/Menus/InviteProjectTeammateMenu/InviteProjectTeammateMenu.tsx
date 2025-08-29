import {
  ProjectTeammateMenu,
  ProjectTeammateMenuContent,
  ProjectTeammateMenuTrigger,
} from '@/components/features/organisms/Menus/ProjectTeammateMenu';
import type {
  PopoverContentProps,
  PopoverProps,
} from '@/components/ui/organisms/Popover';
import type { Teammate } from '@/store/entities/teammate';
import { memo } from 'react';
import { Content } from './Content';

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  contentStyle?: PopoverContentProps;
};

export const InviteProjectTeammateMenu = memo(
  function InviteProjectTeammateMenu(props: Props) {
    const {
      onClosed,
      queryText,
      contentStyle,
      onSelect,
      onClose,
      isOpen,
      ...rest
    } = props;

    return (
      <ProjectTeammateMenu isOpen={isOpen} {...rest}>
        <ProjectTeammateMenuTrigger>
          {props.children}
        </ProjectTeammateMenuTrigger>
        {isOpen && (
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
  },
);
