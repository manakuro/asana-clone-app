import { memo } from 'react';
import { InputWithIcon } from '@/components/ui/input-with-icon';

export const SearchInput = memo(function SearchInput() {
  return (
    <InputWithIcon
      icon="search"
      placeholder="Search"
      borderRadius="full"
      size="sm"
    />
  );
});
