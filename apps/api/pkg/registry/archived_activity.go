package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/archivedactivityrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewArchivedActivityController() controller.ArchivedActivity {
	repo := archivedactivityrepository.New(r.client)
	u := usecase.NewArchivedActivityUsecase(repo)

	return controller.NewArchivedActivityController(u)
}
