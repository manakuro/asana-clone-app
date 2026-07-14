import { type CSSProperties, memo, useLayoutEffect } from 'react';
import { useEditorViewContext } from '@/components/ui/editor/editors/editor-context';
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

  return null;
});
