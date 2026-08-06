import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Overview - Projects'),
};

export default async function ProjectsOverviewPage() {
  return null;
}
