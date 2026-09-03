package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/archivedtaskacivitytaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewArchivedTaskActivityTaskController() controller.ArchivedTaskActivityTask {
	repo := archivedtaskacivitytaskrepository.New(r.client)
	u := usecase.NewArchivedTaskActivityTaskUsecase(repo)

	return controller.NewArchivedTaskActivityTaskController(u)
}
