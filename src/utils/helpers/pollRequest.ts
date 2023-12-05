const poll = async function <T>(
  fn: () => Promise<T>,
  shouldRetry: (args: T) => boolean,
  ms: number = 0
) {
  let result = await fn();
  while (shouldRetry(result)) {
    await wait(ms);
    result = await fn();
  }
  return result;
};

const wait = function (ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default poll;
