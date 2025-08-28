import {
  Box,
  Flex,
  type FlexProps,
  Textarea,
  type TextareaProps,
} from '@/components/ui/atoms';
import type { ChakraProps } from '@/shared/chakra';
import type React from 'react';
import { memo, useMemo } from 'react';

type Props = {
  value: string;
  onChange: TextareaProps['onChange'];
  onClick?: FlexProps['onClick'];
  onKeyDown?: TextareaProps['onKeyDown'];
  onFocus?: TextareaProps['onFocus'];
  onBlur?: TextareaProps['onBlur'];
  autoFocus?: TextareaProps['autoFocus'];
  containerStyle?: FlexProps;
  placeholder?: string;
  textareaRef?: React.ForwardedRef<any>;
  noBorder?: boolean;
} & ChakraProps;

export const InputText = memo(function InputText(props: Props) {
  const {
    value,
    onChange,
    onKeyDown,
    containerStyle,
    placeholder,
    onClick,
    onFocus,
    onBlur,
    autoFocus,
    textareaRef,
    noBorder,
    ...rest
  } = props;

  const style = useMemo<ChakraProps>(
    () => ({
      w: 'full',
      h: 'full',
      minH: props.minH || 'auto',
      m: 0,
      color: 'text.base',
      border: '1px',
      borderColor: 'transparent',
      borderRadius: 'md',
      paddingLeft: noBorder ? 0 : 2,
      paddingRight: noBorder ? 0 : 2,
      _hover: {
        borderColor: noBorder ? 'transparent' : 'gray.400',
      },
      _focus: {
        borderColor: noBorder ? 'transparent' : 'gray.500',
      },
      wordBreak: 'break-all',
      ...(autoFocus ? { borderColor: 'gray.500' } : {}),
    }),
    [props.minH, noBorder, autoFocus],
  );

  return (
    <Flex
      flex={1}
      position="relative"
      onClick={onClick}
      {...rest}
      {...containerStyle}
      w="full"
    >
      <Box {...style} visibility="hidden">
        {value}
      </Box>
      <Textarea
        ref={textareaRef}
        p={0}
        {...style}
        {...rest}
        resize="none"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        position="absolute"
        top={0}
        left={0}
        focusBorderColor="transparent"
        value={value}
        placeholder={placeholder}
      >
        {value}
      </Textarea>
    </Flex>
  );
});
