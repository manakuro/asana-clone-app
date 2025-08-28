import { Label, type LabelProps } from '@/components/ui/atoms';
import { isInputFiles } from '@/shared/isInputFile';
import type React from 'react';
import { useCallback } from 'react';

export type UploadedFile = {
  name: string;
  type: File['type'];
  data: string;
};
export type FileUploaderParams = Promise<UploadedFile>[];

type Props = {
  id: string;
  onUpload?: (file: FileUploaderParams) => void;
  onUploaded?: () => void;
} & LabelProps;
export type FileUploaderProps = Props;

export function FileUploader(props: Props) {
  const { id, onUpload, onUploaded, ...rest } = props;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isInputFiles(e) || !e.currentTarget.files?.length) return;

      const files = e.currentTarget.files;
      const promises = Array.from(files).map((file) => {
        return new Promise<UploadedFile>((resolve) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            const data = (event.target?.result || '') as string;
            // const base64 = file.replace(/^data:.+;base64,/, '')
            const base64 = data;
            resolve({
              data: base64,
              type: file.type,
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      });
      onUpload?.(promises);
      onUploaded?.();
    },
    [onUpload, onUploaded],
  );

  return (
    <Label {...rest} htmlFor={props.id}>
      {props.children}
      <input
        type="file"
        id={props.id}
        hidden
        onChange={handleChange}
        multiple
      />
    </Label>
  );
}
