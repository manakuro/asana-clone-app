import {
  FileTypeCode,
  type FileTypeCodeValue,
} from '@/features/task/store/file-type';

export const getTaskFileTypeFromFile = (
  fileType: string,
): FileTypeCodeValue => {
  if (fileType.includes('image')) return FileTypeCode.Image;
  if (fileType.includes('pdf')) return FileTypeCode.Pdf;

  return FileTypeCode.Text;
};
