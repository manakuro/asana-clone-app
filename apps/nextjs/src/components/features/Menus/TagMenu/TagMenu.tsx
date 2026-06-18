import { memo, type PropsWithChildren } from 'react';
import {
  SearchMenu,
  SearchMenuContent,
  SearchMenuTrigger,
} from '@/components/features/Menus/SearchMenu';
import type { PopoverRootProps } from '@/components/ui/popover';
import type { Tag } from '@/store/entities/tag';
import { Content } from './Content';

type Props = PopoverRootProps & {
  onSelect: (tag: Tag) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const TagMenu = memo(function TagMenu(props: PropsWithChildren<Props>) {
  const { onClosed, queryText, open, onClose, ...rest } = props;

  return (
    <SearchMenu open={open} {...rest}>
      <SearchMenuTrigger>{props.children}</SearchMenuTrigger>
      {open && (
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
