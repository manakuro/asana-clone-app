package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammatetasksectionrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskSectionController() controller.TeammateTaskSection {
	repo := teammatetasksectionrepository.New(r.client)
	u := usecase.NewTeammateTaskSectionUsecase(repo)

	return controller.NewTeammateTaskSectionController(u)
}
