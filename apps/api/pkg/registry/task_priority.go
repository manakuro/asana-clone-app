package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskpriorityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskPriorityController() controller.TaskPriority {
	repo := taskpriorityrepository.New(r.client)
	u := usecase.NewTaskPriorityUsecase(repo)

	return controller.NewTaskPriorityController(u)
}
