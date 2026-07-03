import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { transitions } from '@/styles/transitions';

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
  const { size, color: _, ...rest } = props;
  const sizeStyle = sizes[size];
  const taskFile = props.file.name;
  const progressValue = props.file.num;

  return (
    <Flex
      borderRadius="lg"
      border="1px"
      borderColor="border"
      borderStyle="solid"
      alignItems="center"
      transition={transitions.base()}
      p={4}
      {...sizeStyle}
      {...rest}
    >
      <Icon icon="fileBlank" color="fg.muted" size="2xl" />
      <Flex
        ml={4}
        flexDirection="column"
        justifyContent="center"
        flex={1}
        minW={0}
      >
        <Text fontSize="sm">{taskFile}</Text>
        <Progress.Root
          mt={2}
          size="sm"
          striped
          animated
          value={progressValue}
          colorPalette="teal"
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
          <Progress.Label />
          <Progress.ValueText />
        </Progress.Root>
      </Flex>
    </Flex>
  );
}
