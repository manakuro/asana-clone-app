import { InputWithIcon } from '@/components/ui/molecules';
import type React from 'react';
import { memo } from 'react';

export const SearchInput: React.FC = memo(() => {
  return (
    <InputWithIcon
      icon="search"
      placeholder="Search"
      borderRadius="full"
      size="sm"
    />
  );
});
