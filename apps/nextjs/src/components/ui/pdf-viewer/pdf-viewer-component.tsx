import { usePDFSlick } from '@pdfslick/react';
import { Box } from '@/components/ui/box';

import '@pdfslick/react/dist/pdf_viewer.css';

type Props = {
  fileUrl: string;
};

export function PdfViewerComponent(props: Props) {
  const { fileUrl } = props;

  const { viewerRef, PDFSlickViewer, usePDFSlickStore } = usePDFSlick(fileUrl, {
    scaleValue: 'page-width',
  });

  return (
    <Box w="70%" h="full" className="pdfViewer" position="relative">
      <PDFSlickViewer
        viewerRef={viewerRef}
        usePDFSlickStore={usePDFSlickStore}
      />
    </Box>
  );
}
