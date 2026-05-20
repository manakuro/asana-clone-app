import { setupWorker } from 'msw/browser';
import { handlers as mutationHandlers } from './mutations/handlers';
import { handlers as queryHandlers } from './queries/handlers';

export const worker = setupWorker(...[...queryHandlers, ...mutationHandlers]);

export const removeAllListeners = () => {
  worker.events.removeAllListeners();
};
