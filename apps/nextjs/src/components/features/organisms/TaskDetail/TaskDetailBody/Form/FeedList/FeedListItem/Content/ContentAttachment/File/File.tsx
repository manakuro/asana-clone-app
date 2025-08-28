import { AttachmentBox } from '@/components/features/molecules/AttachmentBox';
import type { FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps & {
  taskFileId: string;
};

export const File = memo(function File(props: Props) {
  return (
    <AttachmentBox
      size="lg"
      bg="white"
      cursor="pointer"
      _hover={{
        borderColor: 'gray.400',
      }}
      {...props}
    />
  );
});
