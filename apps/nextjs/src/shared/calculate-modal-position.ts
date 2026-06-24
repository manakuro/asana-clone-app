export const calculateModalPosition = (
  node: HTMLElement,
  basePosition?: { y: number },
): { y: number } | null => {
  const rect = node.getBoundingClientRect();
  const position = basePosition || { y: rect.y };

  const margin = window.innerHeight - (rect.height + position.y);
  if (margin < 30 && margin < -10) {
    position.y -= rect.height + 24;
  }

  return position;
};
