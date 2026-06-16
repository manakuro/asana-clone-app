import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.graphql',
  documents: ['./src/graphql/**/*.js', './src/graphql/**/*.gql'],
  generates: {
    './src/graphql/types/index.ts': {
      plugins: ['typescript-operations'],
    },

    './src/graphql/enums/index.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsConst: true,
        enumPrefix: false,
        onlyEnums: true,
      },
    },

    './src/graphql/hooks/index.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        importSchemaTypesFrom: './src/graphql/types/index.ts',
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },

    // For mock
    './src/graphql/types/index.mock.ts': {
      plugins: ['typescript-operations'],
    },
  },
  config: {
    scalars: {
      Time: 'string',
      Cursor: 'string',
      Map: 'object',
    },
    skipTypename: true,
    maybeValue: 'T | null',
    avoidOptionals: {
      field: true,
    },
  },
};

export default config;
