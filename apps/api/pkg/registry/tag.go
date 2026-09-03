package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tagrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTagController() controller.Tag {
	repo := tagrepository.New(r.client)
	u := usecase.NewTagUsecase(repo)

	return controller.NewTagController(u)
}
