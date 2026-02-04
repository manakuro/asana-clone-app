'use client';

import dynamic from 'next/dynamic';

export const PdfViewer = dynamic(
  () => import('./PdfViewerComponent').then((mod) => mod.PdfViewerComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);
