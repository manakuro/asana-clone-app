import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { type RefObject, useCallback, useEffect, useRef } from 'react';
import { useResizeObserver } from '@/hooks/use-resize-observer';
import { type BaseEmoji, emojis, frequently, searchEmoji } from '@/lib/emoji';
import { calculateModalPosition } from '@/utils/calculate-modal-position';
import { getCaretPosition } from '@/utils/get-caret-position';

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
  const frequentlyEmojis = frequently.get({ maxFrequentRows: 2, perLine: 1 });
  const data = frequentlyEmojis.length
    ? frequentlyEmojis.slice(0, 7)
    : DEFAULT_EMOJIS;

  return data.map((e) => {
    return emojis[e];
  }) as BaseEmoji[];
};

type State = {
  open: boolean;
  x: number;
  y: number;
  query: string;
  callback: () => Promise<void>;
  selectedIndex: number;
  containerRef: HTMLDivElement | null;
};

const modalState = atomWithReset<State>({
  open: false,
  x: 0,
  y: 0,
  query: '',
  callback: () => Promise.resolve(),
  selectedIndex: 0,
  containerRef: null,
});
const emojiState = atomWithReset<BaseEmoji[]>(defaultEmojis());

// NOTE: Export functions in order to execute inside prosemirror's plugins
// @see apps/nextjs/src/lib/prosemirror/plugins/suggestions/suggest-emoji.ts
let onOpen: (options?: { onOpened?: () => void }) => Promise<void> | void;
let onClose: () => void;
let setQuery: (query: string) => void;
let onArrowDown: () => void;
let onArrowUp: () => void;
let onEnter: () => void;
let open: boolean;
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
  const [emojis, setEmojis] = useAtom(emojiState);
  const resetState = useResetAtom(modalState);
  const emojisRef = useRef<BaseEmoji[]>(emojis);

  const setValue = useCallback((val: BaseEmoji) => {
    setEmojiRef(val);
    onClose();
  }, []);

  useEffect(() => {
    (async () => {
      if (!state.query) {
        setEmojis(defaultEmojis());
        emojisRef.current = defaultEmojis();
        return;
      }

      const res = (
        (await searchEmoji(state.query.toLowerCase()))?.map((o) => o) || []
      ).slice(0, 10);

      setEmojis(res);
      emojisRef.current = res;
    })();
  }, [state.query, setEmojis]);

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
  useOnKeyBindings({ emojisRef, setValue });
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
  emojisRef: RefObject<BaseEmoji[]>;
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
    if (selectedIndex > props.emojisRef?.current.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }));
      scrollTo(0);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(selectedIndex);
  }, [
    scrollTo,
    setState,
    state.selectedIndex,
    props.emojisRef?.current.length,
  ]);

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1;
    if (selectedIndex < 0) {
      setState((s) => ({
        ...s,
        selectedIndex: props.emojisRef.current.length,
      }));
      scrollTo(props.emojisRef.current.length);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(-selectedIndex);
  }, [props.emojisRef.current.length, scrollTo, setState, state.selectedIndex]);

  onEnter = useCallback(() => {
    const emoji = props.emojisRef.current.find(
      (_, i) => i === state.selectedIndex,
    );

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

  onOpen = useCallback(
    (options?: { onOpened?: () => void }) => {
      // Avoid recalculate the position while the modal is opening
      const position = open ? {} : getCurrentCaretPosition();
      if (!position) return;

      open = true;
      return new Promise<void>((resolve) => {
        setState((s) => ({
          ...s,
          open: true,
          callback: resolve as () => Promise<void>,
          ...position,
        }));
        if (options?.onOpened) {
          options.onOpened();
        }
      });
    },
    [setState],
  );

  onClose = useCallback(async () => {
    open = false;
    setState((s) => ({ ...s, open: false }));
    await state.callback();

    // Use setTimeout to prevent moving back to the initial position ({ top: 0, left: 0 }) before closing
    setTimeout(() => {
      console.log('reset!');
      props.reset();
    }, 200);
  }, [props, setState, state]);
}

function useQuery() {
  const [_, setState] = useAtom(modalState);

  setQuery = useCallback(
    (query) => {
      setState((s) => ({ ...s, query }));
    },
    [setState],
  );
}

function useContainer() {
  const [state, setState] = useAtom(modalState);
  const containerRef = useRef<HTMLDivElement>(null);

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
  onArrowDown as onEmojiArrowDown,
  onArrowUp as onEmojiArrowUp,
  onEnter as onEmojiEnter,
  open as isEmojiOpen,
};
