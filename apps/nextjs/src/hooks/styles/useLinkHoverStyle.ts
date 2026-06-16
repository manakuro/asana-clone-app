import { transitions } from '@/styles/transitions';

type Props = {
  light?: boolean;
  color?: string;
};

export const useLinkHoverStyle = (props?: Props) => {
  const bg =
    props?.color ||
    (props?.light ? 'navigation.hover.light' : 'navigation.hover.dark');

  return {
    _hover: { bg },
    selectedStyle: { bg: 'navigation.selected' },
    _active: { bg: 'navigation.selected' },
    transition: transitions.base(),
  };
};
