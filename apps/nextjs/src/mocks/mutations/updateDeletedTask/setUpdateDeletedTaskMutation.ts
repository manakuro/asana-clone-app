// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { updateDeletedTaskMutation } from '../updateDeletedTask';
import type { Options } from './type';

export const setUpdateDeletedTaskMutation = (options: Options) => {
  server.use(updateDeletedTaskMutation(options));
};
