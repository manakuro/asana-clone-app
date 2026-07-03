import { ApolloLink } from '@apollo/client/core';
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename';
import { createErrorLink } from './create-error-link';
import { type CreateHttpProps, createHttpLink } from './create-http-link';

export type CreateLinkProps = CreateHttpProps;
export const createLink = (props: CreateLinkProps) => {
  return ApolloLink.from([
    new RemoveTypenameFromVariablesLink(),
    createErrorLink(),
    createHttpLink(props),
  ]);
};
