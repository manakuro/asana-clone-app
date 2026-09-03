package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tasklikerepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskLikeController() controller.TaskLike {
	repo := tasklikerepository.New(r.client)
	u := usecase.NewTaskLikeUsecase(repo)

	return controller.NewTaskLikeController(u)
}
