import {
  SearchMenu,
  SearchMenuContent,
  SearchMenuTrigger,
} from '@/components/features/organisms/Menus/SearchMenu';
import type { PopoverProps } from '@/components/ui/organisms/Popover';
import { memo } from 'react';
import { Content } from './Content';

type Props = PopoverProps & {
  onSelect: (val: string) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  immediate?: boolean;
};

export const ProjectMenu = memo(function ProjectMenu(props: Props) {
  const { onClosed, queryText, isOpen, onClose, immediate, ...rest } = props;

  return (
    <SearchMenu isOpen={isOpen} {...rest}>
      <SearchMenuTrigger>{props.children}</SearchMenuTrigger>
      {isOpen && (
        <SearchMenuContent mr={-3} onClose={onClose}>
          <Content
            onClosed={onClosed}
            onClose={props.onClose}
            onSelect={props.onSelect}
            queryText={queryText}
            immediate={immediate}
          />
        </SearchMenuContent>
      )}
    </SearchMenu>
  );
});
