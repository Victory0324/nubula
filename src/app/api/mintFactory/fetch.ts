export const mintFactoryFetch = (path: string) => {
  return fetch(`${process.env.MINTFACTORY_API_URL}${path}`);
};
