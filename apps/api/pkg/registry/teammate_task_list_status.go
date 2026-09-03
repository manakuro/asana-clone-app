package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammatetaskliststatusrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskListStatusController() controller.TeammateTaskListStatus {
	repo := teammatetaskliststatusrepository.New(r.client)
	u := usecase.NewTeammateTaskListStatusUsecase(repo)

	return controller.NewTeammateTaskListStatusController(u)
}
