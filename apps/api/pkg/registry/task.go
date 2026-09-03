package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskController() controller.Task {
	repo := taskrepository.New(r.client)
	u := usecase.NewTaskUsecase(repo)

	return controller.NewTaskController(u)
}
