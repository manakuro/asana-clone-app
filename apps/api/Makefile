# Set up tools.
install:
	brew install yq
	brew install pre-commit
	pre-commit --version
	pre-commit install
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.56.2
	go install golang.org/x/tools/cmd/goimports@latest
	go install github.com/cosmtrek/air@v1.51.0

# Start dev server.
start:
	air

# Set up database.
setup_db:
	./bin/init_db.sh

# Migrate scheme to database.
migrate_schema:
	go1.25.1 run ./cmd/migration/main.go

migrate_schema_staging:
	APP_ENV=staging go1.25.1 run ./cmd/migration/main.go

# Connect database through proxy.
connect_db_staging:
	pscale connect project_management_demo staging

# Seed data
seed:
	go1.25.1 run ./cmd/seed/main.go

seed_staging:
	APP_ENV=staging go1.25.1 run ./cmd/seed/main.go

seed_production:
	APP_ENV=production go1.25.1 run ./cmd/seed/main.go

ent_generate:
	go1.25.1 generate ./ent --feature sql/upsert --idtype string

generate:
	go1.25.1 generate ./...

schema_description:
	ent describe ./ent/schema

# Testing
setup_test_db:
	./bin/init_db_test.sh

test_repository:
	go1.25.1 test ./pkg/adapter/repository/...

# E2E
setup_e2e_db:
	./bin/init_db_e2e.sh

e2e:
	go1.25.1 test ./test/e2e/...

# Deployment
export image := `aws lightsail get-container-images --service-name project-management-demo | jq -r '.containerImages[0].image'`

build:
	docker rmi app
	docker build . -t app

push:
	aws lightsail push-container-image --service-name project-management-demo --label app --image app

run_staging:
	docker run --name app --rm -it -p 8082:8080 -e APP_ENV=staging app

run_production:
	docker run --name app --rm -it -p 8082:8080 -e APP_ENV=production  app

deploy:
	jq --arg image $(image) '.containers.app.image = $$image' container.tpl.json > ./container.json
	cat ./container.json | jq
	aws lightsail create-container-service-deployment --service-name project-management-demo --cli-input-json file://$$(pwd)/container.json

.PHONY: install setup_db migrate_up migrate_down start migrate_schema schema_description ent_generate setup_test_db setup_e2e_db e2e test_repository seed migrate_schema_staging seed_staging deploy build push
