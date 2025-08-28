import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useThumbnailAttachmentContext } from './Provider';

type Props = FlexProps;

export function Container(props: Props) {
  const { ref } = useThumbnailAttachmentContext();

  return (
    <Flex
      ref={ref}
      minW="60px"
      h={16}
      borderRadius="lg"
      cursor="pointer"
      position="relative"
      {...props}
    />
  );
}
