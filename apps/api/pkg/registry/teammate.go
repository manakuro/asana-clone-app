package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammaterepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateController() controller.Teammate {
	repo := teammaterepository.New(r.client)
	u := usecase.NewTeammateUsecase(repo)

	return controller.NewTeammateController(u)
}
