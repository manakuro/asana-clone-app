package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/workspaceacivityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceActivityController() controller.WorkspaceActivity {
	repo := workspaceacivityrepository.New(r.client)
	u := usecase.NewWorkspaceActivityUsecase(repo)

	return controller.NewWorkspaceActivityController(u)
}
