import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Task - Projects'),
};

export default async function ProjectsTaskPage() {
  return null;
}
