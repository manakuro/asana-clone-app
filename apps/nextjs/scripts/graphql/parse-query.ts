import './enable-import-graphql';
import * as changeCase from 'change-case';
import * as inflection from 'inflection';

type Result = {
  queryType: string;
  queries: {
    name: string;
    hasNodes: boolean;
    hasEdges: boolean;
    hasPageInfo: boolean;
    queryType: string;
  }[];
  hasVariables: boolean;
  hasPagination: boolean;
  isNodesMultiple: boolean;
  isEdgesMultiple: boolean;
};

export const parseQuery = (file: string) => {
  const result: Result = {
    queryType: '',
    queries: [],
    hasVariables: false,
    hasPagination: false,
    isNodesMultiple: false,
    isEdgesMultiple: false,
  };
  const parsed = require(file);
  const definition = parsed.definitions[0];
  const selections = definition.selectionSet?.selections || [];

  result.queryType = definition.name.value;
  result.hasVariables = !!definition.variableDefinitions?.length;
  result.hasPagination = definition.variableDefinitions?.some(
    (v: any) => v.variable.name.value === 'first',
  );

  result.queries = selections.map((s: any) => {
    return {
      name: s.name.value,
      hasNodes: s.selectionSet?.selections?.some(
        (s2: any) => s2.name.value === 'nodes',
      ),
      hasEdges: s.selectionSet?.selections?.some(
        (s2: any) => s2.name.value === 'edges',
      ),
      hasPageInfo: s.selectionSet?.selections?.some(
        (s2: any) => s2.name.value === 'pageInfo',
      ),
      queryType: changeCase.pascalCase(queryType(s.name.value)),
    };
  });

  result.isNodesMultiple = result.queries.filter((q) => q.hasNodes).length > 1;
  result.isEdgesMultiple = result.queries.filter((q) => q.hasEdges).length > 1;

  return result;
};

const queryType = (typeName: string) => {
  switch (typeName) {
    default:
      return inflection.singularize(typeName);
  }
};
