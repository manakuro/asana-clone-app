import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  isActivity: boolean;
  isArchive: boolean;
};
type Props = {
  isActivity?: boolean;
  isArchive?: boolean;
};
export type InboxContextProps = Props;

const useValue = (props: Props): ContextProps => {
  return {
    isActivity: !!props.isActivity,
    isArchive: !!props.isArchive,
  };
};

export const { Context, useContext: useInboxContext } = createContext(
  useValue,
  '@/components/organisms/Inbox/Inbox/context.tsx',
);
