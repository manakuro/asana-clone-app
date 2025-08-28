import { Flex, type FlexProps, Icon, Link, Text } from '@/components/ui/atoms';
import type { IconType } from '@/shared/icons';
import { transitions } from '@/styles';
import { type Sizes, sizes } from './sizes';

type Props = FlexProps & {
  size: Sizes;
  name: string;
  src: string;
  fileName: string;
  icon: IconType;
  isHovering?: boolean;
};

export function Component(props: Props) {
  const { size, color, name, isHovering, fileName, src, icon, ...rest } = props;
  const sizeStyle = sizes[size];

  return (
    <Flex
      borderRadius="lg"
      border="1px"
      borderColor={isHovering ? 'gray.400' : 'gray.200'}
      alignItems="center"
      transition={transitions.base()}
      p={4}
      {...sizeStyle}
      {...rest}
    >
      <Icon icon={icon} color="text.muted" size="2xl" />
      <Flex ml={4} flexDirection="column" flex={1} minW={0}>
        <Text fontSize="sm" noOfLines={1}>
          {name}
        </Text>
        <Flex>
          <Text as="span" fontSize="xs" color="text.muted">
            {fileName}・
            <Link
              href={src}
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
      </Flex>
    </Flex>
  );
}
