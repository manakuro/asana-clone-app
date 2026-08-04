import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Calendar - Projects'),
};

export default async function ProjectsCalendarPage() {
  return null;
}
