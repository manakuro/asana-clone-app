import { useKeyPress } from '@/hooks';
import { useCallback } from 'react';
import { useSearchMenuIndex } from './useSearchMenuIndex';
import { useSearchMenuRef } from './useSearchMenuRef';

type Props<Item> = {
  items: Item[];
  indexLength: number;
  onSetValue: (item: Item) => void;
};

export const useSearchMenuOnKeyBindings = <Item>(props: Props<Item>) => {
  const { element } = useSearchMenuRef();
  const { setSelectedIndex, selectedIndex } = useSearchMenuIndex();

  const scrollTo = useCallback(
    (index: number) => {
      const dom = element;
      if (!dom) return;

      if (index === 0) dom.scrollTop = 0;
      if (index < 5) return;

      dom.scrollTop += 50 * index;
    },
    [element],
  );

  const onArrowDown = useCallback(() => {
    const index = selectedIndex + 1;
    if (index > props.indexLength) {
      setSelectedIndex(0);
      scrollTo(0);
      return;
    }

    setSelectedIndex(index);
    scrollTo(index);
  }, [props.indexLength, scrollTo, setSelectedIndex, selectedIndex]);

  const onArrowUp = useCallback(() => {
    const index = selectedIndex - 1;
    if (index < 0) {
      setSelectedIndex(props.indexLength);
      scrollTo(props.indexLength);
      return;
    }

    setSelectedIndex(index);
    scrollTo(-index);
  }, [props.indexLength, scrollTo, setSelectedIndex, selectedIndex]);

  const onEnter = useCallback(() => {
    const item = props.items.find((_, i) => i === selectedIndex);

    // Do nothing when it is entered without selecting an item
    if (!item) return;

    props.onSetValue(item);
  }, [props, selectedIndex]);

  useKeyPress({
    targetKey: 'ArrowDown',
    onKeyPress: onArrowDown,
  });

  useKeyPress({
    targetKey: 'ArrowUp',
    onKeyPress: onArrowUp,
  });

  useKeyPress({
    targetKey: 'Enter',
    onKeyPress: onEnter,
  });

  return {
    onArrowDown,
    onArrowUp,
    onEnter,
  };
};
