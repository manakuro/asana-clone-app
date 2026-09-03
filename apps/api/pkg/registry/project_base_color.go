package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projectbasecolorrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectBaseColorController() controller.ProjectBaseColor {
	repo := projectbasecolorrepository.New(r.client)
	u := usecase.NewProjectBaseColorUsecase(repo)

	return controller.NewProjectBaseColorController(u)
}
