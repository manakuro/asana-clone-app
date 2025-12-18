import type React from 'react';
import { type SetStateAction, useState } from 'react';
import { createProvider } from '@/shared/react/createProvider';

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
