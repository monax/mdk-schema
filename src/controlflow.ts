export const assertUnreachable = (x: never): never => {
  throw new Error(`Value should be 'never' but found ${JSON.stringify(x)} instead.`);
};
