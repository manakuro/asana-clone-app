import { useResizeObserver } from '@/hooks/useResizeObserver';
import { calculateModalPosition } from '@/shared/calculateModalPosition';
import {
  type BaseEmoji,
  type EmojiData,
  type EmojiSkin,
  emojiData,
  frequently,
} from '@/shared/emoji';
import { getCaretPosition } from '@/shared/getCaretPosition';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const key = (str: string) =>
  `src/components/organisms/Menus/EditorEmojiMenu/useEditorEmojiMenu/${str}`;

const DEFAULT_EMOJIS = [
  'grinning',
  'laughing',
  'sweat_smile',
  'joy',
  'scream',
  'sob',
  'sunglasses',
];
const defaultEmojis = (): BaseEmoji[] => {
  const frequentlyEmojis = frequently.get(2);
  const data = frequentlyEmojis.length
    ? frequentlyEmojis.slice(0, 7)
    : DEFAULT_EMOJIS;

  return data.map((e) => {
    const matched = emojiData.emojis[e];
    if (isEmojiWithSkin(matched)) return matched[1];

    return matched;
  }) as BaseEmoji[];
};
type EmojiWithSkin = { [variant in EmojiSkin]: EmojiData };
const isEmojiWithSkin = (data: any): data is EmojiWithSkin => !!data[1];

type State = {
  isOpen: boolean;
  x: number;
  y: number;
  query: string;
  callback: () => Promise<void>;
  selectedIndex: number;
  containerRef: HTMLDivElement | null;
};

const modalState = atomWithReset<State>({
  isOpen: false,
  x: 0,
  y: 0,
  query: '',
  callback: () => Promise.resolve(),
  selectedIndex: 0,
  containerRef: null,
});

// NOTE: Export functions in order to execute inside prosemirror's plugins
// @see src/shared/prosemirror/config/plugins.ts
let onOpen: () => Promise<void> | void;
let onClose: () => void;
let setQuery: (query: string) => void;
let getQuery: () => string;
let onArrowDown: () => void;
let onArrowUp: () => void;
let onEnter: () => void;
let isOpen: boolean;
let getCurrentCaretPosition: () => { x: number; y: number } | null;

type EmojiRef = Readonly<{ current: BaseEmoji | null }>;
const emojiRef: EmojiRef = {
  current: null,
};
export const getEmoji = () => emojiRef.current;
const setEmojiRef = (val: BaseEmoji | null) => {
  (emojiRef as Writeable<EmojiRef>).current = val;
};

export const useEditorEmojiMenu = () => {
  const [state, setState] = useAtom(modalState);
  const resetState = useResetAtom(modalState);

  const setValue = useCallback((val: BaseEmoji) => {
    setEmojiRef(val);
    onClose();
  }, []);

  const emojis = useMemo<BaseEmoji[]>(() => {
    if (!state.query) return defaultEmojis();
    return (
      (emojiData.search(state.query.toLowerCase()) as BaseEmoji[])?.map(
        (o) => o,
      ) || []
    ).slice(0, 10);
  }, [state.query]);

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }));
    },
    [setState],
  );

  const reset = useCallback(() => {
    resetState();
    setEmojiRef(null);
  }, [resetState]);

  const { containerRef } = useContainer();
  useQuery();
  useOnKeyBindings({ emojis, setValue });
  useDisclosure({ reset });

  return {
    ...state,
    setValue,
    onOpen,
    onClose,
    emojis,
    setSelectedIndex,
    containerRef,
  };
};

function useOnKeyBindings(props: {
  emojis: BaseEmoji[];
  setValue: (emoji: BaseEmoji) => void;
}) {
  const [state, setState] = useAtom(modalState);

  const scrollTo = useCallback(
    (index: number) => {
      const dom = state.containerRef;
      if (!dom) return;

      if (index === 0) dom.scrollTop = 0;
      if (index < 5) return;

      dom.scrollTop += 50 * index;
    },
    [state.containerRef],
  );

  onArrowDown = useCallback(() => {
    const selectedIndex = state.selectedIndex + 1;
    if (selectedIndex > props.emojis.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }));
      scrollTo(0);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(selectedIndex);
  }, [props.emojis, scrollTo, setState, state.selectedIndex]);

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1;
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: props.emojis.length }));
      scrollTo(props.emojis.length);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(-selectedIndex);
  }, [props.emojis.length, scrollTo, setState, state.selectedIndex]);

  onEnter = useCallback(() => {
    const emoji = props.emojis.find((_, i) => i === state.selectedIndex);

    if (!emoji) return;

    props.setValue(emoji);
  }, [props, state.selectedIndex]);
}

function useDisclosure(props: { reset: () => void }) {
  const [state, setState] = useAtom(modalState);

  getCurrentCaretPosition = useCallback(() => {
    const position = getCaretPosition();
    if (!position) return null;

    position.y += 24;
    return position;
  }, []);

  onOpen = useCallback(() => {
    // Avoid recalculate the position while the modal is opening
    const position = isOpen ? {} : getCurrentCaretPosition();
    if (!position) return;

    isOpen = true;

    return new Promise<void>((resolve) => {
      setState((s) => ({
        ...s,
        isOpen: true,
        callback: resolve as () => Promise<void>,
        ...position,
      }));
    });
  }, [setState]);

  onClose = useCallback(async () => {
    isOpen = false;
    setState((s) => ({ ...s, isOpen: false }));
    await state.callback();

    // Use setTimeout to prevent moving back to the initial position ({ top: 0, left: 0 }) before closing
    setTimeout(() => {
      console.log('reset!');
      props.reset();
    }, 200);
  }, [props, setState, state]);
}

function useQuery() {
  const [state, setState] = useAtom(modalState);

  setQuery = useCallback(
    (query) => {
      setState((s) => ({ ...s, query }));
    },
    [setState],
  );
  getQuery = useCallback(() => state.query, [state.query]);
}

function useContainer() {
  const [state, setState] = useAtom(modalState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setState((s) => ({
        ...s,
        containerRef: containerRef.current,
      }));
    }

    return () => {
      setState((s) => ({ ...s, containerRef: null }));
    };
  }, [setState]);

  // TODO: Make text input faster and more smoothly.
  useResizeObserver(containerRef, () => {
    if (!containerRef.current) return;

    const caretPosition = getCurrentCaretPosition();
    if (!caretPosition) return null;

    const position = calculateModalPosition(containerRef.current, {
      y: caretPosition.y,
    });
    if (!position) return;
    if (position.y === state.y) return;

    setState((s) => ({ ...s, ...position }));
  });

  return {
    containerRef,
  };
}

export {
  onOpen as onEmojiOpen,
  onClose as onEmojiClose,
  setQuery as setEmojiQuery,
  getQuery as getEmojiQuery,
  onArrowDown as onEmojiArrowDown,
  onArrowUp as onEmojiArrowUp,
  onEnter as onEmojiEnter,
  isOpen as isEmojiOpen,
};
