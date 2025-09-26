import {
  SearchMenu,
  SearchMenuContent,
  SearchMenuTrigger,
} from '@/components/features/Menus/SearchMenu';
import type { PopoverProps } from '@/components/ui/Popover';
import type { Tag } from '@/store/entities/tag';
import { type PropsWithChildren, memo } from 'react';
import { Content } from './Content';

type Props = PopoverProps & {
  onSelect: (tag: Tag) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const TagMenu = memo(function TagMenu(props: PropsWithChildren<Props>) {
  const { onClosed, queryText, isOpen, onClose, ...rest } = props;

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
          />
        </SearchMenuContent>
      )}
    </SearchMenu>
  );
});
