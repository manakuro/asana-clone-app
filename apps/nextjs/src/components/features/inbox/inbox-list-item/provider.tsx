import { useHover } from '@/hooks/use-hover';
import { createProvider } from '@/shared/react/createProvider';

const useValue = () => {
  const { ref, isHovering } = useHover<HTMLDivElement>();

  return {
    ref,
    isHovering,
  };
};

export const { Provider, useContext: useInboxListItemContext } = createProvider(
  useValue,
  '@/components/organisms/Inbox/InboxListItem/Provider.tsx',
);
