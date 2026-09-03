package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tasktagrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskTagController() controller.TaskTag {
	repo := tasktagrepository.New(r.client)
	u := usecase.NewTaskTagUsecase(repo)

	return controller.NewTaskTagController(u)
}
