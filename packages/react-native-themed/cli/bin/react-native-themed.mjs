#!/usr/bin/env node
// Runs the TypeScript sources through jiti, so no build step is needed while
// the package lives in the monorepo (and `prepare` never races a build).
import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const { main } = await jiti.import('../src/cli.ts');
await main(process.argv.slice(2));
