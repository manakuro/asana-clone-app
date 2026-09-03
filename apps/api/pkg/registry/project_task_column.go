package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/projecttaskcolumnrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskColumnController() controller.ProjectTaskColumn {
	repo := projecttaskcolumnrepository.New(r.client)
	u := usecase.NewProjectTaskColumnUsecase(repo)

	return controller.NewProjectTaskColumnController(u)
}
