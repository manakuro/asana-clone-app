import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Files - Projects'),
};

export default async function ProjectsFilesPage() {
  return null;
}
