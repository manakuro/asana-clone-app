import './enable-import-graphql';
import * as changeCase from 'change-case';
import * as inflection from 'inflection';

type Result = {
  queryType: string;
  queries: {
    name: string;
    queryType: string;
  }[];
  hasVariables: boolean;
};

export const parseMutation = (file: string) => {
  const result: Result = {
    queryType: '',
    queries: [],
    hasVariables: false,
  };
  const parsed = require(file);
  const definition = parsed.definitions[0];
  const selections = definition.selectionSet?.selections || [];

  result.queryType = definition.name.value;
  result.hasVariables = !!definition.variableDefinitions?.length;

  result.queries = selections.map((s: any) => {
    return {
      name: s.name.value,
      queryType: changeCase.pascalCase(queryType(s.name.value)),
    };
  });

  return result;
};

const queryType = (typeName: string) => {
  switch (typeName) {
    default:
      return inflection.singularize(typeName);
  }
};
