import { memo } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { SearchMenuListItem } from '../SearchMenuListItem';

export const SearchMenuLoading = memo(function SearchMenuLoading() {
  return (
    <SearchMenuListItem index={-1} alignItems="center" justifyContent="center">
      <Spinner
        size="sm"
        color="gray.400"
        css={{ '--spinner-track-color': 'colors.gray.200' }}
      />
    </SearchMenuListItem>
  );
});
