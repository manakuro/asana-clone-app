import type { Metadata } from 'next';
import { Task } from '@/components/pages/home/index/task';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Task - Home'),
};

type Params = Promise<{ taskId: string }>;

export default async function HomeTask({ params }: { params: Params }) {
  const { taskId } = await params;
  return <Task taskId={taskId} />;
}
