// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { createTaskLikeMutation } from '../createTaskLike';
import type { Options } from './type';

export const setCreateTaskLikeMutation = (options: Options) => {
  server.use(createTaskLikeMutation(options));
};
