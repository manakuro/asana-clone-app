package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskfeedlikerepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskFeedLikeController() controller.TaskFeedLike {
	repo := taskfeedlikerepository.New(r.client)
	u := usecase.NewTaskFeedLikeUsecase(repo)

	return controller.NewTaskFeedLikeController(u)
}
