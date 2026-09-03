package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskcolumnrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskColumnController() controller.TaskColumn {
	repo := taskcolumnrepository.New(r.client)
	u := usecase.NewTaskColumnUsecase(repo)

	return controller.NewTaskColumnController(u)
}
