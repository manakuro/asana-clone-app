export const getScrollBottom = (dom: HTMLElement | null): number => {
  if (!dom) return 0;

  return dom.scrollHeight - dom.clientHeight;
};
