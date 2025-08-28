import { Box } from '@/components/ui/atoms';
import { useEditorViewContext } from '@/components/ui/organisms/Editor/Editors/EdiorProvider';
import {
  type CSSProperties,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import 'prosemirror-view/style/prosemirror.css';

type Props = {
  style?: CSSProperties;
  onRendered?: () => void;
};

export const EditorContent = memo(function EditorContent(props: Props) {
  const { style, onRendered } = props;
  const view = useEditorViewContext();
  const ref = useRef<HTMLDivElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    const current = ref.current;
    if (current && view) {
      if (style) {
        Object.keys(style).forEach((k: any) => {
          (view.dom as HTMLElement).style[k] = (style as any)[k];
        });
      }

      current.appendChild(view.dom);
      onRendered?.();
    }
    return () => {
      if (current && view) {
        current.removeChild(view.dom);
      }
    };
    /* eslint react-hooks/exhaustive-deps: off */
  }, [view]);

  useEffect(() => {
    setTimeout(() => {
      if (!view?.dom) return;
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      view.dom.classList.add('focus-visible');
    }, 300);
  }, [view]);

  return <Box ref={ref} />;
});
