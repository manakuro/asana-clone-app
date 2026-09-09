import { ApolloLink } from '@apollo/client/core';
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename';
import { createErrorLink } from './create-error-link';
import { type CreateHttpProps, createHttpLink } from './create-http-link';
import { createPersistedQueryLink } from './create-persisted-query-link';

export type CreateLinkProps = CreateHttpProps & {
  enablePersistedQueries?: boolean;
};

export const createLink = (props: CreateLinkProps) => {
  const links: ApolloLink[] = [
    new RemoveTypenameFromVariablesLink(),
    createErrorLink(),
  ];

  const enablePersistedQueries = props.enablePersistedQueries ?? true;
  if (enablePersistedQueries) {
    links.push(createPersistedQueryLink());
  }

  links.push(createHttpLink(props));

  return ApolloLink.from(links);
};
