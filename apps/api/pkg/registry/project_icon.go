package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projecticonrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectIconController() controller.ProjectIcon {
	repo := projecticonrepository.New(r.client)
	u := usecase.NewProjectIconUsecase(repo)

	return controller.NewProjectIconController(u)
}
