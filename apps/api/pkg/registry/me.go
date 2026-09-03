package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/merepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewMeController() controller.Me {
	repo := merepository.New(r.client)
	u := usecase.NewMeUsecase(repo)

	return controller.NewMeController(u)
}
