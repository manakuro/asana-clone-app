import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Task - My Tasks'),
};

export default async function MyTasksTaskPage() {
  return null;
}
