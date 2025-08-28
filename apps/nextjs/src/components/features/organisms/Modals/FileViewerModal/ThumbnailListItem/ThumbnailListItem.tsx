import { Center, Icon, Image } from '@/components/ui/atoms';
import { FileTypeCode } from '@/graphql/enums';
import type { ChakraProps } from '@/shared/chakra';
import { getTaskFileIcon, useTaskFile } from '@/store/entities/taskFile';
import { useMemo } from 'react';
import { Container } from './Container';

type Props = {
  taskFileId: string;
};

export function ThumbnailListItem(props: Props) {
  const { taskFileId } = props;
  const { taskFile } = useTaskFile(taskFileId);
  const style = useMemo<ChakraProps>(
    () => ({
      bg: 'gray.50',
      borderRadius: 'md',
      h: 'full',
      w: 'full',
    }),
    [],
  );

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return (
        <Container label={taskFile.name}>
          <Image src={taskFile.src} objectFit="cover" {...style} />
        </Container>
      );
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      const icon = getTaskFileIcon(taskFile.fileType.typeCode);
      return (
        <Container label={taskFile.name}>
          <Center {...style}>
            <Icon icon={icon} color="primary" />
          </Center>
        </Container>
      );
    }
  }
}
