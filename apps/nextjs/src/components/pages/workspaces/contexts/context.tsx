import type React from 'react';
import { type SetStateAction, useEffect, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  loadingQuery: boolean;
  loadingTabContent: boolean;
  setLoadingTabContent: React.Dispatch<SetStateAction<boolean>>;
};

type Props = {
  loading: boolean;
};

const useValue = (props: Props): ContextProps => {
  const [loadingQuery, setLoadingQuery] = useState(props.loading);
  const [loadingTabContent, setLoadingTabContent] = useState(props.loading);

  useEffect(() => {
    setLoadingQuery(props.loading);
    setLoadingTabContent(props.loading);
  }, [props.loading]);

  return {
    loadingQuery,
    loadingTabContent,
    setLoadingTabContent,
  } as const;
};
export const { Context, useContext: useWorkspacesPageContext } = createContext(
  useValue,
  '@/components/pages/workspaces/providers/context.tsx',
);
