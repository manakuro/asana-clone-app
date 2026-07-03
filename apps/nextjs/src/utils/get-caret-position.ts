export const getCaretPosition = (): { x: number; y: number } | null => {
  const selection = window.getSelection();
  const node = selection?.focusNode;

  let rect: DOMRect;
  if (isHTMLElement(node)) {
    rect = node.getBoundingClientRect();
  } else {
    const range = selection?.getRangeAt(0).cloneRange();
    if (!range) return { x: 0, y: 0 };

    range.collapse(true);
    rect = range.getClientRects()[0];
  }

  return {
    y: rect.top,
    x: rect.left,
  };
};

const isHTMLElement = (obj: any): obj is HTMLElement =>
  !!obj?.getBoundingClientRect;
