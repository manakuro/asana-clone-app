package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskfilerepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskFileController() controller.TaskFile {
	repo := taskfilerepository.New(r.client)
	u := usecase.NewTaskFileUsecase(repo)

	return controller.NewTaskFileController(u)
}
