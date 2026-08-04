import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('List - Projects'),
};

export default async function ProjectsListPage() {
  return null;
}
