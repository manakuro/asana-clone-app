package main

import (
	"asana-clone-app/config"
	"asana-clone-app/ent"
	"asana-clone-app/ent/migrate"
	"asana-clone-app/pkg/infrastructure/datastore"
	"context"
	"log"
)

func main() {
	config.ReadConfig(config.ReadConfigOption{})

	client, err := datastore.NewClient(datastore.NewClientOptions{})
	if err != nil {
		log.Fatalf("failed opening mysql client: %v", err)
	}
	defer client.Close()
	db := client.DB()
	_, err = db.Exec("SET GLOBAL read_only = OFF;")
	if err != nil {
		log.Fatalf("failed changing mysql config: %v", err)
	}

	createDBSchema(client)
}

func createDBSchema(client *ent.Client) {
	if err := client.Schema.Create(
		context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
		migrate.WithForeignKeys(false),
	); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
}
