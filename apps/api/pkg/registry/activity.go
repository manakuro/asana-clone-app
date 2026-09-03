package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/activityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewActivityController() controller.Activity {
	repo := activityrepository.New(r.client)
	u := usecase.NewActivityUsecase(repo)

	return controller.NewActivityController(u)
}
