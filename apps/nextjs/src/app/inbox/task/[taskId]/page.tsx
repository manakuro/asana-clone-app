import type { Metadata } from 'next';
import { Task } from '@/components/pages/inbox/index/task';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Task - Inbox'),
};

type Params = Promise<{
  taskId: string;
}>;

export default async function InboxTaskPage({ params }: { params: Params }) {
  const { taskId } = await params;
  return <Task taskId={taskId} />;
}
