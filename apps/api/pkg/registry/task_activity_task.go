package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskacivitytaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskActivityTaskController() controller.TaskActivityTask {
	repo := taskacivitytaskrepository.New(r.client)
	u := usecase.NewTaskActivityTaskUsecase(repo)

	return controller.NewTaskActivityTaskController(u)
}
