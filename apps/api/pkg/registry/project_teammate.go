package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projectteammaterepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectTeammateController() controller.ProjectTeammate {
	repo := projectteammaterepository.New(r.client)
	u := usecase.NewProjectTeammateUsecase(repo)

	return controller.NewProjectTeammateController(u)
}
