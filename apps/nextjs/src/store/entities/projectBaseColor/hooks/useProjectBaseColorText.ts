import { useProjectBaseColor } from './useProjectBaseColor';

// TODO: Text color should be managed in database
const TEXT_COLORS = {
  'gray.400': 'white',
  'red.400': 'white',
  'orange.400': 'white',
  'yellow.400': 'fg.muted',
  'green.400': 'white',
  'teal.400': 'white',
  'blue.400': 'white',
  'cyan.400': 'fg.muted',
  'purple.400': 'white',
  'pink.400': 'white',
} as const;

type Keys = keyof typeof TEXT_COLORS;

export const useProjectBaseColorText = (projectBaseColorId?: string) => {
  const { projectBaseColor } = useProjectBaseColor(projectBaseColorId);
  const textColor = TEXT_COLORS[projectBaseColor.color.color as Keys] || '';

  return {
    textColor,
  };
};
