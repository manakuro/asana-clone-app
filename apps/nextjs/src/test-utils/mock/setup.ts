import { server } from '@/mocks/server';

type Callback = () => void;

export const startServer = (callback?: Callback) => {
  beforeAll(async () => {
    if (callback) await callback();
    server.listen();
  });
};

export const resetServer = (callback?: Callback) => {
  afterAll(async () => {
    if (callback) await callback();
    server.resetHandlers();
  });
};

export const resetHandlers = (callback?: Callback) => {
  afterEach(async () => {
    if (callback) await callback();
    server.resetHandlers();
  });
};

export const closeServer = (callback?: Callback) => {
  afterAll(async () => {
    if (callback) await callback();
    server.close();
  });
};
