import {
  FileTypeCode,
  type FileTypeCodeValue,
} from '@/features/task/store/file-type';

export const getTaskFileName = (type: FileTypeCodeValue): string => {
  switch (type) {
    case FileTypeCode.Pdf:
      return 'PDF';
    default:
      return 'Attachment';
  }
};
