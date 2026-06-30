import type React from 'react';
import { type SetStateAction, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

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
export const { Context, useContext: useInboxPageContext } = createContext(
  useValue,
  '@/components/pages/inbox/providers/context.tsx',
);
