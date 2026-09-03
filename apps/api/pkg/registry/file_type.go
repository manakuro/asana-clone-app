package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/filetyperepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewFileTypeController() controller.FileType {
	repo := filetyperepository.New(r.client)
	u := usecase.NewFileTypeUsecase(repo)

	return controller.NewFileTypeController(u)
}
