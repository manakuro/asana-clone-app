import type { PropsWithChildren } from 'react';
import { Page } from '@/components/pages/inbox/index';

export default async function InboxPage({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}
