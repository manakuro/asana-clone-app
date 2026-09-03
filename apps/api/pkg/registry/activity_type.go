package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/activitytyperepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewActivityTypeController() controller.ActivityType {
	repo := activitytyperepository.New(r.client)
	u := usecase.NewActivityTypeUsecase(repo)

	return controller.NewActivityTypeController(u)
}
