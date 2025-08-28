import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  observeScrollUp?: boolean;
  onVisible: (id: string) => void;
  dateString: string;
} & FlexProps;

export const ScrollUpObserver = memo(function ScrollUpObserver(props: Props) {
  const { observeScrollUp, onVisible, dateString, ...rest } = props;
  const { ref, inView } = useInView({
    skip: !observeScrollUp,
    triggerOnce: true,
  });
  const hasScrolledUp = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (hasScrolledUp.current) return;

    if (observeScrollUp) {
      onVisible(dateString);
      hasScrolledUp.current = true;
    }
  }, [inView, observeScrollUp, onVisible, dateString]);

  return <Flex {...rest} ref={ref} flex={1} />;
});
