import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import { type SetStateAction, useState } from 'react';

type ContextProps = {
  loadingTabContent: boolean;
  setLoadingTabContent: React.Dispatch<SetStateAction<boolean>>;
};

const useValue = (): ContextProps => {
  const [loadingTabContent, setLoadingTabContent] = useState(false);

  return {
    loadingTabContent,
    setLoadingTabContent,
  };
};
export const { Provider, useContext: useInboxPageContext } = createProvider(
  useValue,
  '@/components/pages/Inbox/Provider.tsx',
);
