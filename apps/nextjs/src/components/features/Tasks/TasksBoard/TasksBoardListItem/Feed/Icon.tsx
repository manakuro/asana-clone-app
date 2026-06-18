import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon as AtomsIcon } from '@/components/ui/icon';
import { Text, type TextProps } from '@/components/ui/text';

type Props = {
  size: number;
  textStyle?: TextProps;
};

export const Icon = memo(function Icon(props: Props) {
  const { size, textStyle } = props;

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="primary" {...textStyle}>
        {size}
      </Text>
      <AtomsIcon icon="messageRounded" color="primary" ml={1} />
    </Flex>
  );
});
