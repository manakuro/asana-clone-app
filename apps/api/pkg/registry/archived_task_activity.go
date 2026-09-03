package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/archivedtaskacivityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewArchivedTaskActivityController() controller.ArchivedTaskActivity {
	repo := archivedtaskacivityrepository.New(r.client)
	u := usecase.NewArchivedTaskActivityUsecase(repo)

	return controller.NewArchivedTaskActivityController(u)
}
