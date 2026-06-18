'use client';

import dynamic from 'next/dynamic';

export const PdfViewer = dynamic(
  () => import('./pdf-viewer-component').then((mod) => mod.PdfViewerComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);
