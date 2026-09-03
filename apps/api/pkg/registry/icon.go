package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/iconrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewIconController() controller.Icon {
	repo := iconrepository.New(r.client)
	u := usecase.NewIconUsecase(repo)

	return controller.NewIconController(u)
}
