import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Board - Projects'),
};

export default async function ProjectsBoardPage() {
  return null;
}
