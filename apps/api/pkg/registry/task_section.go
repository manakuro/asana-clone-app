package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/tasksectionrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskSectionController() controller.TaskSection {
	repo := tasksectionrepository.New(r.client)
	u := usecase.NewTaskSectionUsecase(repo)

	return controller.NewTaskSectionController(u)
}
