package favoriteworkspacerepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type favoriteWorkspaceRepository struct {
	client *ent.Client
}

// New generates favoriteWorkspace repository.
func New(client *ent.Client) ur.FavoriteWorkspace {
	return &favoriteWorkspaceRepository{client: client}
}
