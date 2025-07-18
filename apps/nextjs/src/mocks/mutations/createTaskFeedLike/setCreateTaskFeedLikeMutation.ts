// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { createTaskFeedLikeMutation } from '../createTaskFeedLike';
import type { Options } from './type';

export const setCreateTaskFeedLikeMutation = (options: Options) => {
  server.use(createTaskFeedLikeMutation(options));
};
