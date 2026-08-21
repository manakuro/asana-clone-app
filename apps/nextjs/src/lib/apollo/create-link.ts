import { ApolloLink } from '@apollo/client/core';
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename';
import { createErrorLink } from './create-error-link';
import { type CreateHttpProps, createHttpLink } from './create-http-link';
import { createPersistedQueryLink } from './create-persisted-query-link';

export type CreateLinkProps = CreateHttpProps & {
  disablePersistedQueries?: boolean;
};

export const createLink = (props: CreateLinkProps) => {
  const links: ApolloLink[] = [
    new RemoveTypenameFromVariablesLink(),
    createErrorLink(),
  ];

  if (!props.disablePersistedQueries) {
    links.push(createPersistedQueryLink());
  }

  links.push(createHttpLink(props));

  return ApolloLink.from(links);
};
