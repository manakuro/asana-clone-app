# Asana clone app - Backend
An Asana clone application for a backend built with Go.

- [Live Demo](https://project-management-demo.manatoworks.me/)
- [GraphQL Playground](https://project-management-demo.ebad78r3fqm9m.ap-northeast-1.cs.amazonlightsail.com/playground)

## Tech Stack
- Go / 1.22.1
- GraphQL
- [ent](https://github.com/ent/ent)
- [gqlgen](https://github.com/99designs/gqlgen)
- WebSockets

## Pre-requisite

Configure your Firebase project by following the setup documentation:

[docs/setup.md](docs/setup.md)

## Go Installation

Install Go version 1.22.1:

```
go install golang.org/dl/go1.25.1@latest
go1.25.1 download
```

Verify the installation:

```
go1.25.1 version

go version go1.25.1 darwin/arm64
```

## Docker Setup

```
cd docker
docker compose up
```

## Installation

```
make install
```

## Database Setup

```
make setup_db
```

```
make migrate_schema
```

```
make seed
```

## Development

```
make start
```
