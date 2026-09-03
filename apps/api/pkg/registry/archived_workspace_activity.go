package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/archivedworkspaceacivityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewArchivedWorkspaceActivityController() controller.ArchivedWorkspaceActivity {
	repo := archivedworkspaceacivityrepository.New(r.client)
	u := usecase.NewArchivedWorkspaceActivityUsecase(repo)

	return controller.NewArchivedWorkspaceActivityController(u)
}
