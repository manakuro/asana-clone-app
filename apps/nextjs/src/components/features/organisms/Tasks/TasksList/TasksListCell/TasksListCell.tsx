import { Flex, type FlexProps } from '@/components/ui/atoms';
import { pxToNum } from '@/shared/pxToNum';
import { forwardRef } from 'react';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ColumnResizer } from './ColumnResizer';

type Props = {
  hover?: boolean;
  resizable?: boolean;
  resizedMinW?: number;
  resizedMaxW?: number;
  onChangeSize?: (size: string) => void;
  containerStyle?: FlexProps;
  focused?: boolean;
} & FlexProps;
export type TasksListCellProps = Props;

export const TasksListCell: React.FC<Props> = memo(
  forwardRef((props, ref) => {
    const {
      hover,
      resizable,
      onChangeSize,
      resizedMinW,
      resizedMaxW,
      containerStyle,
      focused,
      ...rest
    } = props;

    const handleChange = useCallback(
      (margin: number) => {
        const width = pxToNum(containerStyle?.w as string);
        console.log('width: ', width, margin);
        onChangeSize?.(`${width + margin}px`);
      },
      [onChangeSize, containerStyle?.w],
    );

    const cellStyle = useMemo(
      (): FlexProps => ({
        ...(hover
          ? {
              zIndex: 0,
              _hover: {
                borderColor: 'gray.400',
                zIndex: 1,
              },
            }
          : {}),
        ...(focused
          ? {
              borderColor: 'cyan.400',
              zIndex: 1,
              _hover: { borderColor: 'cyan.400' },
            }
          : {}),
      }),
      [focused, hover],
    );

    return (
      <Flex
        h="37px"
        mr="-1px"
        {...containerStyle}
        ref={ref}
        position={containerStyle?.position || 'relative'}
        _hover={{
          zIndex: ((containerStyle?.zIndex as number) || 1) + 1,
        }}
      >
        <Flex
          w="100%"
          maxW="100%"
          fontWeight="normal"
          border={1}
          borderStyle="solid"
          borderColor="gray.200"
          alignItems="center"
          fontSize="xs"
          color="text.muted"
          py={0}
          px={2}
          {...cellStyle}
          {...rest}
        >
          {props.children}
        </Flex>
        {resizable && (
          <ColumnResizer
            onChange={handleChange}
            resizedMinW={resizedMinW}
            resizedMaxW={resizedMaxW}
          />
        )}
      </Flex>
    );
  }),
);
