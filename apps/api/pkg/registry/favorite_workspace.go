package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/favoriteworkspacerepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewFavoriteWorkspaceController() controller.FavoriteWorkspace {
	repo := favoriteworkspacerepository.New(r.client)
	u := usecase.NewFavoriteWorkspaceUsecase(repo)

	return controller.NewFavoriteWorkspaceController(u)
}
