import { atom } from 'jotai';
import { FileTypeCode } from '@/store/entities/fileType';
import { createState } from '@/store/util';
import type { TaskFile } from './type';

export const initialState = (): TaskFile => ({
  id: '',
  projectId: '',
  taskId: '',
  taskFeedId: '',
  name: '',
  src: '',
  fileTypeId: '',
  fileType: {
    id: '',
    name: '',
    typeCode: FileTypeCode.Image,
    createdAt: '',
    updatedAt: '',
  },
  attached: false,
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskFileState,
  listState: taskFilesState,
  idsState: taskFileIdsState,
} = createState({ initialState });

export const taskFileIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    return taskFiles.filter((p) => p.taskId === taskId).map((p) => p.id);
  });

export const taskFileIdsByFeedIdState = (taskFeedId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    return taskFiles
      .filter((p) => p.taskFeedId === taskFeedId)
      .map((p) => p.id);
  });
