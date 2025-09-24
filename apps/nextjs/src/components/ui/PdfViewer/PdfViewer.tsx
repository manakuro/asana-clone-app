import { Box } from '@/components/ui/atoms';
import * as PDFViewer from '@react-pdf-viewer/core';
import type React from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
const packageJson = require('../../../../../package.json');
const version = packageJson.dependencies['pdfjs-dist'];

const characterMap: PDFViewer.CharacterMap = {
  isCompressed: true,
  // The url has to end with "/"
  url: `https://unpkg.com/pdfjs-dist@${version}/cmaps/`,
};

type Props = PDFViewer.ViewerProps;

// TODO: Bump up @react-pdf-viewer/core
const Worker = PDFViewer.Worker as unknown as React.FCWithChildren<
  React.ComponentProps<typeof PDFViewer.Worker>
>;
const Viewer = PDFViewer.Viewer as unknown as React.FCWithChildren<
  React.ComponentProps<typeof PDFViewer.Viewer>
>;

export function PdfViewer(props: Props) {
  return (
    <Worker
      workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`}
    >
      <Box w="70%" h="full" className="pdfViewer">
        <Viewer characterMap={characterMap} {...props} />
      </Box>
    </Worker>
  );
}
