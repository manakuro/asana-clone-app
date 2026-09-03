package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projecttasksectionrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskSectionController() controller.ProjectTaskSection {
	repo := projecttasksectionrepository.New(r.client)
	u := usecase.NewProjectTaskSectionUsecase(repo)

	return controller.NewProjectTaskSectionController(u)
}
