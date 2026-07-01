import { memo, type PropsWithChildren } from 'react';
import type { PopoverRootProps } from '@/components/ui/popover';
import {
  SearchMenu,
  SearchMenuContent,
  SearchMenuTrigger,
} from '@/components/ui/search-menu';
import { Content } from './content';

type Props = PopoverRootProps & {
  onSelect: (val: string) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  immediate?: boolean;
};

export const ProjectMenu = memo(function ProjectMenu(
  props: PropsWithChildren<Props>,
) {
  const { onClosed, queryText, open, onClose, immediate, ...rest } = props;

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
            immediate={immediate}
          />
        </SearchMenuContent>
      )}
    </SearchMenu>
  );
});
