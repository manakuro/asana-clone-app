# Project Overview

## Purpose
An Asana clone application built as a monorepo featuring:
- Real-time communication using WebSockets
- Optimistic UI updates
- Task management, projects, workspaces, and collaboration features

## Tech Stack

### Backend (apps/api/)
- **Language**: Go 1.22.1
- **API**: GraphQL with gqlgen (schema-first development)
- **Database**: MySQL with Ent ORM
- **Framework**: Echo framework
- **Authentication**: Firebase Auth
- **Architecture**: Clean Architecture (controller, usecase, repository, entity layers)

### Frontend (apps/nextjs/)
- **Framework**: Next.js 14.2.18 (React 18.3.1)
- **State Management**: Jotai 2.12.5 (simpler state)
- **UI Library**: Chakra UI 2.4.3
- **HTTP Client**: Apollo Client 3.5.6 (GraphQL)
- **Styling**: Emotion (CSS-in-JS)
- **Development**: TypeScript 5.6.3, Vite, Vitest
- **Linting**: Biome 1.9.4
- **Additional**: ProseMirror (rich text editor), React DnD, Storybook

### Development Tools
- **Package Manager**: pnpm 10.15.0
- **Monorepo**: Turborepo 2.4.4
- **Node Version**: 22.17.0
- **Git Hooks**: Lefthook 1.10.10
- **Commits**: Conventional commits with commitizen

## Key Features
- Task management with subtasks, assignments, due dates
- Project management with boards, lists, calendar views
- Team collaboration with comments, attachments, mentions
- Real-time updates via WebSocket subscriptions
- File attachments and rich text editing
- Inbox for notifications and activity feeds
