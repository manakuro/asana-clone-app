import fs from 'node:fs';
import {
  buildClientSchema,
  getIntrospectionQuery,
  type IntrospectionQuery,
  printSchema,
} from 'graphql';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function downloadSchema(
  url: string,
  outputPath: string,
  additionalHeaders?: Record<string, string>,
  insecure?: boolean,
): Promise<void> {
  const headers = { ...defaultHeaders, ...additionalHeaders };

  // Note: insecure parameter is not supported with native fetch
  if (insecure) {
    console.warn(
      'Warning: insecure parameter is not supported with native fetch',
    );
  }

  let result: { data?: IntrospectionQuery; errors?: unknown };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    result = (await response.json()) as {
      data?: IntrospectionQuery;
      errors?: unknown;
    };
  } catch (error) {
    throw new Error(
      `Error while fetching introspection query result: ${(error as Error).message}`,
    );
  }

  if (result.errors) {
    throw new Error(`Errors in introspection query result: ${result.errors}`);
  }

  const schemaData = result;
  if (!schemaData.data) {
    throw new Error(
      `No introspection query result data found, server responded with: ${JSON.stringify(
        result,
      )}`,
    );
  }

  // Convert introspection result to GraphQL SDL format
  const schema = buildClientSchema(schemaData.data);
  const sdl = printSchema(schema);

  fs.writeFileSync(outputPath, sdl);
}
