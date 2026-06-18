import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Image as AtomsImage } from '@/components/ui/image';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { useTaskFile } from '@/store/entities/taskFile';

type Props = FlexProps & {
  taskFileId: string;
};

export const Image = memo(function Image(props: Props) {
  const { onClick, taskFileId, ...rest } = props;
  const { taskFile } = useTaskFile(taskFileId);

  return (
    <Flex flexDirection="column" {...rest}>
      <AtomsImage
        onClick={onClick}
        src={taskFile.src}
        bg="gray.50"
        width="auto"
        border={1}
        borderColor="gray.100"
        borderStyle="solid"
        borderRadius="md"
        objectFit="cover"
        _hover={{
          borderColor: 'gray.400',
        }}
        maxW="240px"
        cursor="pointer"
      />
      <Text as="span" fontSize="xs" fontWeight="medium" color="fg.muted" mt={1}>
        {taskFile.name}・
        <Link
          href={taskFile.src}
          fontSize="xs"
          color="fg.muted"
          download
          hover
          onClick={(e) => e.stopPropagation()}
        >
          Download
        </Link>
      </Text>
    </Flex>
  );
});
