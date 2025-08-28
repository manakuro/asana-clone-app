import {
  Flex,
  type FlexProps,
  Icon,
  Progress,
  Text,
} from '@/components/ui/atoms';
import { transitions } from '@/styles';

type Props = FlexProps & {
  size: Sizes;
  file: {
    name: string;
    num: number;
  };
};
export type AttachmentUploadingBoxProps = Props;

const sizes = {
  lg: {
    w: '420px',
    h: 16,
  },
  md: {
    w: 60,
    h: 16,
  },
} as const;
type Sizes = keyof typeof sizes;

export function AttachmentUploadingBox(props: Props) {
  const { size, color, ...rest } = props;
  const sizeStyle = sizes[size];
  const taskFile = props.file.name;
  const progressValue = props.file.num;

  return (
    <Flex
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      alignItems="center"
      transition={transitions.base()}
      p={4}
      {...sizeStyle}
      {...rest}
    >
      <Icon icon="fileBlank" color="text.muted" size="2xl" />
      <Flex
        ml={4}
        flexDirection="column"
        justifyContent="center"
        flex={1}
        minW={0}
      >
        <Text fontSize="sm">{taskFile}</Text>
        <Progress
          mt={2}
          size="sm"
          hasStripe
          isAnimated
          value={progressValue}
          colorScheme="teal"
        />
      </Flex>
    </Flex>
  );
}
