import { createProvider } from '@/shared/react/createProvider';

type ContextProps = {
  isActivity: boolean;
  isArchive: boolean;
};
type Props = {
  isActivity?: boolean;
  isArchive?: boolean;
};
export type InboxProviderProps = Props;

const useValue = (props: Props): ContextProps => {
  return {
    isActivity: !!props.isActivity,
    isArchive: !!props.isArchive,
  };
};

export const { Provider, useContext: useInboxContext } = createProvider(
  useValue,
  '@/components/organisms/Inbox/Inbox/Provider.tsx',
);
