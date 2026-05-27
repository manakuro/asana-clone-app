import { ApolloLink } from '@apollo/client/core';

const omitTypename = (key: string, value: any) =>
  key === '__typename' ? undefined : value;

export const removeTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename,
    );
  }
  return forward(operation);
});
