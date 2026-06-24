import {
  FileTypeCode,
  type FileTypeCodeValue,
} from '@/store/entities/file-type';

export const getTaskFileTypeFromFile = (
  fileType: string,
): FileTypeCodeValue => {
  if (fileType.includes('image')) return FileTypeCode.Image;
  if (fileType.includes('pdf')) return FileTypeCode.Pdf;

  return FileTypeCode.Text;
};
