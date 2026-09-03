package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/taskcollaboratorrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTaskCollaboratorController() controller.TaskCollaborator {
	repo := taskcollaboratorrepository.New(r.client)
	u := usecase.NewTaskCollaboratorUsecase(repo)

	return controller.NewTaskCollaboratorController(u)
}
