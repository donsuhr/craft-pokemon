import '@testing-library/jest-dom';

// @ts-ignore
global.fetch = (url: string) => {
  // eslint-disable-next-line no-console
  console.error(`global fetch called: ${url}`);
  return Promise.resolve();
};
