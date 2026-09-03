package registry

import (
	"asana-clone-app/pkg/adapter/controller"
)

func (r *registry) NewDatabaseController() controller.Database {
	return controller.NewDatabaseController()
}
