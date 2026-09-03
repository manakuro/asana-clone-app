package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/testuserrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewTestUserController() controller.TestUser {
	repo := testuserrepository.New(r.client)
	u := usecase.NewTestUserUsecase(repo)

	return controller.NewTestUserController(u)
}
