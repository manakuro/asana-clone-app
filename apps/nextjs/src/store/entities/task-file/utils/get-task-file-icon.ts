import {
  FileTypeCode,
  type FileTypeCodeValue,
} from '@/store/entities/file-type';
import type { IconType } from '@/utils/icons';

export const getTaskFileIcon = (type: FileTypeCodeValue): IconType => {
  switch (type) {
    case FileTypeCode.Image:
      return 'imageAlt';
    case FileTypeCode.Pdf:
      return 'outlineFilePdf';
    case FileTypeCode.Text:
      return 'outlineFileText';
  }
};
