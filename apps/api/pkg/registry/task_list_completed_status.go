package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tasklistcompletedstatusrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskListCompletedStatusController() controller.TaskListCompletedStatus {
	repo := tasklistcompletedstatusrepository.New(r.client)
	u := usecase.NewTaskListCompletedStatusUsecase(repo)

	return controller.NewTaskListCompletedStatusController(u)
}
