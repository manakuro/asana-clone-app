import { Flex, Portal } from '@/components/ui/atoms';
import { PopoverBody, PopoverContent } from '@/components/ui/organisms/Popover';
import type React from 'react';

export const PopoverEditorLinkContent: React.FCWithChildren = (props) => {
  return (
    <Portal>
      <PopoverContent contentEditable={false}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Flex fontSize="sm" alignItems="center" userSelect="none">
            {props.children}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
};
