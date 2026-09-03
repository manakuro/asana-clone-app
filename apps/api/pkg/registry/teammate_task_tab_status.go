package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammatetasktabstatusrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskTabStatusController() controller.TeammateTaskTabStatus {
	repo := teammatetasktabstatusrepository.New(r.client)
	u := usecase.NewTeammateTaskTabStatusUsecase(repo)

	return controller.NewTeammateTaskTabStatusController(u)
}
