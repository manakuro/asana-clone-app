package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projecttaskrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskController() controller.ProjectTask {
	repo := projecttaskrepository.New(r.client)
	u := usecase.NewProjectTaskUsecase(repo)

	return controller.NewProjectTaskController(u)
}
