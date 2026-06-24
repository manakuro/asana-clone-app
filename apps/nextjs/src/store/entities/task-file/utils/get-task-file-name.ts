import {
  FileTypeCode,
  type FileTypeCodeValue,
} from '@/store/entities/file-type';

export const getTaskFileName = (type: FileTypeCodeValue): string => {
  switch (type) {
    case FileTypeCode.Pdf:
      return 'PDF';
    default:
      return 'Attachment';
  }
};
