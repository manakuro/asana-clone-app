package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/archivedworkspaceacivitytaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewArchivedWorkspaceActivityTaskController() controller.ArchivedWorkspaceActivityTask {
	repo := archivedworkspaceacivitytaskrepository.New(r.client)
	u := usecase.NewArchivedWorkspaceActivityTaskUsecase(repo)

	return controller.NewArchivedWorkspaceActivityTaskController(u)
}
