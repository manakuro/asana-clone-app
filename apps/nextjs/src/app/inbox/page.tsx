import type { Metadata } from 'next';
import { generateTitle } from '@/lib/metatag/generate-title';

export const metadata: Metadata = {
  title: generateTitle('Task - Inbox'),
};

export default function InboxPage() {
  return null;
}
