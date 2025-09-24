import { InputWithIcon } from '@/components/ui/molecules/InputWithIcon';
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
