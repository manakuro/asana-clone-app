package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskacivityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskActivityController() controller.TaskActivity {
	repo := taskacivityrepository.New(r.client)
	u := usecase.NewTaskActivityUsecase(repo)

	return controller.NewTaskActivityController(u)
}
