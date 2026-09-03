package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/testtodorepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTestTodoController() controller.TestTodo {
	repo := testtodorepository.New(r.client)
	u := usecase.NewTestTodoUsecase(repo)

	return controller.NewTestTodoController(u)
}
