package main

import (
	"asana-clone-app/config"
	"asana-clone-app/ent"
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/infrastructure/datastore"
	"asana-clone-app/pkg/infrastructure/graphql"
	"asana-clone-app/pkg/infrastructure/router"
	"asana-clone-app/pkg/registry"
	"log"
	"os"
)

func main() {
	config.ReadConfig(config.ReadConfigOption{})

	client := newDBClient()
	defer client.Close()

	ctrl := newController(client)
	srv := graphql.NewServer(client, ctrl)

	e := router.New(srv, ctrl, router.Options{
		Auth: true,
	})

	e.Logger.Fatal(e.Start(":" + port()))
}

func newDBClient() *ent.Client {
	client, err := datastore.NewClient(datastore.NewClientOptions{
		Debug: true,
	})
	if err != nil {
		log.Fatalf("failed opening mysql client: %v", err)
	}

	return client
}

func newController(client *ent.Client) controller.Controller {
	r := registry.New(client)
	return r.NewController()
}

func port() string {
	if os.Getenv("PORT") != "" {
		return os.Getenv("PORT")
	}
	return config.C.Server.Address
}
