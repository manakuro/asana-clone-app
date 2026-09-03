package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/teammatetaskcolumnrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskColumnController() controller.TeammateTaskColumn {
	repo := teammatetaskcolumnrepository.New(r.client)
	u := usecase.NewTeammateTaskColumnUsecase(repo)

	return controller.NewTeammateTaskColumnController(u)
}
