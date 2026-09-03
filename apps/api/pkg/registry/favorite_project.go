package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/favoriteprojectrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewFavoriteProjectController() controller.FavoriteProject {
	repo := favoriteprojectrepository.New(r.client)
	u := usecase.NewFavoriteProjectUsecase(repo)

	return controller.NewFavoriteProjectController(u)
}
