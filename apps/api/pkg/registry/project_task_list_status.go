package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projecttaskliststatusrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskListStatusController() controller.ProjectTaskListStatus {
	repo := projecttaskliststatusrepository.New(r.client)
	u := usecase.NewProjectTaskListStatusUsecase(repo)

	return controller.NewProjectTaskListStatusController(u)
}
