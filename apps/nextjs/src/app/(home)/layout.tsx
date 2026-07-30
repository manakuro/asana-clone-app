import type { ReactNode } from 'react';
import { Page } from '@/components/pages/home/index';

type Props = {
  children: ReactNode;
  task: ReactNode;
};

export default function HomePage({ children, task }: Props) {
  return <Page task={task}>{children}</Page>;
}
