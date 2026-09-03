package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tasklistsortstatusrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskListSortStatusController() controller.TaskListSortStatus {
	repo := tasklistsortstatusrepository.New(r.client)
	u := usecase.NewTaskListSortStatusUsecase(repo)

	return controller.NewTaskListSortStatusController(u)
}
