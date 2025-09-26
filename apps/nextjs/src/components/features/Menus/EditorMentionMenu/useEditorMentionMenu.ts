import { useMentionsQuery } from '@/hooks/queries/entities';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { calculateModalPosition } from '@/shared/calculateModalPosition';
import { getCaretPosition } from '@/shared/getCaretPosition';
import type { Mention, MentionTypeCode } from '@/store/entities/mention';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback, useEffect, useRef } from 'react';

type Id = string | null;
type State = {
  isOpen: boolean;
  x: number;
  y: number;
  query: string;
  callback: () => void;
  selectedIndex: number;
  containerRef: HTMLDivElement | null;
};

const modalState = atomWithReset<State>({
  isOpen: false,
  x: 0,
  y: 0,
  query: '',
  callback: () => {},
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

type IdRef = Readonly<{ current: Id }>;
const idRef: IdRef = {
  current: '',
};
export const getMentionId = () => idRef.current;
const setMentionIdRef = (val: Id) => {
  (idRef as Writeable<IdRef>).current = val;
};

type TypeRef = Readonly<{ current: MentionTypeCode | null }>;
const typeRef: IdRef = {
  current: null,
};
export const getMentionType = () => typeRef.current;
const setMentionTypeRef = (val: MentionTypeCode | null) => {
  (typeRef as Writeable<TypeRef>).current = val;
};

export type SetValueParam = {
  id: Id;
  type: MentionTypeCode;
};

export const useEditorMentionMenu = () => {
  const [state, setState] = useAtom(modalState);
  const resetState = useResetAtom(modalState);
  const { refetch, mentions, loading } = useMentionsQuery();

  const reset = useCallback(() => {
    setMentionIdRef(null);
    setMentionTypeRef(null);
    resetState();
  }, [resetState]);

  const setValue = useCallback((params: SetValueParam) => {
    setMentionIdRef(params.id);
    setMentionTypeRef(params.type);
    onClose();
  }, []);

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }));
    },
    [setState],
  );

  const { containerRef } = useContainer();
  useOnKeyBindings({ mentions, setValue });
  useQuery();
  useDisclosure({ reset });

  return {
    ...state,
    refetch,
    loading,
    setValue,
    onOpen,
    onClose,
    mentions,
    setSelectedIndex,
    containerRef,
  };
};

function useOnKeyBindings(props: {
  mentions: Mention[];
  setValue: (val: SetValueParam) => void;
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
    if (selectedIndex > props.mentions.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }));
      scrollTo(0);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(selectedIndex);
  }, [props.mentions.length, scrollTo, setState, state.selectedIndex]);

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1;
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: props.mentions.length }));
      scrollTo(props.mentions.length);
      return;
    }

    setState((s) => ({ ...s, selectedIndex }));
    scrollTo(-selectedIndex);
  }, [props.mentions.length, scrollTo, setState, state.selectedIndex]);

  onEnter = useCallback(() => {
    const mention = props.mentions.find((_, i) => i === state.selectedIndex);

    // Do nothing when it is entered without selecting an item
    if (!mention) return;

    props.setValue({ id: mention.id, type: mention.type });
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
  onOpen as onMentionOpen,
  onClose as onMentionClose,
  setQuery as setMentionQuery,
  getQuery as getMentionQuery,
  onArrowDown as onMentionArrowDown,
  onArrowUp as onMentionArrowUp,
  onEnter as onMentionEnter,
  isOpen as isMentionOpen,
};
