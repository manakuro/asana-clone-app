import { Flex } from '@/components/ui/Flex';
import { Icon as AtomsIcon } from '@/components/ui/Icon';
import { Text, type TextProps } from '@/components/ui/Text';
import { memo } from 'react';

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
      <AtomsIcon icon="flowChildren" color="primary" ml={1} />
    </Flex>
  );
});
