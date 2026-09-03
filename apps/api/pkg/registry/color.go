package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/colorrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewColorController() controller.Color {
	repo := colorrepository.New(r.client)
	u := usecase.NewColorUsecase(repo)

	return controller.NewColorController(u)
}
