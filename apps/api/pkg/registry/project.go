package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projectrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectController() controller.Project {
	repo := projectrepository.New(r.client)
	u := usecase.NewProjectUsecase(repo)

	return controller.NewProjectController(u)
}
