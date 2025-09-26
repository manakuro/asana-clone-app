import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import { type SetStateAction, useEffect, useState } from 'react';

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
export const { Provider, useContext: useWorkspacesPageContext } =
  createProvider(useValue, '@/components/pages/Workspaces/Provider.tsx');
