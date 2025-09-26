import { InputWithIcon } from '@/components/ui/InputWithIcon';
import { memo } from 'react';

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
