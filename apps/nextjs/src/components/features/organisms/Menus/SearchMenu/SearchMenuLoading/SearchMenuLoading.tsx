import { Spinner } from '@/components/ui/Spinner';
import { memo } from 'react';
import { SearchMenuListItem } from '../SearchMenuListItem';

export const SearchMenuLoading = memo(function SearchMenuLoading() {
  return (
    <SearchMenuListItem index={-1} alignItems="center" justifyContent="center">
      <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
    </SearchMenuListItem>
  );
});
