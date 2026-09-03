package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/workspacerepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceController() controller.Workspace {
	repo := workspacerepository.New(r.client)
	u := usecase.NewWorkspaceUsecase(repo)

	return controller.NewWorkspaceController(u)
}
