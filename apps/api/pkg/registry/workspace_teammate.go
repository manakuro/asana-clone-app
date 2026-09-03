package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/workspaceteammaterepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceTeammateController() controller.WorkspaceTeammate {
	repo := workspaceteammaterepository.New(r.client)
	u := usecase.NewWorkspaceTeammateUsecase(repo)

	return controller.NewWorkspaceTeammateController(u)
}
