import MockDate from 'mockdate';

export const mockDate = (date: string) => {
  beforeAll(() => {
    MockDate.set(date);
  });

  afterAll(() => {
    MockDate.reset();
  });
};
