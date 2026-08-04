import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Board - My Tasks'),
};

export default async function MyTasksBoardPage() {
  return null;
}
