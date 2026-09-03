package controller

import (
	"asana-clone-app/cmd/seed/seed"
	"net/http"
)

type databaseController struct{}

// Database is an interface of controller.
type Database interface {
	SeedTable(ctx Context) error
}

// NewDatabaseController generates test databaseController controller.
func NewDatabaseController() Database {
	return &databaseController{}
}

func (c *databaseController) SeedTable(ctx Context) error {
	seed.Seed()
	return ctx.String(http.StatusOK, "ok")
}
