import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Image } from '@/components/ui/image';
import { PdfViewer } from '@/components/ui/pdf-viewer';
import { Text } from '@/components/ui/text';
import { FileTypeCode } from '@/store/entities/fileType';
import { useTaskFile } from '@/store/entities/taskFile';

type Props = {
  taskFileId: string;
};

export function ListItem(props: Props) {
  const { taskFileId } = props;
  const { taskFile } = useTaskFile(taskFileId);

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return <Image src={taskFile.src} objectFit="contain" alt="taskFile" />;
    }
    case FileTypeCode.Pdf: {
      return <PdfViewer fileUrl={taskFile.src} />;
    }
    case FileTypeCode.Text: {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box w="40%">
            <Image
              src="/images/not_preview_file.svg"
              objectFit="contain"
              alt="not preview"
            />
          </Box>
          <Text fontSize="xl" mt={4}>
            We're not able to preview this file
          </Text>
          <Text fontSize="sm" color="fg.muted" mt={4}>
            {taskFile.name}
          </Text>
        </Flex>
      );
    }
  }
}
