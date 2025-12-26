import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.graphql',
  documents: ['./src/graphql/**/*.js', './src/graphql/**/*.gql'],
  generates: {
    './src/graphql/types/index.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-redeclare */',
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        enumsAsConst: true,
      },
    },

    './src/graphql/enums/index.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-redeclare */',
          },
        },
        'typescript',
      ],
      config: {
        enumsAsConst: true,
        typesPrefix: '__SHOULD_NOT_USE__',
        enumPrefix: false,
      },
    },

    './src/graphql/hooks/index.ts': {
      plugins: ['typescript-react-apollo'],
      config: {
        withComponent: false,
        withHOC: false,
        withHooks: true,
        apolloClientVersion: 3,
        reactApolloVersion: 3,
        importOperationTypesFrom: "import('../types')",
      },
    },

    // For mock
    './src/graphql/types/index.mock.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-redeclare */',
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        enumsAsConst: true,
        skipTypename: false,
      },
    },
  },
  config: {
    scalars: {
      Time: 'string',
      Cursor: 'string',
    },
    skipTypename: true,
    preResolveTypes: true,
    maybeValue: 'T | null',
    avoidOptionals: {
      field: true,
    },
  },
};

export default config;
