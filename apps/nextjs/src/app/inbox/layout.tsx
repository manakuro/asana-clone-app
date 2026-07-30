import type { ReactNode } from 'react';
import { Page } from '@/components/pages/inbox/index';

type Props = {
  children: ReactNode;
  task: ReactNode;
};

export default function InboxPage({ task }: Props) {
  return <Page task={task} />;
}
