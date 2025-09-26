import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Image as AtomsImage } from '@/components/ui/Image';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { useTaskFile } from '@/store/entities/taskFile';
import { memo } from 'react';

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
      <Text
        as="span"
        fontSize="xs"
        fontWeight="medium"
        color="text.muted"
        mt={1}
      >
        {taskFile.name}・
        <Link
          href={taskFile.src}
          fontSize="xs"
          color="text.muted"
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
