import { Flex } from '@/components/ui/Flex';
import { Spinner } from '@/components/ui/Spinner';
import { memo } from 'react';

export const PopoverEditorLinkLoading = memo(
  function PopoverEditorLinkLoading() {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
      </Flex>
    );
  },
);
