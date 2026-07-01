import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { AttachmentBox } from '@/features/task-detail/components/attachment-box';

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
