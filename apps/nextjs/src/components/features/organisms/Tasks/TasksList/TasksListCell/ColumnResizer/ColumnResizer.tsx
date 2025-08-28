import { Flex, type FlexProps, Portal } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props = Omit<FlexProps, 'onChange'> & {
  onChange?: (margin: number) => void;
  resizedMinW?: number;
  resizedMaxW?: number;
};

export function ColumnResizer(props: Props) {
  const { onChange, resizedMinW, resizedMaxW, ...rest } = props;
  const [dragging, setDragging] = useState<boolean>(false);
  const { ref, isHovering } = useHover();
  const [height, setHeight] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const showBorderLine = useMemo(() => dragging, [dragging]);

  const initializeResizerPosition = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current?.getBoundingClientRect();
    setHeight(rect.height);
    setTop(rect.top);
    setLeft(rect.left);
    setTranslateX(0);
  }, [ref]);

  const handleStartDrag = useCallback(() => {
    setDragging(true);
  }, []);

  const handleEndDrag = useCallback(() => {
    setDragging(false);
    onChange?.(translateX);
    setShow(false);
  }, [onChange, translateX]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (!dragging) return;
      if (!ref.current) return;
      const x = e.clientX - left;
      const parentWidth = ref.current?.parentElement?.offsetWidth ?? 0;
      const minX = parentWidth - Number(resizedMinW);
      if (-x > minX) return;
      if (resizedMaxW && parentWidth + x > Number(resizedMaxW)) return;

      setTranslateX(x);
    },
    [dragging, left, ref, resizedMaxW, resizedMinW],
  );

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (isHovering) {
      initializeResizerPosition();
      setShow(true);
    }
  }, [isHovering, initializeResizerPosition]);

  return (
    <>
      <Flex
        ref={ref}
        position="absolute"
        w="8px"
        h="full"
        top={0}
        right="-4.5px"
        cursor="col-resize"
        zIndex="dropdown"
        {...rest}
      />
      {show && (
        <Portal>
          <Flex
            position="fixed"
            w="100px"
            h={height}
            top={top}
            left={left - 46}
            transform={`translateX(${translateX}px)`}
            cursor="col-resize"
            zIndex="tooltip"
            justifyContent="center"
            alignItems="center"
            onMouseDown={handleStartDrag}
            onTouchStart={handleStartDrag}
            onMouseUp={handleEndDrag}
            onTouchEnd={handleEndDrag}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
          >
            <Flex w="8px" h="full" bg="cyan.300" />
            {showBorderLine && (
              <Flex
                position="absolute"
                top="0"
                left="50%"
                marginLeft="-0.5px"
                width="1px"
                height="100vh"
                bg="cyan.500"
              />
            )}
          </Flex>
        </Portal>
      )}
    </>
  );
}
