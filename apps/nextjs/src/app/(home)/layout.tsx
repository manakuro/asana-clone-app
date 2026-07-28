import type { PropsWithChildren } from 'react';
import { Page } from '@/components/pages/home/index';

export default function HomePage({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}
