package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskfeedrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskFeedController() controller.TaskFeed {
	repo := taskfeedrepository.New(r.client)
	u := usecase.NewTaskFeedUsecase(repo)

	return controller.NewTaskFeedController(u)
}
