import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  observeScrollDown?: boolean;
  onVisible: (id: string) => void;
  dateString: string;
} & FlexProps;

export const ScrollDownObserver = memo(function ScrollDownObserver(
  props: Props,
) {
  const { observeScrollDown, onVisible, dateString, ...rest } = props;
  const { ref, inView } = useInView({
    skip: !observeScrollDown,
    triggerOnce: true,
  });
  const hasScrolledDown = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (hasScrolledDown.current) return;

    if (observeScrollDown) {
      onVisible(dateString);
      hasScrolledDown.current = true;
    }
  }, [inView, observeScrollDown, onVisible, dateString]);

  return <Flex {...rest} ref={ref} flex={1} />;
});
