import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('My Tasks'),
};

export default async function MyTasksListPage() {
  return null;
}
