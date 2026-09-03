package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projectlightcolorrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectLightColorController() controller.ProjectLightColor {
	repo := projectlightcolorrepository.New(r.client)
	u := usecase.NewProjectLightColorUsecase(repo)

	return controller.NewProjectLightColorController(u)
}
