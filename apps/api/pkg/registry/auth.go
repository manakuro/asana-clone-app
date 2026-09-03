package registry

import (
	"asana-clone-app/pkg/adapter/controller"
)

func (r *registry) NewAuthController() controller.Auth {
	return controller.NewAuthController()
}
