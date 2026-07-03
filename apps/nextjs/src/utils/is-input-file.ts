export const isInputFiles = (
  obj: any,
): obj is HTMLInputElement & {
  target: HTMLInputElement;
  currentTarget: HTMLInputElement;
  dataTransfer: DataTransfer;
} => obj.currentTarget instanceof HTMLInputElement;
