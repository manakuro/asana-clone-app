import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/lib/react/create-context';

const useValue = () => {
  const { ref, isHovering } = useHover<HTMLDivElement>();

  return {
    ref,
    isHovering,
  };
};

export const { Context, useContext: useInboxListItemContext } = createContext(
  useValue,
  '@/components/organisms/Inbox/InboxListItem/context.tsx',
);
