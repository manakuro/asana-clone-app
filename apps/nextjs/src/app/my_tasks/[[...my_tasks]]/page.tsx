import { generateTitle } from '@/shared/metatag/generateTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: generateTitle('My Tasks'),
};

export default async function MyTasksPage() {
  // Delegate rendering to the `layout.tsx` to avoid remounted issues with Optional capture-all segments
  // @see https://github.com/vercel/next.js/issues/48082#issuecomment-1540060041
  return null;
}
