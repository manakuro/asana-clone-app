import { type CSSProperties, memo, useEffect, useLayoutEffect } from 'react';
import { useEditorViewContext } from '@/components/ui/editor/editors/editor-provider';
import 'prosemirror-view/style/prosemirror.css';

type Props = {
  style?: CSSProperties;
};

export const EditorContent = memo(function EditorContent(props: Props) {
  const { style } = props;
  const view = useEditorViewContext();

  useLayoutEffect(() => {
    if (view) {
      if (style) {
        Object.keys(style).forEach((k: any) => {
          (view.dom as HTMLElement).style[k] = (style as any)[k];
        });
      }
    }
  }, [view, style]);

  useEffect(() => {
    setTimeout(() => {
      if (!view?.dom) return;
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      view.dom.classList.add('focus-visible');
    }, 300);
  }, [view]);

  return null;
});
