[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/manakuro/asana-clone-app)

# Asana clone app
An Asana clone application as a portfolio project, built with real-time communication with WebSockets and seamless updates with Optimistic UI.

> This is a personal learning project inspired by Asana's UI and features, and is not affiliated with, endorsed by, or connected to Asana, Inc. in any way.

- [Live Demo](https://asanacloneapp.codelly.dev/)
- [Storybook](https://main--63894befbaf58840c037c246.chromatic.com)
- [GraphQL Playground](https://project-management-demo.ebad78r3fqm9m.ap-northeast-1.cs.amazonlightsail.com/playground)

## Development Environment
- Node.js 24.22.1
- pnpm 11.27.0

## Set up safe-chain

```
curl -fsSL https://github.com/AikidoSec/safe-chain/releases/latest/download/install-safe-chain.sh | sh
```

## Installation
```
npm install -g corepack@latest
corepack enable pnpm
pnpm install
pnpm lefthook install
```

## Set up a project

Follow the setup documentation for both frontend and backend to configure this project:

- [Frontend Setup](./apps/nextjs/README.md)
- [Backend Setup](./apps/api/README.md)

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
