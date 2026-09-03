package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammatetaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskController() controller.TeammateTask {
	repo := teammatetaskrepository.New(r.client)
	u := usecase.NewTeammateTaskUsecase(repo)

	return controller.NewTeammateTaskController(u)
}
