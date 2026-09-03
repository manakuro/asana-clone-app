package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/deletedtaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewDeletedTaskController() controller.DeletedTask {
	repo := deletedtaskrepository.New(r.client)
	u := usecase.NewDeletedTaskUsecase(repo)

	return controller.NewDeletedTaskController(u)
}
