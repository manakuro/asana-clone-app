# Example: CLI output for `materialDesignTheme`

What `@react-native-rethemed/cli` generates for this package's theme, as an
app would see it. The generated files are committed so they can be read
without running anything.

| File | What it is |
| --- | --- |
| `theme.ts` | Input: `materialDesignTheme`, unchanged |
| `themed.gen.ts` | Generated: token types, JSDoc token tables, and the `ThemedProvider` / `useThemed` / `useColorMode` instance |
| `themed.md` | Generated: token reference for AI agents (`--docs`) |
| `usage.tsx` | A component using the generated API (type-checked by `pnpm tsc`) |

Regenerate after changing the theme or the CLI:

```sh
pnpm --filter @react-native-rethemed/material-design-tokens example:codegen
```

`pnpm test` fails when the committed output is out of date.
