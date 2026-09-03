package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/workspaceacivitytaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceActivityTaskController() controller.WorkspaceActivityTask {
	repo := workspaceacivitytaskrepository.New(r.client)
	u := usecase.NewWorkspaceActivityTaskUsecase(repo)

	return controller.NewWorkspaceActivityTaskController(u)
}
