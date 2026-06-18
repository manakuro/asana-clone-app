import type React from 'react';
import { memo, useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Textarea, type TextareaProps } from '@/components/ui/textarea';
import type { SystemStyleObject } from '@/shared/chakra';

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
  inputStyle?: SystemStyleObject;
};

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
    inputStyle,
  } = props;

  const style = useMemo<SystemStyleObject>(
    () => ({
      w: 'full',
      h: 'full',
      minH: inputStyle?.minH || 'auto',
      m: 0,
      color: 'fg',
      border: '1px',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderRadius: 'md',
      paddingLeft: noBorder ? 0 : 2,
      paddingRight: noBorder ? 0 : 2,
      _hover: {
        borderColor: noBorder ? 'transparent' : 'gray.400',
      },
      _focus: {
        borderColor: noBorder ? 'transparent' : 'gray.600',
        _hover: {
          borderColor: noBorder ? 'transparent' : 'gray.600',
        },
      },
      overflowWrap: 'anywhere',
      ...(autoFocus ? { borderColor: 'gray.600' } : {}),
    }),
    [inputStyle?.minH, noBorder, autoFocus],
  );

  return (
    <Flex
      flex={1}
      position="relative"
      onClick={onClick}
      {...(inputStyle as FlexProps)}
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
        {...inputStyle}
        resize="none"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        position="absolute"
        top={0}
        left={0}
        value={value}
        placeholder={placeholder}
        _focusVisible={{
          boxShadow: 'none',
        }}
      >
        {value}
      </Textarea>
    </Flex>
  );
});
